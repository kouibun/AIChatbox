import { useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { usePromptStore } from '../stores/promptStore';
import { PromptList } from '../components/prompt/PromptList';
import { PromptForm } from '../components/prompt/PromptForm';

export function PromptPage() {
  const { prompts, createPrompt, updatePrompt, deletePrompt } =
    usePromptStore();
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const selectedPrompt = prompts.find(
    (prompt) => prompt.id === selectedPromptId,
  );

  const handleDeletePrompt = (id: string) => {
    deletePrompt(id);
    if (selectedPromptId === id) {
      setSelectedPromptId(null);
    }
  };

  return (
    <div className='prompt-page'>
      <aside className='prompt-page__sidebar'>
        <div className='prompt-page__header'>
          <h1>Prompt Templates</h1>
          <button
            onClick={() => {
              setIsCreating(true);
              setSelectedPromptId(null);
            }}
          >
            New
          </button>
        </div>

        <PromptList
          prompts={prompts}
          selectedPromptId={selectedPromptId}
          onSelectPrompt={(promptId) => {
            setSelectedPromptId(promptId);
            setIsCreating(false);
          }}
          onDeletePrompt={handleDeletePrompt}
        />
      </aside>

      <main className='prompt-page__main'>
        {isCreating && (
          <PromptForm
            onSubmit={(values) => {
              createPrompt(values);
              setIsCreating(false);
            }}
            onCancel={() => setIsCreating(false)}
          />
        )}

        {!isCreating && selectedPrompt && (
          <PromptForm
            initialValue={selectedPrompt}
            onSubmit={(values) => {
              updatePrompt(selectedPrompt.id, values);
            }}
          />
        )}

        {!isCreating && !selectedPrompt && (
          <EmptyState
            title='Prompt を選択してください'
            description='左側の一覧から Prompt を選ぶか、新規作成してください。'
            actionLabel='新規作成'
            onAction={() => setIsCreating(true)}
          />
        )}
      </main>
    </div>
  );
}
