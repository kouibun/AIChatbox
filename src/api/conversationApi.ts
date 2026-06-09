import type { Conversation, Message } from '../types/chat';
import type { ApiResponse } from '../api/types';
import {
  delay,
  createSuccessResponse,
  shouldMockError,
  createApiError,
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

export async function sendMessageApi(params: {
  conversationId: string;
  content: string;
}): Promise<ApiResponse<Message>> {
  await delay(3000);

  if (shouldMockError(1)) {
    throw createApiError('チャット失敗しました。', 500);
  }

  const assistantMessage: Message = {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `这是 mock API 返回的回复：「${params.content}」`,
    createdAt: new Date().toISOString(),
  };

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: params.content,
    createdAt: new Date().toISOString(),
  };

  mockConversations = mockConversations.map((conversation) => {
    if (conversation.id !== params.conversationId) {
      return conversation;
    }

    return {
      ...conversation,
      messages: [...conversation.messages, userMessage, assistantMessage],
    };
  });

  return createSuccessResponse(assistantMessage);
}

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
