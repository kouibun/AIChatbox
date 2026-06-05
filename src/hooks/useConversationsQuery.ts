import { useQuery } from '@tanstack/react-query';
import { fetchConversations } from '../api/conversationApi';
import type { Conversation } from '../types/chat';

export const conversationQueryKeys = {
  all: ['conversations'] as const,
};

export const useConversationsQuery = () => {
  return useQuery<Conversation[], Error>({
    queryKey: conversationQueryKeys.all,
    queryFn: async () => {
      const response = await fetchConversations();
      return response.data;
    },
  });
};
