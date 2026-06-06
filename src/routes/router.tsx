import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ChatPage } from '../pages/ChatPage';
import { PromptPage } from '../pages/PromptPage';
import { SettingsPage } from '../pages/SettingPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/chat' />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      { path: 'prompts', element: <PromptPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
