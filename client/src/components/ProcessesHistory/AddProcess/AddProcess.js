import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddProcess.css';

const AddProcess = ({ onAdd, user }) => {
    const [type, setType] = useState('Google Maps');
    const [name, setName] = useState('');
    const [urls, setUrls] = useState('');
    const [mapsUrl, setMapsUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const parsedUrls = urls.split('\n').filter(url => url);

        if (type === 'Google Maps') {
            if (!mapsUrl) return alert('You have to complete all fields');
        } else {
            if (!name || parsedUrls.length === 0) return alert('You have to complete all fields');
        }

        onAdd({ id: uuidv4(), name, type, status: 'start', user_id: user.id, mapsUrl, urls: parsedUrls, results: [] });

        // reset default
        setName('');
        setUrls('');
    }

    return (
        <form className='add-process' onSubmit={onSubmit}>
            <div className='types'>
                <input
                    type='button'
                    className={type === 'Google Maps' ? 'type-selected' : ''}
                    value='Google Maps'
                    onClick={(e) => setType(e.target.value)}
                />
                <input
                    type='button'
                    className={type === 'Websites' ? 'type-selected' : ''}
                    value='Websites'
                    onClick={(e) => setType(e.target.value)}
                />
            </div>
            <input
                type='text'
                placeholder='Insert process name (ex. Palestre Roma)'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {type === 'Google Maps' ? (
                <input
                    type='text'
                    placeholder='Insert a google maps url'
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                />
            ) : (
                <textarea
                    placeholder='Insert a list of websites'
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                />
            )}
            <input type='submit' className='button btn-style-1' value='ADD' />
        </form>
    );
}

export default AddProcess;