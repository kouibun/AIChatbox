import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConversation as createConversationApi } from '../../api/conversationApi.ts';
import { conversationQueryKeys } from '../queries/useConversationsQuery.ts';

export const useCreateConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConversationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.all,
      });
    },
  });
};
