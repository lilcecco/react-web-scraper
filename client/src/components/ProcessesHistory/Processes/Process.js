import { Link } from 'react-router-dom';

const Process = ({ process }) => {

  const statusColor = () => {
    if (process.status === 'start' || process.status === 'running') return '#FE6666';
    if (process.status === 'done') return '#61EB55';
  }

  return (
    <Link to={`/process/${process.id}`} >
      <div className='process'>
        <h3 className='name'>{process.name}</h3>
        <div style={{ color: 'var(--color-3)' }}>{process.type}</div>
        <div className='status'>
          Status
          <div className='status-icon' style={{ backgroundColor: statusColor() }}></div>
        </div>
      </div>
    </Link>
  );
}

export default Process;