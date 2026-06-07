import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteConversation } from '../../api/conversationApi';
import { conversationQueryKeys } from '../queries/useConversationsQuery';

export const useDeleteConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      // Invalidate and refetch the conversations query
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.all,
      });
    },
  });
};
