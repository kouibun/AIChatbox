import type { PromptTemplate } from '../../types/prompt';

interface PromptListProps {
  prompts: PromptTemplate[];
  selectedPromptId?: string | null;
  onSelectPrompt: (id: string) => void;
  onDeletePrompt: (id: string) => void;
}

export function PromptList({
  prompts,
  selectedPromptId,
  onSelectPrompt,
  onDeletePrompt,
}: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <p className='prompt-empty'>
        プロンプトがありません。新しいプロンプトを作成してください。
      </p>
    );
  }

  return (
    <div className='prompt-list'>
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          className={
            prompt.id === selectedPromptId
              ? 'prompt-item prompt-item--active'
              : 'prompt-item'
          }
          onClick={() => onSelectPrompt(prompt.id)}
        >
          <div className='prompt-item__main'>
            <h3>{prompt.title}</h3>
            <p>{prompt.content}</p>

            <div className='prompt-item__tags'>
              {prompt.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              onDeletePrompt(prompt.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
