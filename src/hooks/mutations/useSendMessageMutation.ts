import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessageApi } from '../../api/conversationApi';
import { conversationQueryKeys } from '../queries/useConversationsQuery';

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessageApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.all,
      });
    },
  });
};
