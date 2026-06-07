import { useEffect } from 'react';

import { ConversationList } from '../components/chat/ConversationList';
import { MessageList } from '../components/chat/MessageList';
import { InputBox } from '../components/chat/InputBox';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorMessage } from '../components/common/ErrorMessage';

import { useCurrentConversions } from '../hooks/useCurrentConversions';
import { useCreateConversationMutation } from '../hooks/mutations/useCreateConversationMutation';
import { useDeleteConversationMutation } from '../hooks/mutations/useDeleteConversationMutation';
import { useChatActions } from '../hooks/useChatActions';

import '../styles/globals.css';

export function ChatPage() {
  const {
    currentConversation,
    currentConversationId,
    conversations,
    isSending,
    errorMessage,
  } = useCurrentConversions();

  const { selectConversation, sendMessage } = useChatActions();

  const createConversationMutation = useCreateConversationMutation();
  const deleteConversationMutation = useDeleteConversationMutation();

  const firstConversationId = conversations[0]?.id;

  useEffect(() => {
    if (!currentConversationId && firstConversationId) {
      selectConversation(firstConversationId);
    }
  }, [currentConversationId, firstConversationId, selectConversation]);

  const handleCreateConversationMutation = async () => {
    const res = await createConversationMutation.mutateAsync();
    selectConversation(res.data.id);
  };

  const handleDeleteConversationMutation = async (conversationId: string) => {
    await deleteConversationMutation.mutateAsync(conversationId);
    if (conversationId === currentConversationId) {
      const nextConversation = conversations.find(
        (item) => item.id !== conversationId,
      );
      selectConversation(nextConversation?.id || '');
    }
  };

  if (createConversationMutation.isPending) {
    return (
      <div className='app'>
        <div className='loading'>会話を読み込んでいます...</div>
      </div>
    );
  }

  if (!currentConversation) {
    return (
      <div className='app'>
        <EmptyState
          title='Conversation not found'
          description='新しい会話を作成してください。'
          actionslabel='新規作成'
          onAction={handleCreateConversationMutation}
        />
      </div>
    );
  }

  return (
    <div className='app'>
      <div className='layout'>
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={selectConversation}
          onCreateConversation={handleCreateConversationMutation}
          onDeleteConversation={handleDeleteConversationMutation}
          isCreatingConversation={createConversationMutation.isPending}
          deleteConversationId={
            deleteConversationMutation.isPending
              ? (deleteConversationMutation.variables ?? null)
              : null
          }
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
    </div>
  );
}
