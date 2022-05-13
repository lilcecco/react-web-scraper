import './Controller.css';

const Controller = ({ scraperStatus, process, onToggle }) => {

  return (
    <div className='controller-container'>
      <div>
        <h2>{process.name.toUpperCase()}</h2>
        <div>email</div>
      </div>
      <div className='controller'>
        <div className='status-bar-container'>
          <div className={`status-bar ${scraperStatus ? 'status-bar--on' : ''}`}></div>
        </div>
        <div className='button btn-style-1' onClick={onToggle}>
          {process.status}
        </div>
      </div>
    </div>
  );
}

export default Controller;