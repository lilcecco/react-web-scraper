import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiShoppingBag, FiLogOut } from "react-icons/fi";
import AccountDetails from './AccountDetails';
import PlaneDetails from './PlaneDetails';
import './PrivateArea.css';

const PrivateArea = ({ logout }) => {
  const navigate = useNavigate();

  const [planeDetailsOpen, setPlaneDetailsOpen] = useState(false);
  const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('/api/auth/logged');
            const user = await res.json();
            if (user?.error) return;
            setUser(user);
        }

        getUser();
    }, []);

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
      {user && (planeDetailsOpen ? <PlaneDetails /> : <AccountDetails user={user} />) /* Loading... */}
      </div>
    </main>
  )
}

export default PrivateArea