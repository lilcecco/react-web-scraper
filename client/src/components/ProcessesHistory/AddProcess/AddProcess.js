import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddProcess.css';

const AddProcess = ({ onAdd, user }) => {
    const [type, setType] = useState('Google Maps');
    const [name, setName] = useState('');
    const [websites, setWebsites] = useState('');
    const [mapsUrl, setMapsUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const parsedUrls = [...new Set(websites.split('\n').filter(website => website && website !== '/'))].map(website => { return { website } });

        if (type === 'Google Maps') {
            if (!mapsUrl) return alert('You have to complete all fields');
        } else {
            if (!name || parsedUrls.length === 0) return alert('You have to complete all fields');
        }

        onAdd({ id: uuidv4(), name, type, status: 'start', user_id: user.id, maps_url: mapsUrl, places: [...parsedUrls], notices: [] });

        // reset default
        setName('');
        setWebsites('');
    }

    return (
        <form className='add-process' onSubmit={onSubmit}>
            <div className='types'>
                <div className={`button btn-style-4 ${type === 'Google Maps' ? 'type-selected' : ''}`} onClick={() => setType('Google Maps')}>Google Maps</div>
                <div className={`button btn-style-4 ${type === 'Websites' ? 'type-selected' : ''}`} onClick={() => setType('Websites')}>Websites</div>
            </div>
            <input
                type='text'
                placeholder='Insert process name'
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
                <div className='add-process-textarea-container'>
                    <textarea
                        placeholder='Insert a list of websites'
                        value={websites}
                        onChange={(e) => setWebsites(e.target.value)}
                    />
                </div>
            )}
            <input type='submit' className='button btn-style-1' value='ADD' />
        </form>
    );
}

export default AddProcess;