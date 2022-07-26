import { useEffect, useState } from 'react';
import Step from './Step';
import './ProgressBar.css';

const ProgressBar = ({ user, subscribed }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const isRegistered = sessionStorage.getItem('isRegistered');

    if (subscribed()) return setStatus(null);
    if (user) return setStatus(['complete', 'complete', 'current']);
    if (isRegistered) return setStatus(['complete', 'current', '']);
    setStatus(null);
  }, [user, subscribed]);

  return (
    <>
      {(window.location.pathname !== '/' && status) && <div className='progress-bar-container'>
        <div className='progress-bar'>
          {status.map((s, i) => <Step key={`step-status-${i}`} num={i + 1} status={s} />)}
        </div>
      </div>}
    </>
  );
}

export default ProgressBar;