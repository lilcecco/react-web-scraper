import Logo from './Logo';
import { Link } from 'react-router-dom';
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
                <li><SwitchMode darkMode={darkMode} setDarkMode={setDarkMode} /></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;