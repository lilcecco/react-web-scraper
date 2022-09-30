import { useNavigate } from 'react-router-dom';

const DropDownMenu = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <ul>
      <div className='triangle'></div>
      <li onClick={() => navigate('/private-area/account-details')}>Account</li>
      <li style={{ border: 'none' }} onClick={onLogout}>Logout</li>
    </ul>
  );
}

export default DropDownMenu;