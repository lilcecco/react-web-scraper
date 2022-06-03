import PlaneBox from './PlaneBox';
import './Pricing.css';

const Pricing = () => {
  return (
    <main className='pricing-container'>
      <div className='pricing-title'>
        <h1>PRICING</h1>
        <div>Welcome into pricing section! Choose the best plane for your business.</div>
      </div>
      <div className='plane-boxes-container'>
        <PlaneBox
          options={{ title: 'Basic', price: '5', description: { scraper: '10 processes per day' } }}
        />
        <PlaneBox boxStyle={centralBoxStyle}
          options={{ id: 'price_1L6WRFJYxt4nzzwuFbjS7EgA', title: 'Premium', price: '11', description: { scraper: 'Unlimited processes', email: '1000 email per month' } }}
        />
        <PlaneBox
          options={{ title: 'Ultimate', price: '14', description: { scraper: 'Unlimited processes', email: 'Unlimited email' } }}
        />
      </div>
    </main>
  );
}

const centralBoxStyle = {
  transform: 'scale(1.1)',
}

export default Pricing;