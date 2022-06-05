import { useEffect, useState } from 'react';
import Pricing from './Pricing';
import ManageBilling from './ManageBilling';
import './Subscription.css';

const Subscription = ({ isLogged }) => {
  const [customerId, setCustomerId] = useState('');
  // const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('cancel')) {
      alert('cancelled');
      return;
    }

    if (query.get('success')) {
      const updateCustomerId = async () => {
        const res = await fetch('/api/data/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId: query.get('session_id') }),
        });
        const data = await res.json();

        if (data?.error) return;
      }

      updateCustomerId();
    }

    const getCustomerId = async () => {
      const res = await fetch('/api/data/user');
      const data = await res.json();

      if (data?.error) return; // update error handler

      setCustomerId(data.customer_id);
    }

    getCustomerId();
  }, []);

  return (
    <main>
      {customerId ? (
        <ManageBilling customerId={customerId} />
      ) : (
        <Pricing />
      )}
    </main>
  )

}

export default Subscription;