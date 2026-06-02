import type { Message } from '../types/chat.ts';
import type { ApiResponse } from './types.ts';
import {
  createSuccessResponse,
  delay,
  shouldMockError,
  createApiError,
  getErrorMessage,
} from './client.ts';

interface SendMessageParams {
  content: string;
}

export const sendChatMessage = async (
  params: SendMessageParams,
): Promise<ApiResponse<Message>> => {
  await delay(800);

  if (shouldMockError()) {
    throw createApiError('メッセージの送信に失敗しました。', 500);
  }

  return createSuccessResponse({
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `这是 mock API 返回的回复：「${params.content}」`,
    createdAt: new Date().toISOString(),
  });
};
