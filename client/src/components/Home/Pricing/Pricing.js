import { useEffect, useState } from 'react';
import Product from './Product';
import './Pricing.css';

const Pricing = ({ user, subscribed }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('/api/data/products');
      const data = await res.json();
      setProducts(data);
    }

    getProducts();
  }, []);

  const createCheckoutSession = async (priceId) => {
    if (subscribed()) return alert('You\'re already subscribed');
    if (!user) return window.location = '/auth/register';

    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, customerId: user.customer_id, subStatus: user.status }),
    });
    const data = await res.json();

    if (data?.error) return; // update error handler

    window.location = data.url;
  }

  return (
    <>
    {products && <div className='pricing-container'>
      <div className='pricing-title'>
        <h2>DISCOVER THE PACKAGES AVAILABLE</h2>
        <div>Choose the most covenient package for your business</div>
      </div>
      <div className='products-container'>
        {products.map(product => <Product key={product.prod_name} product={product} onSubmit={createCheckoutSession} />)}
      </div>
    </div>}
    </>
  );
}

export default Pricing;