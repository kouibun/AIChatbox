import { useEffect } from 'react';

import { ConversationList } from './components/chat/ConversationList';
import { MessageList } from './components/chat/MessageList';
import { InputBox } from './components/chat/InputBox';
import { EmptyState } from './components/common/EmptyState';
import { ErrorMessage } from './components/common/ErrorMessage';

import { useCurrentConversions } from './hooks/useCurrentConversions';
import { useChatActions } from './hooks/useChatActions';

import './styles/globals.css';

function App() {
  const {
    currentConversation,
    currentConversationId,
    conversations,
    isSending,
    errorMessage,
    isLoadingConversations,
    isCreatingConversation,
    deleteConversationId,
  } = useCurrentConversions();
  const {
    selectConversation,
    createConversation,
    deleteConversation,
    sendMessage,
    fetchConversations,
  } = useChatActions();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (!currentConversation) {
    return <EmptyState title='Conversation not found' />;
  }

  return (
    <div className='app'>
      {isLoadingConversations ? (
        <div className='loading'>会話を読み込んでいます...</div>
      ) : (
        <div className='layout'>
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={selectConversation}
            onCreateConversation={createConversation}
            onDeleteConversation={deleteConversation}
            isCreatingConversation={isCreatingConversation}
            deleteConversationId={deleteConversationId}
          />

          <main className='chat-panel'>
            <header className='chat-header'>
              <h1>{currentConversation?.title}</h1>
              <p>React + TypeScript Chat UI</p>
            </header>

            <MessageList messages={currentConversation.messages} />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <InputBox onSend={sendMessage} disabled={isSending} />
          </main>
        </div>
      )}
    </div>
  );
}
export default App;
