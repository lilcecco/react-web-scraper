import { useState } from "react";

const AccountDetails = ({ isLogged }) => {
    const [user, setUser] = useState();

    return (
        <>
            <h2>Account Details</h2>
            <div className='subtitle'>
                <h4>Personal Informations</h4>
                <span></span>
            </div>
            <div className='textbox'>
                <div>Email</div>
                <div className='text'>{user?.email}</div>
                <span></span>
            </div>
            <div className='btn-style-3'>Reset Password</div>
        </>
    );
}

export default AccountDetails;