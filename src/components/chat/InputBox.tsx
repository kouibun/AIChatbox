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

  return (
    <div className='input-box'>
      <input
        type={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='メッセージを入力してください'
      />
      <button onClick={handleSend}>送信</button>
    </div>
  );
}
