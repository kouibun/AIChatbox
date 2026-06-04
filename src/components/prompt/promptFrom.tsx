import { useState } from 'react';
import type { PromptTemplate } from '../../types/prompt';

interface PromptFormValues {
  title: string;
  content: string;
  tags: string;
}

interface PromptFormProps {
  initialValue?: PromptTemplate;
  onSubmit: (values: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
  onCancel?: () => void;
}

export function PromptForm({
  initialValue,
  onSubmit,
  onCancel,
}: PromptFormProps) {
  const [values, setValues] = useState<PromptFormValues>({
    title: initialValue?.title ?? '',
    content: initialValue?.content ?? '',
    tags: initialValue?.tags.join(', ') ?? '',
  });

  const handleSubmit = () => {
    const title = values.title.trim();
    const content = values.content.trim();

    if (!title || !content) return;

    const tags = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      title,
      content,
      tags,
    });
  };

  return (
    <div className='prompt-form'>
      <input
        value={values.title}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, title: event.target.value }))
        }
        placeholder='Prompt title'
      />

      <textarea
        value={values.content}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, content: event.target.value }))
        }
        placeholder='Prompt content'
      />

      <input
        value={values.tags}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, tags: event.target.value }))
        }
        placeholder='Tags: react, typescript, interview'
      />

      <div className='prompt-form__actions'>
        {onCancel && <button onClick={onCancel}>Cancel</button>}
        <button onClick={handleSubmit}>
          {initialValue ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}
