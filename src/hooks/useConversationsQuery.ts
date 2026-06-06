import { useQuery } from '@tanstack/react-query';
import { fetchConversations } from '../api/conversationApi';
import type { Conversation } from '../types/chat';
import { conversationQueryKeys } from './queries/useConversationsQuery';

export const useConversationsQuery = () => {
  return useQuery<Conversation[], Error>({
    queryKey: conversationQueryKeys.all,
    queryFn: async () => {
      const response = await fetchConversations();
      return response.data;
    },
  });
};
