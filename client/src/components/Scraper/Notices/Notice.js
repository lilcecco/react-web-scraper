import { FiInfo, FiAlertOctagon } from 'react-icons/fi';

const Notice = ({ type, text, updateProcessType }) => {
    return (
        <>
            {(type && text) && <div className='tip'>
                {type === 'error' ? (
                    <>
                        <FiAlertOctagon className='tip-icon error' />
                        <div className='tip-text'>{text}</div>
                    </>
                ) : (
                    <>
                        <FiInfo className='tip-icon' />
                        <div className='tip-text'>{text}</div>
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