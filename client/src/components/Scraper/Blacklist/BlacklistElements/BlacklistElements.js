import BlacklistElement from './BlacklistElement';
import './BlacklistElements.css';

const BlacklistElements = ({ blacklist, onDelete }) => {
  return (
    <div className='blacklist-elements'>
      {blacklist.map(blacklistElem => <BlacklistElement key={blacklistElem.id} blacklistElem={blacklistElem} onDelete={onDelete} />)}
    </div>
  );
}

export default BlacklistElements;