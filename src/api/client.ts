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

export class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export function createApiError(message: string, statusCode?: number): ApiError {
  return new ApiError(message, statusCode);
}

export function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
