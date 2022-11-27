import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import Logo from './Logo';
import SwitchMode from './SwitchMode';
import DropDownMenu from './DropDownMenu';
import ProgressBar from './ProgressBar';
import './Header.css';

const Header = ({ darkMode, setDarkMode, user, subscribed }) => {
  const navigate = useNavigate();

  return (
    <header className='header-container'>
      <div className='header'>
        <Logo />
        <nav className='nav'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            {subscribed() && <Link to='/processes-history'><li>Scraper</li></Link>}
            {subscribed() && <li className='evi'>
              {subscribed().toUpperCase()}
              {window.location.pathname !== '/' && <DropDownMenu user={user} />}
            </li>}
            <li><FiUser className='user-icon' onClick={user ? () => navigate('/private-area/account-details') : () => navigate('/auth/register')} /></li>
            <li><SwitchMode darkMode={darkMode} setDarkMode={setDarkMode} /></li>
          </ul>
        </nav>
      </div>
      <ProgressBar user={user} subscribed={subscribed} />
    </header>
  );
}

export default Header;