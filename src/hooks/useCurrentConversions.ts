import { useChatStore } from '../stores/chatStore.ts';

export const useCurrentConversions = () => {
  const conversations = useChatStore((state) => state.conversations);
  const currentConversationId = useChatStore(
    (state) => state.currentConversationId,
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId,
  );

  const isSending = useChatStore((state) => state.isSending);
  const errorMessage = useChatStore((state) => state.errorMessage);

  const isLoadingConversations = useChatStore(
    (state) => state.isLoadingConversations,
  );

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
    errorMessage,
    isLoadingConversations,
    deleteConversationId,
    isCreatingConversation,
  };
};
