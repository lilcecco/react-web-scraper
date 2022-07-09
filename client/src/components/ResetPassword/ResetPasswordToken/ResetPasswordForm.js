import { useState } from 'react';
import { FiXOctagon, FiCheckCircle } from "react-icons/fi";

const ResetPasswordForm = ({ userId }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        const setNewPassword = async () => {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password, confirmPassword })
            });
            const data = await res.json();

            if (data?.error) return setErrorMessage(data.error);

            setSuccessMessage(data.message);
        }

        // reset success message (just if the user want to change the password twice)
        setSuccessMessage('');

        // data check
        if (!password) return setErrorMessage('Password required');
        if (!confirmPassword) return setErrorMessage('Confirm password required');
        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return setErrorMessage('Invalid password');
        if (password !== confirmPassword) return setErrorMessage('Passwords do not match');

        // reset default
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');

        // update new password
        setNewPassword();
    }

    return (
        <div className='reset-password-form-container'>
            <h1>RESET PASSWORD</h1>
            <div className='sub'>Write here your new password, you'll receive some feedback soon!</div>
            {errorMessage && <div className='error message-container'>
                <FiXOctagon className='message-icon' />
                <div className='message'>{errorMessage}</div>
            </div>}
            {successMessage && <div className='message-container'>
                <FiCheckCircle className='message-icon' />
                <div className='message'>{successMessage}</div>
            </div>}
            <form className='reset-password-form' onSubmit={(e) => onSubmit(e)}>
                <div className='textbox'>
                    <input
                        type='password' id='password' name='password' placeholder='Insert new password'
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='textbox'>
                    <input
                        type='password' id='confirm-password' name='confirmPassword' placeholder='Confirm new password'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <input type='submit' className='button btn-style-1' value='RESET' />
            </form>
        </div>
    );
}

export default ResetPasswordForm;