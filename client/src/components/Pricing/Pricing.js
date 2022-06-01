import PlaneBox from './PlaneBox';
import './Pricing.css';

const Pricing = ({ isLogged }) => {
  return (
    <main className='pricing-container'>
      <div className='pricing-title'>
        <h1>{isLogged ? 'UPDATE PLANE' : 'PRICING'}</h1>
        <div>Welcome into pricing section! Choose the best plane for your business.</div>
      </div>
      <div className='plane-boxes-container'>
        <PlaneBox isLogged={isLogged} title='Basic' price='5' options={{ scraper: '10 processes per day'}} />
        <PlaneBox isLogged={isLogged} title='Premium' price='11' options={{ scraper: 'Unlimited processes', email: '1000 email per month' }} boxStyle={centralBoxStyle} />
        <PlaneBox isLogged={isLogged} title='Ultimate' price='14' options={{ scraper: 'Unlimited processes', email: 'Unlimited email' }} />
      </div>
    </main>
  );
}

const centralBoxStyle = {
  transform: 'scale(1.1)',
}

export default Pricing;