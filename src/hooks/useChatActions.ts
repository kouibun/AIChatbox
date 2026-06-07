import { useChatStore } from '../stores/chatStore';

export const useChatActions = () => {
  const selectConversation = useChatStore((state) => state.selectConversation);

  return {
    selectConversation,
  };
};
