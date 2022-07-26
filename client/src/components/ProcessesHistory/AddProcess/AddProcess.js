import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddProcess.css';

const AddProcess = ({ onAdd, user }) => {
    const [name, setName] = useState('');
    const [urls, setUrls] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const parsedUrls = urls.split('\n').filter(url => url);
        if (!name || parsedUrls.length === 0) {
            alert('You have to complete all fields');
            return;
        }

        onAdd({ id: uuidv4(), name, urls: parsedUrls, status: 'START', results: [], user_id: user.user_id });

        // reset default
        setName('');
        setUrls('');
    }

    return (
        <form className='add-process' onSubmit={onSubmit}>
            <input
                type='text'
                placeholder='Insert name process'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder='Insert websites list'
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
            />
            <input
                type='submit'
                className='button btn-style-1'
                value='ADD'
            />
        </form>
    );
}

export default AddProcess;