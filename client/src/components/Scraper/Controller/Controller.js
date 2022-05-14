import './Controller.css';

const Controller = ({ process, onToggle }) => {

  return (
    <div className='controller-container'>
      <section>
        <h2>{process.name.toUpperCase()}</h2>
        <div>email</div>
      </section>
      <section>
      <div className='controller'>
        <div className='status-bar-container'>
          <div 
          className={`status-bar ${process.status === 'RUNNING' ? 'status-bar--on' : process.status === 'DONE' ? 'status-bar--done' : ''}`}
          style={{ transition: `all ${process.status === 'RUNNING' ? process.urls.length * 1.2 : .3}s ease-in-out` }}
          >
          </div>
        </div>
        <div className='button btn-style-1' onClick={onToggle}>
          {process.status}
        </div>
      </div>
      <div className='proc-status'>{process.status === 'RUNNING' ? 'Execution...' : ''}</div>
      </section>
    </div>
  );
}

export default Controller;