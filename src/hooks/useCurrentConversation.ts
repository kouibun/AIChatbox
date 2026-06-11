import { useChatStore } from '../stores/chatStore.ts';
import { useConversationsQuery } from './useConversationsQuery.ts';

export const useCurrentConversions = () => {
  const { data: conversations = [], error } = useConversationsQuery();

  const currentConversationId = useChatStore(
    (state) => state.currentConversationId,
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId,
  );

  return {
    currentConversation,
    currentConversationId,
    conversations,
    errorMessage: error instanceof Error ? error.message : null,
  };
};
