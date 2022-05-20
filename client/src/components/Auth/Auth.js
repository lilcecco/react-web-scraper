import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';

const Auth = ({ setToken}) => {
    const [registerOpen, setRegisterOpen] = useState(false);

    const onToggle = () => {
        setRegisterOpen(!registerOpen);
    }

    return (
        <main className='auth-container'>
            <div className='auth-bg'>
                <img className='img-res' src='/img/blue-waves.jpg' alt=''></img>
            </div>
            <div className='auth-form-container'>
                {registerOpen ? (
                    <RegisterForm onToggle={onToggle} />
                ) : (
                    <LoginForm onToggle={onToggle} setToken={setToken} />
                )}
            </div>
        </main>
    );
}

export default Auth;