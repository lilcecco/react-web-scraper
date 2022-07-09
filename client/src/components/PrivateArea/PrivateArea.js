import { useNavigate, useParams } from 'react-router-dom';
import { FiSettings, FiShoppingBag, FiLogOut } from "react-icons/fi";
import AccountDetails from './AccountDetails';
import PlaneDetails from './PlaneDetails';
import './PrivateArea.css';

const PrivateArea = ({ logout, user, subscribed }) => {
  const { page } = useParams();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/auth/login');
  }

  const createPortalSession = async () => {
    const res = await fetch('/api/checkout/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId: user.customer_id }),
    });
    const data = await res.json();

    window.location = data.url;
  }

  return (
    <main className='private-area-container'>
      <div className='private-area-menu'>
        <h1>MY ACCOUNT</h1>
        <ul>
          <li onClick={() => navigate('/private-area/account-details')}>
            <FiSettings />
            <span>Account Details</span>
          </li>
          <li onClick={() => navigate('/private-area/plan-details')}>
            <FiShoppingBag />
            <span>Plan Details</span>
          </li>
          <li onClick={onLogout}>
            <FiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='private-area-data'>
        {user && (page === 'plan-details' ? (
          <PlaneDetails subscribed={subscribed} user={user} onSubmit={createPortalSession}/>
        ) : (
          <AccountDetails user={user} logout={logout} />
        ))}
      </div>
    </main>
  )
}

export default PrivateArea