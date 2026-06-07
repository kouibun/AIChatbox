import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  currentConversationId: string;

  selectConversation: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      currentConversationId: '',

      selectConversation: (conversationId) => {
        set({ currentConversationId: conversationId });
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
);
