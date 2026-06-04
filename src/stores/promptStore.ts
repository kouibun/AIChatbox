import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PromptTemplate } from '../types/prompt';

interface PromptState {
  prompts: PromptTemplate[];
  createPrompt: (params: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
  updatePrompt: (
    id: string,
    updatedPrompt: {
      title: string;
      content: string;
      tags: string[];
    },
  ) => void;
  deletePrompt: (id: string) => void;
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set) => ({
      prompts: [],
      createPrompt: ({ title, content, tags }) => {
        const now = new Date().toISOString();
        const newPrompt: PromptTemplate = {
          id: crypto.randomUUID(),
          title,
          content,
          tags,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ prompts: [...state.prompts, newPrompt] }));
      },
      updatePrompt: (id, { title, content, tags }) => {
        const now = new Date().toISOString();
        set((state) => ({
          prompts: state.prompts.map((prompt) =>
            prompt.id === id
              ? { ...prompt, title, content, tags, updatedAt: now }
              : prompt,
          ),
        }));
      },
      deletePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.filter((prompt) => prompt.id !== id),
        }));
      },
    }),
    {
      name: 'devmate-prompt-store',
    },
  ),
);
