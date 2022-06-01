const AccountDetails = ({ user }) => {
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
            <div className='textbox'>
                <div>Password</div>
                <div className='text'>{'•'.repeat(user.passwordLength)}</div>
                <span></span>
                <div className='cta btn-style-3'>Reset Password</div>
            </div>
        </>
    );
}

export default AccountDetails;