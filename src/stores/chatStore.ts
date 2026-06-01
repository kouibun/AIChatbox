import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sendChatMessage } from '../api/chatAPi';
import {
  fetchConversations as fetchConversationsApi,
  createConversation as createConversationApi,
  deleteConversation as deleteConversationApi,
} from '../api/conversationApi';

import type { Conversation, Message } from '../types/chat';

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string;
  isSending: boolean;
  errorMessage: string | null;
  isLoadingConversations: boolean;

  fetchConversations: () => Promise<void>;
  selectConversation: (conversationId: string) => void;
  createConversation: () => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: '',
      isSending: false,
      errorMessage: null,
      isLoadingConversations: false,

      selectConversation: (conversationId) => {
        set({ currentConversationId: conversationId, errorMessage: null });
      },

      fetchConversations: async () => {
        set({ isLoadingConversations: true });

        try {
          const response = await fetchConversationsApi();

          if (response.success) {
            set({
              conversations: response.data,
              currentConversationId: response.data[0]?.id,
              isLoadingConversations: false,
            });
          }
        } catch {
          set({
            errorMessage: '会話の取得に失敗しました。初期データを表示します。',
          });
        } finally {
          set({ isLoadingConversations: false });
        }
      },

      createConversation: async () => {
        set({ errorMessage: null });
        try {
          const response = await createConversationApi();
          const newConversation = response.data;
          set((state) => ({
            conversations: [...state.conversations, newConversation],
            currentConversationId: newConversation.id,
          }));
        } catch {
          set({
            errorMessage: '会話の作成に失敗しました。',
          });
        }
      },

      deleteConversation: async (conversationId) => {
        const { conversations, currentConversationId } = get();

        if (conversations.length === 1) {
          return;
        }

        set({ errorMessage: null });

        try {
          await deleteConversationApi(conversationId);
          const nextConversations = conversations.filter(
            (conversation) => conversation.id !== conversationId,
          );
          set({
            conversations: nextConversations,
            currentConversationId:
              conversationId === currentConversationId
                ? nextConversations[0].id
                : currentConversationId,
          });
        } catch {
          set({
            errorMessage: '会話の削除に失敗しました。',
          });
        }
      },
      sendMessage: async (content) => {
        const { currentConversationId } = get();

        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: 'user',
          content,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((conversation) => {
            if (conversation.id !== currentConversationId) {
              return conversation;
            }
            return {
              ...conversation,
              messages: [...conversation.messages, userMessage],
            };
          }),
          isSending: true,
          errorMessage: null,
        }));

        try {
          const response = await sendChatMessage({ content });

          set((state) => ({
            conversations: state.conversations.map((conversation) => {
              if (conversation.id !== currentConversationId) {
                return conversation;
              }

              return {
                ...conversation,
                messages: [...conversation.messages, response.data],
              };
            }),

            isSending: false,
          }));
        } catch {
          set({
            isSending: false,
            errorMessage: 'メッセージの送信に失敗しました。',
          });
        }
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
);
