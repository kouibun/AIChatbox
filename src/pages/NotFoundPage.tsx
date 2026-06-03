import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className='page-card'>
      <h1>404 Not Found</h1>
      <p>ページが見つかりませんでした。</p>
      <Link to='/chat'>Chat に戻る</Link>
    </div>
  );
}
