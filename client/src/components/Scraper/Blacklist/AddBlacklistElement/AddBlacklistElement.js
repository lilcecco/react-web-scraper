import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddBlacklistElement.css';

const AddBlacklistElement = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('You have to complete all fields');
      return;
    }

    onAdd({ id: uuidv4(), text });

    // reset default
    setText('');
  }

  return (
    <form className='add-blacklist-element' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Insert text'
        value={text}
        onChange={(e) => setText(e.target.value)}
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