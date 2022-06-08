import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiShoppingBag, FiLogOut } from "react-icons/fi";
import AccountDetails from './AccountDetails';
import PlaneDetails from './PlaneDetails';
import './PrivateArea.css';

const PrivateArea = ({ logout, isLogged }) => {
  const navigate = useNavigate();
  
  const [planeDetailsOpen, setPlaneDetailsOpen] = useState(false);

    const onLogout = () => {
      logout();
      navigate('/auth/login');
    }

  return (
    <main className='private-area-container'>
      <div className='private-area-menu'>
        <h1>MY ACCOUNT</h1>
        <ul>
          <li onClick={() => setPlaneDetailsOpen(false)}>
            <FiSettings />
            <span>Account Details</span>
          </li>
          <li onClick={() => setPlaneDetailsOpen(true)}>
            <FiShoppingBag />
            <span>Plane Details</span>
          </li>
          <li onClick={onLogout}>
            <FiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='private-area-data'>
      {isLogged && (planeDetailsOpen ? <PlaneDetails /> : <AccountDetails isLogged={isLogged} />) /* Loading... */}
      </div>
    </main>
  )
}

export default PrivateArea