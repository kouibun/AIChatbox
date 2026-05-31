import { create } from 'zustand';
import type { Conversation, Message } from '../types/chat';

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string;

  selectConversation: (conversationId: string) => void;
  createConversation: () => void;
  deleteConversation: (conversationId: string) => void;
  sendMessage: (content: string) => void;
}

const initialConversations: Conversation[] = [
  {
    id: 'conversation-1',
    title: 'New Chat',
    messages: [
      {
        id: 'message-1',
        role: 'assistant',
        content: 'こんにちは、DevMateです。何を手伝いましょうか？',
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: initialConversations,
  currentConversationId: initialConversations[0].id,

  selectConversation: (conversationId) => {
    set({ currentConversationId: conversationId });
  },

  createConversation: () => {
    const { conversations } = get();
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: `New Chat ${conversations.length + 1}`,
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '新しいチャットを開始しました。',
          createdAt: new Date().toISOString(),
        },
      ],
    };
    set((state) => ({
      conversations: [...state.conversations, newConversation],
      currentConversationId: newConversation.id,
    }));
  },

  deleteConversation: (conversationId) => {
    const { conversations, currentConversationId } = get();

    if (conversations.length === 1) {
      return;
    }

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
  },
  sendMessage: (content) => {
    const { currentConversationId } = get();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `「${content}」について考えています。`,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation.id !== currentConversationId) {
          return conversation;
        }

        return {
          ...conversation,
          messages: [...conversation.messages, userMessage, assistantMessage],
        };
      }),
    }));
  },
}));
