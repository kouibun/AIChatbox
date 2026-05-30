import type { Message } from '../../types/chat';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={`message-item message-item--${message.role}`}>
      <div className='message-role'>
        {message.role === 'user' ? 'You' : 'AI'}
      </div>
      <div className='message-content'>{message.content}</div>
    </div>
  );
}
