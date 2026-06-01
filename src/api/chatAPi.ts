import type { Message } from '../types/chat.ts';
import type { ApiResponse } from './types.ts';

interface SendMessageParams {
  content: string;
}

export const sendChatMessage = async (
  params: SendMessageParams,
): Promise<ApiResponse<Message>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'ok',
    data: {
      id: crypto.randomUUID(),

      role: 'assistant',

      content: `这是 mock API 返回的回复：「${params.content}」`,

      createdAt: new Date().toISOString(),
    },
  };
};
