import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import Controller from './Controller';
import Blacklist from './Blacklist';
import './Scraper.css';

const Scraper = ({ getProcess, deleteProcess, scrapeData }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [results, setResults] = useState([]);

    // Get Process
    const process = getProcess(id);

    // Update Results
    useEffect(() => {
        const updResults = () => {
            if (process) {
                const email = process.results?.email ?? [];
                setResults(email);
            }
        }
        updResults();
    }, [process]);

    // Delete Process
    const onDelete = (id) => {
        deleteProcess(id);
        navigate('/');
    }

    // Start Process
    const onToggle = () => {
        if (process.status === 'DONE') {
            alert('The process is already complete');
            return;
        };
        scrapeData(id);
        alert('Process started...');
    }

    return (
        <>
            {process && <main className='scraper'>
                <div className='scraper-icons'>
                    <div className='icon-section' onClick={() => navigate('/')}>
                        <FiArrowLeft className='icon' />
                    </div>
                    <div className='icon-section' onClick={() => onDelete(id)}>
                        <div className='text-icon'>delete</div>
                        <FiX className='icon' />
                    </div>
                </div>
                <Controller process={process} onToggle={onToggle} />
                <section className='bottom-section'>
                    <textarea className='console-container' value={results.join('\n')} readOnly />
                    <Blacklist />
                </section>
            </main>}
        </>
    );
}

export default Scraper;