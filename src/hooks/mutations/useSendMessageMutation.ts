import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessageApi } from '../../api/conversationApi';
import { conversationQueryKeys } from '../queries/useConversationsQuery';
import type { Conversation, Message } from '../../types/chat';

interface SendMessageVariables {
  conversationId: string;
  content: string;
}

interface OptimisticContext {
  previousConversations?: Conversation[];
}

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessageApi,

    onMutate: async (variables: SendMessageVariables) => {
      await queryClient.cancelQueries({
        queryKey: conversationQueryKeys.all,
      });

      const previousConversations = queryClient.getQueryData<Conversation[]>(
        conversationQueryKeys.all,
      );

      const optimisticUserMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: variables.content,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Conversation[]>(
        conversationQueryKeys.all,
        (oldConversations = []) =>
          oldConversations.map((conversation) => {
            if (conversation.id !== variables.conversationId) {
              return conversation;
            }
            return {
              ...conversation,
              messages: [...conversation.messages, optimisticUserMessage],
            };
          }),
      );

      return {
        previousConversations,
      } satisfies OptimisticContext;
    },

    onError: (_error, _variables, context) => {
      if (context?.previousConversations) {
        queryClient.setQueryData<Conversation[]>(
          conversationQueryKeys.all,
          context.previousConversations,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.all,
      });
    },
  });
};
