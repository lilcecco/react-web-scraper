import { useEffect, useState } from 'react';
import Pricing from './Pricing';
import ManageBilling from './ManageBilling';
import './Subscription.css';

const Subscription = ({ isLogged }) => {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSessionId(query.get('session_id'));
    }

  }, [sessionId]);

  return (
    <main>
      {sessionId ? (
        <ManageBilling sessionId={sessionId} />
      ) : (
        <Pricing />
      )}
    </main>
  )

}

export default Subscription;