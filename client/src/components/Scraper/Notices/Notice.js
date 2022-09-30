import { FiInfo, FiAlertOctagon } from 'react-icons/fi';

const Notice = ({ type, text, updateProcessType }) => {
    return (
        <>
            {(type && text) && <div className='notice'>
                {type === 'error' ? (
                    <>
                        <FiAlertOctagon className='notice-icon error' />
                        <div className='notice-text'>{text}</div>
                    </>
                ) : (
                    <>
                        <FiInfo className='notice-icon' />
                        <div className='notice-text'>{text}</div>
                        {type === 'tip' && <div className='button btn-style-4' onClick={updateProcessType}>CONVERTI</div>}
                    </>
                )}
            </div>}
        </>
    );
}

Notice.defaultProps = {
    updateProcessType: null,
}

export default Notice;