import Tip from './Notice';
import './Tips.css';

const Notices = ({ process, notices, updateProcessType }) => {

    return (
        <div className='tips-container'>
            {(process && notices) && process.notices.map((noticeId, i) => <Tip key={`notice-${i}`} type={notices[noticeId]?.type} text={notices[noticeId]?.text} updateProcessType={process.type === 'Google Maps' ? updateProcessType : null} />)}
        </div>
    );
}

export default Notices;