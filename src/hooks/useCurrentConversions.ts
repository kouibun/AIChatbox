import { useChatStore } from '../stores/chatStore.ts';
import { useConversationsQuery } from './useConversationsQuery.ts';

export const useCurrentConversions = () => {
  const {
    data: conversations = [],
    isLoading,
    error,
  } = useConversationsQuery();

  const currentConversationId = useChatStore(
    (state) => state.currentConversationId,
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId,
  );

  const isSending = useChatStore((state) => state.isSending);

  const isCreatingConversation = useChatStore(
    (state) => state.isCreatingConversation,
  );

  const deleteConversationId = useChatStore(
    (state) => state.deleteConversationId,
  );

  return {
    currentConversation,
    currentConversationId,
    conversations,
    isSending,
    errorMessage: error instanceof Error ? error.message : null,
    isLoadingConversations: isLoading,
    deleteConversationId,
    isCreatingConversation,
  };
};
