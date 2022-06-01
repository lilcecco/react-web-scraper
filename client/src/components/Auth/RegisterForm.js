import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = ({ onToggle, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await onRegister({ id: uuidv4(), email, password, confirmPassword });

        // reset default
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        if (data) onToggle();
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>SIGN UP</h1>
            <div className='sub'>Welcome! Please create a new account.</div>
            <div className='textbox'>
                <label htmlFor='email'>Email</label>
                <input
                    type='text' id='email' name='email' placeholder='Insert email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password' id='password' name='password' placeholder='Insert password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    type='password' id='confirm-password' name='confirmPassword' placeholder='Confirm password'
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <input type='submit' className='button btn-style-1' value='SIGN UP' />
            <div className='switch-auth-link'>
                Already sign?
                <span onClick={onToggle}> Login</span>
            </div>
        </form>
    );
}

export default RegisterForm;