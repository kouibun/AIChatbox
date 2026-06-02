import { useEffect } from 'react';
import { MessageList } from './components/chat/MessageList';
import { InputBox } from './components/chat/InputBox';

import { useCurrentConversions } from './hooks/useCurrentConversions';
import { useChatActions } from './hooks/useChatActions';

import './styles/globals.css';
import { ConversationList } from './components/chat/ConversationList';

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
    return <div>Conversation not found</div>;
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
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <InputBox onSend={sendMessage} disabled={isSending} />
          </main>
        </div>
      )}
    </div>
  );
}
export default App;
