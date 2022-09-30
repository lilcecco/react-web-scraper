import { FiCheck } from 'react-icons/fi';

const Step = ({ num, status }) => {
    const steps = ['Sign up', 'Login', 'Subscribe'];

    return (
        <>
            <div className={`step ${status === 'current' && 'step-active'}`}>
                <div className={`text ${status === 'current' && 'text-active'}`}>{status === 'complete' ? <FiCheck /> : num}</div>
                <div className="caption">{steps[num - 1]}</div>
            </div>
            {num !== 3 && <div className={`line ${status === 'complete' && 'line-active'}`}></div>}
        </>
    );
}

export default Step