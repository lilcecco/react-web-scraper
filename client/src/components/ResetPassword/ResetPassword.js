import { useParams } from 'react-router-dom';
import './ResetPassword.css';
import ResetPasswordEmail from './ResetPasswordEmail';
import ResetPasswordToken from './ResetPasswordToken';

const ResetPassword = () => {
    const { page } = useParams('');

    return (
        <main className='reset-password-container'>
            {page === 'email' ? (
                <ResetPasswordEmail />
            ) : (
                <ResetPasswordToken token={page}/>
            )}
        </main>
    );
}

export default ResetPassword;