import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import Logo from './Logo';
import SwitchMode from './SwitchMode';
import './Header.css';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className='header'>
        <Logo />
        <nav className='nav'>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/login'><li><FiUser style={userIconStyle} /></li></Link>
                <li><SwitchMode darkMode={darkMode} setDarkMode={setDarkMode} /></li>
            </ul>
        </nav>
    </header>
  );
}

const userIconStyle = {
  width: '30px',
  height: '30px',
  strokeWidth: '1.5'
}

export default Header;