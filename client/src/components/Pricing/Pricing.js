import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import './Pricing.css';

const Pricing = ({ user }) => {
  const navigate = useNavigate();
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
    if (!user) {
      alert('You have to create a new account first');
      navigate('/auth/register');
      return;
    }

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

  return (
    <>
    {products && <main>
      <div className='pricing-title'>
        <h1>PRICING</h1>
        <div>Welcome into pricing section! Choose the best plane for your business.</div>
      </div>
      <div className='products-container'>
        {products.map(product => <Product key={product.prod_name} product={product} onSubmit={createCheckoutSession} />)}
      </div>
    </main>}
    </>
  );
}

export default Pricing;