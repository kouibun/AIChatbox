import { useState } from 'react';

interface InputBoxProps {
  onSend: (message: string) => void;
}

export function InputBox({ onSend }: InputBoxProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSend(trimmedInput);
      setInput('');
    }
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
      <button onClick={handleSend}>送信</button>
    </div>
  );
}
