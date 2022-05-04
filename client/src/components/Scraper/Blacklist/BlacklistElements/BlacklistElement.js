import { FiXCircle } from 'react-icons/fi';

const BlacklistElement = ({ blacklistElem, onDelete }) => {
  return (
    <div className='blacklist-element'>
      <div className='text'>{blacklistElem.text}</div>
      <FiXCircle className='icon' onClick={() => onDelete(blacklistElem.id)} />
    </div>
  );
}

export default BlacklistElement;