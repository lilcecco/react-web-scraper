import Process from './Process';
import './Processes.css';

const Processes = ({ processes }) => {

  return (
      <div className='processes'>
        {processes.map(process => <Process key={process.id} process={process} />)}
      </div>
  );
}

export default Processes;