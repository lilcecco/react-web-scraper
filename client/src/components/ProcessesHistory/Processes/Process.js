import { Link } from 'react-router-dom';
import { FiMapPin, FiChrome } from 'react-icons/fi';

const Process = ({ process }) => {

  const statusColor = () => {
    if (process.status === 'start' || process.status === 'running') return '#ff5252';
    if (process.status === 'done') return '#61EB55';
  }

  return (
    <Link to={`/process/${process.id}`} >
      <div className='process'>
        <h3 className='process-name'>{process.name}</h3>
        <div className='process-type'>
          {process.type.toUpperCase()}
          {(process.type === 'Google Maps') ? <FiMapPin className='process-type-icon' /> : <FiChrome className='process-type-icon' />}
        </div>
        <div className='process-status'>
          <div>Status</div>
          <div className='process-status-icon' style={{ backgroundColor: statusColor() }}></div>
        </div>
      </div>
    </Link>
  );
}

export default Process;