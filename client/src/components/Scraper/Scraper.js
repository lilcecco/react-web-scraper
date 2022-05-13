import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import Controller from './Controller';
import Blacklist from './Blacklist';
import './Scraper.css';

const Scraper = ({ processes, setProcesses, deleteProcess, scrapeData }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Get Process
    const process = useMemo(() => processes.find(process => process.id === id), [processes, id])

    // Get Scraper Status
    const scraperStatus = useMemo(() => processes.find(process => process.status === 'RUNNING'), [processes])

    // Delete Process
    const onDelete = (id) => {
        deleteProcess(id);
        navigate('/');
    }

    // Start Process
    const onToggle = () => {
        if (scraperStatus) {
            alert('A process is running, wait his conclusion');
            return;
        }
        
        if (process.status === 'DONE') {
            alert('The process is already complete');
            return;
        };
        
        // change status (running)
        setProcesses(processes.map(process => process.id === id ? { ...process, status: 'RUNNING' } : process));
        
        // start scraping
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
                <Controller process={process} scraperStatus={scraperStatus} onToggle={onToggle} />
                <section className='bottom-section'>
                    <textarea className='console-container' value={process.results.join('\n')} readOnly />
                    <Blacklist />
                </section>
            </main>}
        </>
    );
}

export default Scraper;