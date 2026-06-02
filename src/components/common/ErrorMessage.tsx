interface EmptyStateProps {
  message: string;
}

export function ErrorMessage({ message }: EmptyStateProps) {
  return <p className='error-message'>{message}</p>;
}
