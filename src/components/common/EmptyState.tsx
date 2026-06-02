interface EmptyStateProps {
  title: string;
  description?: string;
  actionslabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionslabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className='empty-state'>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {actionslabel && onAction && (
        <button onClick={onAction}>{actionslabel}</button>
      )}
    </div>
  );
}
