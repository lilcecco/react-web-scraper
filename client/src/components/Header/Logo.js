import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/'><div className='logo-img'></div></Link>
      <span></span>
      <Link to='/'><div>Web Scraper</div></Link>
    </div>
  );
}

export default Logo;