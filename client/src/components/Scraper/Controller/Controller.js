import './Controller.css';

const Controller = ({ process, onToggle }) => {

  return (
    <div className='controller-container'>
      <div>
        <h2>{process.name.toUpperCase()}</h2>
        <div>{process.categories.join(' - ')}</div>
      </div>
      <div className='controller'>
        <div className='status-bar'>
          <div className='track' style={{ width: '100px' }}></div>
        </div>
        <div className='button btn-style-1' onClick={onToggle}>
          {process.status}
        </div>
      </div>
    </div>
  );
}

export default Controller;