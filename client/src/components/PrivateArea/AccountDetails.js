import { Link } from 'react-router-dom';

const AccountDetails = ({ user, logout }) => {

    return (
        <>
        <h2>Account Details</h2>
        <div className='subtitle'>
            <h4>Personal Informations</h4>
            <span></span>
        </div>
        <div className='textbox'>
            <div>Email</div>
            <div className='text'>{user.email}</div>
            <span></span>
        </div>
        <Link to='/reset-password/email'><div className='btn-style-3' onClick={logout}>Reset Password</div></Link>
        </>
    );
}

export default AccountDetails;