import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import Logo from './Logo';
import SwitchMode from './SwitchMode';
import DropDownMenu from './DropDownMenu';
import './Header.css';

const Header = ({ darkMode, setDarkMode, user, logout, subscribed }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/auth/login');
  }

  return (
    <header className='header'>
      <Logo />
      <nav className='nav'>
        <ul>
          <Link to='/'><li>Home</li></Link>
          {subscribed() && <Link to='/processes-history'><li>Scraper</li></Link>}
          {subscribed() ? (
            <li className='evi'>{subscribed().toUpperCase()}</li>
          ) : (
            <Link to='/pricing'><li>Pricing</li></Link>
          )}
          <li>
            <FiUser className='user-icon' onClick={user ? () => navigate('/private-area/account-details') : () => navigate('/auth/login')} />
            {user && <DropDownMenu onLogout={onLogout} />}
          </li>
          <li><SwitchMode darkMode={darkMode} setDarkMode={setDarkMode} /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;