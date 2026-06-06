import type { Conversation } from '../types/chat';
import type { ApiResponse } from '../api/types';
import {
  delay,
  createSuccessResponse,
  shouldMockError,
  createApiError,
  getErrorMessage,
} from '../api/client.ts';

let mockConversations: Conversation[] = [
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
  await delay(300);

  if (shouldMockError()) {
    throw createApiError('チャット履歴の取得に失敗しました。', 500);
  }

  return createSuccessResponse(mockConversations);
}

export async function createConversation(): Promise<ApiResponse<Conversation>> {
  await delay(300);

  if (shouldMockError()) {
    throw createApiError('チャットの作成に失敗しました。', 500);
  }

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

  mockConversations = [...mockConversations, newConversation];

  return createSuccessResponse(newConversation);
}

export async function deleteConversation(
  conversationId: string,
): Promise<ApiResponse<{ conversationId: string }>> {
  await delay(300);

  if (shouldMockError()) {
    throw createApiError('チャットの削除に失敗しました。', 300);
  }

  mockConversations = mockConversations.filter(
    (conversation) => conversation.id !== conversationId,
  );

  return createSuccessResponse({
    conversationId,
  });
}
