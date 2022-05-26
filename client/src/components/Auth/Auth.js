import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';

const Auth = ({ onLogin, onRegister }) => {
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
                    <RegisterForm onToggle={onToggle} onRegister={onRegister} />
                ) : (
                    <LoginForm onToggle={onToggle} onLogin={onLogin} />
                )}
            </div>
        </main>
    );
}

export default Auth;