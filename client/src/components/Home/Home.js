import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

  return (
    <main className='home-container'>
        <h1 style={{ color: 'var(--color-3)' }}>Make your</h1>
        <h1>business better</h1>
        <div className='sub'>SCRAPE DATA FROM WEBSITES · SEND CUSTOMIZED EMAIL · SEND OUTREACH CAMPAIGNS</div>
        <Link to='/auth/register'><div className="button btn-style-1">START FREE TRIAL</div></Link>
    </main>
  )
}

export default Home