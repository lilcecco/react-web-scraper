import { Link } from 'react-router-dom';

const DropDownMenu = ({ onLogout }) => {
  return (
    <ul>
        <Link to='/private-area'><li>Account</li></Link>
        <li style={borderNone} onClick={onLogout}>Logout</li>

        <div className='triangle'></div>
    </ul>
  );
}

const borderNone = {
  border: 'none'
}

export default DropDownMenu;