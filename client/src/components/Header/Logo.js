import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/'>
        <div className='logo-img'>
          <img className="img-res" src="/img/logo.png" art=""></img>
        </div>
      </Link>
      <span></span>
      <Link to='/'><div>Easy lead generation</div></Link>
    </div>
  );
}

export default Logo;