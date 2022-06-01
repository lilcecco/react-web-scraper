import { useNavigate, useParams } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';

const Auth = ({ onLogin, onRegister }) => {
    const { page } = useParams();
    const navigate = useNavigate();

    const onToggle = () => {
        page === 'login' ? navigate('/auth/register') : navigate('/auth/login')
    }

    return (
        <main className='auth-container'>
            <div className='auth-bg'>
                <img className='img-res' src='/img/blue-waves.jpg' alt=''></img>
            </div>
            <div className='auth-form-container'>
                {page === 'login' ? (
                    <LoginForm onToggle={onToggle} onLogin={onLogin} />
                ) : (
                    <RegisterForm onToggle={onToggle} onRegister={onRegister} />
                )}
            </div>
        </main>
    );
}

export default Auth;