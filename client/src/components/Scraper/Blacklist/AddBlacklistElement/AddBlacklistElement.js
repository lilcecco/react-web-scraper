import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddBlacklistElement.css';

const AddBlacklistElement = ({ onAdd }) => {
  const [url, setUrl] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      alert('You have to complete all fields');
      return;
    }

    onAdd({ id: uuidv4(), url });

    // reset default
    setUrl('');
  }

  return (
    <form className='add-blacklist-element' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Insert url'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type='submit'
        className='button btn-style-1'
        value='ADD'
      />
    </form>
  );
}

export default AddBlacklistElement;