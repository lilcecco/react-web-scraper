import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddProcess.css';

const AddProcess = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [urls, setUrls] = useState('');
    const [categories, setCategories] = useState({
        email: false,
        numbers: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const parsedUrls = urls.split('\n').filter(url => url);
        if (!name || parsedUrls.length === 0) {
            alert('You have to complete all fields');
            return;
        }

        let parsedCategories = [];
        for (let [key, value] of Object.entries(categories)) {
            if (value) parsedCategories.push(key);
        }

        if (parsedCategories.length === 0) {
            alert('You have to select almost one category');
            return;
        }

        onAdd({ id: uuidv4(), name, categories: parsedCategories, urls: parsedUrls, status: 'START', results: {} });

        // reset default
        setName('');
        setUrls('');
        setCategories({
            email: false,
            numbers: false,
        });
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
            <ul className='check-categories'>
                <li>
                    <input
                        type='checkbox'
                        id='email-checkbox'
                        checked={categories.email}
                        onChange={(e) => setCategories({ ...categories, email: e.currentTarget.checked })}
                    />
                    <label htmlFor='email-checkbox'>Email</label>
                </li>
                <li>
                    <input
                        type='checkbox'
                        id='numbers-checkbox'
                        checked={categories.numbers}
                        onChange={(e) => setCategories({ ...categories, numbers: e.currentTarget.checked })}
                    />
                    <label htmlFor='numbers-checkbox'>Numbers</label>
                </li>
            </ul>
            <input
                type='submit'
                className='button btn-style-1'
                value='ADD'
            />
        </form>
    );
}

export default AddProcess;