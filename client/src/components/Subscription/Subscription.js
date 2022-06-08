import Pricing from './Pricing';
import ManageBilling from './ManageBilling';
import './Subscription.css';

const Subscription = ({ customerId }) => {

  const createCheckoutSession = async (id) => {
    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, customerId }),
    });
    const data = await res.json();

    if (data?.error) return; // update error handler

    window.location = data.url;
  }

  const createPortalSession = async () => {
    const res = await fetch('/api/checkout/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId }),
    });
    const data = await res.json();

    window.location = data.url;
  }

  return (
    <main>
      {/* <Pricing onSubmit={createCheckoutSession} /> */}
      <ManageBilling onSubmit={createPortalSession} />
    </main>
  )

}

export default Subscription;