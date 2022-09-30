import { FiBell } from 'react-icons/fi';
import Tip from './Notice';
import './Notices.css';

const Notices = ({ process, notices, updateProcessType }) => {
    
    return (
        <div className='notices-container'>
            <div className='notices-header'>
                <h3>NOTICES</h3>
                <FiBell className='notices-icon' />
            </div>
            <div className='notices'>
                {process.notices.length < 1 && <div className='notices-empty-text'>Non ci sono avvisi per questo processo.</div>}
                {process.notices.map((notice, i) => <Tip key={`notice-${i}`} type={notices[notice]?.type} text={notices[notice]?.text} updateProcessType={process.type === 'Google Maps' ? updateProcessType : null} />)}
            </div>
        </div>
    );
}

export default Notices;