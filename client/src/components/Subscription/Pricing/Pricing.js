import Product from './Product';
import './Pricing.css';

const Pricing = () => {
  const products = [
    {
      price_id: 'price_1L6bUeJYxt4nzzwuRuY20Tgu',
      name: 'Basic',
      price: 5,
      description: ['10 processes per day'],
    },
    {
      price_id: 'price_1L6WRFJYxt4nzzwuFbjS7EgA',
      name: 'Premium',
      price: 11,
      description: ['Unlimited processes', '1000 email per month'],
    },
    {
      price_id: 'price_1L70YxJYxt4nzzwufRfjr51m',
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