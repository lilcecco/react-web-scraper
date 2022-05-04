import { Link } from 'react-router-dom';

const Process = ({ process }) => {

  const statusColor = () => {
    if (process.status === 'START' || process.status === 'STOP') return '#FE6666';
    if (process.status === 'RESULT') return '#61EB55';
  }

  return (
    <Link to={`/scraper/${process.id}`} >
      <div className='process'>
        <h3 className='name'>{process.name}</h3>
        <div style={{ color: 'var(--color-3)' }}>
          {process.categories.join(' - ')}
        </div>
        <div className='status'>
          Status
          <div className='status-icon' style={{ backgroundColor: statusColor() }}></div>
        </div>
      </div>
    </Link>
  );
}

export default Process;