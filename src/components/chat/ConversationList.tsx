import type { Conversation } from '../../types/chat.ts';

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
}: ConversationListProps) {
  return (
    <aside className='conversation-list'>
      <div className='conversation-list__header'>
        <h2>Chats</h2>
        <button onClick={onCreateConversation}>＋</button>
      </div>

      <div className='conversation-list__items'>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={
              conversation.id === currentConversationId
                ? 'conversation-item conversation-item--active'
                : 'conversation-item'
            }
            onClick={() => onSelectConversation(conversation.id)}
          >
            <span>{conversation.title}</span>

            <button
              onClick={(event) => {
                event.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
