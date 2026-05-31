import { useState, useEffect } from 'react';
import { MessageList } from './components/chat/MessageList';
import { InputBox } from './components/chat/InputBox';
import type { Message, Conversation } from './types/chat';

import './styles/globals.css';
import { ConversationList } from './components/chat/ConversationList';

const initialConversations: Conversation[] = [
  {
    id: 'conversation-1',
    title: 'New Chat',
    messages: [
      {
        id: 'message-1',
        role: 'assistant',
        content: 'こんにちは、DevMateです。何を手伝いましょうか？',
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

function App() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);

  const [currentConversationId, setCurrentConversationId] = useState(
    initialConversations[0].id,
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId,
  );

  const handleConversionSelect = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  const handleCreateConversation = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: `New Chat ${conversations.length + 1}`,
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '新しいチャットを開始しました。',
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversationId(newConversation.id);
  };

  const handleDeleteConversation = (conversationId: string) => {
    if (conversations.length === 1) {
      alert('少なくとも1つの会話が必要です。');
      return;
    }

    const nextConversations = conversations.filter(
      (conv) => conv.id !== conversationId,
    );

    setConversations(nextConversations);

    if (currentConversationId === conversationId) {
      setCurrentConversationId(nextConversations[0].id);
    }
  };

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `「${content}」について考えています。`,
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage, assistantMessage],
            }
          : conv,
      ),
    );
  };

  return (
    <div className='app'>
      <div className='layout'>
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={handleConversionSelect}
          onCreateConversation={handleCreateConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>
      <div className='chat-panel'>
        <header className='chat-header'>
          <h1>DevMate</h1>
          <p>React + TypeScript Chat UI</p>
        </header>

        <MessageList messages={currentConversation?.messages || []} />
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
}
export default App;
