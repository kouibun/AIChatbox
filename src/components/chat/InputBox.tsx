import { useState } from 'react';

interface InputBoxProps {
  onSend: (message: string) => void | Promise<void>;
  disabled?: boolean;
}

export function InputBox({ onSend, disabled = false }: InputBoxProps) {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || disabled) return;
    await onSend(trimmedInput);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='input-box'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='メッセージを入力してください'
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend} disabled={disabled}>
        {disabled ? '送信中...' : '送信'}
      </button>
    </div>
  );
}
