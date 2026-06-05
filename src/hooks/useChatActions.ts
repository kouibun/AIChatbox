import { useChatStore } from '../stores/chatStore';

export const useChatActions = () => {
  const selectConversation = useChatStore((state) => state.selectConversation);
  const createConversation = useChatStore((state) => state.createConversation);
  const deleteConversation = useChatStore((state) => state.deleteConversation);

  const sendMessage = useChatStore((state) => state.sendMessage);

  return {
    selectConversation,
    createConversation,
    deleteConversation,
    sendMessage,
  };
};
