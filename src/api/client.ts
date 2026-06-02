import type { ApiResponse } from './types';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSuccessResponse<T>(
  data: T,
  message = 'ok',
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function shouldMockError(rate = 0) {
  return Math.random() < rate;
}
