import { FiMapPin, FiChrome } from 'react-icons/fi';
import './Controller.css';

const Controller = ({ process, onToggle }) => {
  return (
    <div className='controller-container'>
      <section>
        <h2>{process.name.toUpperCase()}</h2>
        <div className='process-type'>
          {process.type.toUpperCase()}
          {(process.type === 'Google Maps') ? <FiMapPin className='process-type-icon' /> : <FiChrome className='process-type-icon' />}
        </div>
      </section>
      <section>
        <div className='controller'>
          <div className="loading-bar-container">
            <div className={`loading-bar ${process.status === 'running' && 'loading-bar--on'} ${process.status === 'done' && 'loading-bar--full'}`}></div>
          </div>
          <div className="button-container">
            <div className='button btn-style-1' onClick={process.status !== 'running' ? onToggle : null}>
              {process.status.toUpperCase()}
            </div>
          </div>
        </div>
        <div className='process-execution'>{process.status === 'running' && 'Execution...'}</div>
      </section>
    </div>
  );
}

export default Controller;