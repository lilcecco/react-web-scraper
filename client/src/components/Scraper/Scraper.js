import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import Controller from './Controller';
import Blacklist from './Blacklist';
import './Scraper.css';

const Scraper = ({ processes, setProcesses, deleteProcess, scrapeEmailFromWebsites, scrapeDataFromGoogleMaps }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Get Process
    const process = useMemo(() => processes.find(process => process.id === id), [processes, id]);

    // Get scraper status
    // const scraperStatus = useMemo(() => processes.find(process => process.status === 'running'), [processes]);

    // Delete Process
    const onDelete = (id) => {
        deleteProcess(id);
        navigate('/processes-history');
    }

    // Start Process
    const onToggle = () => {
        // if (scraperStatus) return alert('Wait the end of the other process to start a new one');
        if (process.status === 'done') return alert('The process is already complete');

        // set front end process status
        setProcesses(processes.map(process => process.id === id ? { ...process, status: 'running' } : process));

        // start scraping
        if (process.type === 'Google Maps') {
            scrapeDataFromGoogleMaps(id);
        } else {
            scrapeEmailFromWebsites(id);
        }
    }

    return (
        <>
            {process && <main className='scraper'>
                <div className='scraper-icons'>
                    <div className='icon-section' onClick={() => navigate('/processes-history')}>
                        <FiArrowLeft className='icon' />
                    </div>
                    <div className='icon-section' onClick={() => onDelete(id)}>
                        <div className='text-icon'>delete</div>
                        <FiX className='icon' />
                    </div>
                </div>
                <Controller process={process} onToggle={onToggle} />
                <section className='bottom-section'>
                    <textarea className='console-container' value={process.results.join('\n')} readOnly />
                    {process.type === 'Websites' && <Blacklist />}
                </section>
            </main>}
        </>
    );
}

export default Scraper;