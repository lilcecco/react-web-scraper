import Pricing from './Pricing';
import ManageBilling from './ManageBilling';
import './Subscription.css';

const Subscription = ({ user }) => {

  const createCheckoutSession = async (priceId) => {
    if (!user) return alert('You have to create a new account first');

    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, customerId: user.customer_id }),
    });
    const data = await res.json();

    if (data?.error) return; // update error handler

    window.location = data.url;
  }

  // const createPortalSession = async () => {
  //   const res = await fetch('/api/checkout/create-portal-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ /* TODO */ }),
  //   });
  //   const data = await res.json();

  //   window.location = data.url;
  // }

  return (
    <main>
      <Pricing onSubmit={createCheckoutSession} />
      {/* <ManageBilling onSubmit={null} /> */}
    </main>
  )

}

export default Subscription;