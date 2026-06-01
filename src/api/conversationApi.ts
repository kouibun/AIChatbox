import type { Conversation } from '../types/chat';
import type { ApiResponse } from '../api/types';

const mockConversations: Conversation[] = [
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

export async function fetchConversations(): Promise<
  ApiResponse<Conversation[]>
> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: 'ok',
    data: mockConversations,
  };
}

export async function createConversation(): Promise<ApiResponse<Conversation>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: `New Chat ${mockConversations.length + 1}`,
    messages: [
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '新しいチャットを開始しました。',
        createdAt: new Date().toISOString(),
      },
    ],
  };

  return {
    success: true,
    message: 'ok',
    data: newConversation,
  };
}

export async function deleteConversation(
  conversationId: string,
): Promise<ApiResponse<null>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: 'ok',
    data: null,
  };
}
