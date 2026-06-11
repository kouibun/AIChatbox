import { useForm } from 'react-hook-form';
import type { PromptTemplate } from '../../types/prompt';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  promptSchema,
  type PromptFormValues,
} from '../../schemas/promptSchema';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: initialValue?.title || '',
      content: initialValue?.content || '',
      tags: initialValue?.tags.join(', ') || '',
    },
  });

  const handleFormSubmit = (values: PromptFormValues) => {
    const tags = values.tags
      ? values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];
    onSubmit({
      title: values.title.trim(),
      content: values.content.trim(),
      tags,
    });
  };

  return (
    <form className='prompt-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='form-field'>
        <input placeholder='Prompt title' {...register('title')} />

        {errors.title && <p className='form-error'>{errors.title.message}</p>}
      </div>
      <div className='form-field'>
        <textarea placeholder='Prompt content' {...register('content')} />
        {errors.content && (
          <p className='form-error'>{errors.content.message}</p>
        )}
      </div>
      <div className='form-field'>
        <input
          placeholder='Tags: react, typescript, interview'
          {...register('tags')}
        />

        {errors.tags && <p className='form-error'>{errors.tags.message}</p>}
      </div>

      <div className='prompt-form__actions'>
        {onCancel && (
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
        )}

        <button type='submit'>{initialValue ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}
