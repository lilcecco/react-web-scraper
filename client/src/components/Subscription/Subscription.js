import { useState, useEffect } from 'react';
import Pricing from './Pricing';
import ManageSubscription from './ManageSubscription';
import './Subscription.css';

const Subscription = () => {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <main><Pricing /></main>;
  } else if (success && sessionId !== '') {
    return <main><ManageSubscription sessionId={sessionId} /></main>;
  } else {
    return <main><div>{message}</div></main>;
  }

}

export default Subscription;