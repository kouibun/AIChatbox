import type { Message } from '../types/chat.ts';
import type { ApiResponse } from './types.ts';
import { createSuccessResponse, delay, shouldMockError } from './client.ts';

interface SendMessageParams {
  content: string;
}

export const sendChatMessage = async (
  params: SendMessageParams,
): Promise<ApiResponse<Message>> => {
  await delay(800);

  if (shouldMockError()) {
    throw new Error('Mock API error');
  }

  return createSuccessResponse({
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `这是 mock API 返回的回复：「${params.content}」`,
    createdAt: new Date().toISOString(),
  });
};
