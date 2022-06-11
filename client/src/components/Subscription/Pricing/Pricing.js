import { useEffect, useState } from 'react';
import Product from './Product';
import './Pricing.css';

const Pricing = ({ onSubmit }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('/api/data/products');
      const data = await res.json();
      setProducts(data);
    }

    getProducts();
  }, []);

  return (
    <>
    {products && <main>
      <div className='pricing-title'>
        <h1>PRICING</h1>
        <div>Welcome into pricing section! Choose the best plane for your business.</div>
      </div>
      <div className='products-container'>
        {products.map(product => <Product key={product.prod_name} product={product} onSubmit={onSubmit} />)}
      </div>
    </main>}
    </>
  );
}

export default Pricing;