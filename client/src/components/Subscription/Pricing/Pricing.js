import Product from './Product';
import './Pricing.css';

const Pricing = () => {
  const products = [
    {
      name: 'Basic',
      price: 5,
      description: ['10 processes per day'],
      lookup_key: 'basic_sub',
    },
    {
      name: 'Premium',
      price: 11,
      description: ['Unlimited processes', '1000 email per month'],
    },
    {
      name: 'Ultimate',
      price: 5,
      description: ['Unlimited processes', 'Unlimited email'],
    },
  ]

  return (
    <div className='pricing-container'>
      <div className='pricing-title'>
        <h1>PRICING</h1>
        <div>Welcome into pricing section! Choose the best plane for your business.</div>
      </div>
      <div className='products-container'>
        {products.map(product => <Product key={product.name} product={product} />)}
      </div>
    </div>
  );
}

export default Pricing;