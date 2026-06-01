import { MessageList } from './components/chat/MessageList';
import { InputBox } from './components/chat/InputBox';

import { useChatStore } from './stores/chatStore';

import './styles/globals.css';
import { ConversationList } from './components/chat/ConversationList';

function App() {
  const conversions = useChatStore((state) => state.conversations);
  const currentConversationId = useChatStore(
    (state) => state.currentConversationId,
  );
  const handleSelectConversation = useChatStore(
    (state) => state.selectConversation,
  );
  const handleCreateConversation = useChatStore(
    (state) => state.createConversation,
  );
  const handleDeleteConversation = useChatStore(
    (state) => state.deleteConversation,
  );

  const handleSend = useChatStore((state) => state.sendMessage);

  const currentConversation = conversions.find(
    (conv) => conv.id === currentConversationId,
  );

  if (!currentConversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className='app'>
      <div className='layout'>
        <ConversationList
          conversations={conversions}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onCreateConversation={handleCreateConversation}
          onDeleteConversation={handleDeleteConversation}
        />

        <main className='chat-panel'>
          <header className='chat-header'>
            <h1>{currentConversation?.title}</h1>
            <p>React + TypeScript Chat UI</p>
          </header>

          <MessageList messages={currentConversation.messages} />
          <InputBox onSend={handleSend} />
        </main>
      </div>
    </div>
  );
}
export default App;
