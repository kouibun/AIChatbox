import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className='app'>
      <nav className='app-nav'>
        <h1>DevMate</h1>

        <NavLink to='/chat'>Chat</NavLink>
        <NavLink to='/prompts'>Prompts</NavLink>
        <NavLink to='/settings'>Settings</NavLink>
      </nav>

      <main className='app-main'>
        <Outlet />
      </main>
    </div>
  );
}
