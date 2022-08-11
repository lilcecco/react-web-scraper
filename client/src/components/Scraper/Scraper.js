import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import Controller from './Controller';
import Blacklist from './Blacklist';
import Console from './Console';
import Notices from './Notices';
import './Scraper.css';

const Scraper = ({ processes, setProcesses, deleteProcess, scrapeEmailFromWebsites, scrapeDataFromGoogleMaps, notices }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Get Process
    const process = useMemo(() => processes.find(process => process.id === id), [processes, id]);

    // Delete Process
    const onDelete = (id) => {
        deleteProcess(id);
        navigate('/processes-history');
    }

    // Start Process
    const onToggle = () => {
        if (process.status === 'done') return alert('The process is already complete');

        // set front-end process status as running
        setProcesses(processes.map(process => process.id === id ? { ...process, status: 'running' } : process));

        // start scraping
        if (process.type === 'Google Maps') {
            scrapeDataFromGoogleMaps(id);
        } else {
            scrapeEmailFromWebsites(id);
        }
    }

    // Update Process Type
    const updateProcessType = async () => {
        const res = await fetch('/api/scraper/update-process-type', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        // if (data?.error) return alert(data.error);

        if (data?.error) {
            if (!notices[data.error]) return alert(data.error);
            return setProcesses(processes.map(process => process.id === id ? { ...process, notices: [data.error, ...process.notices] } : process));
        }

        setProcesses(processes.map(process => process.id === id ? { ...process, type: 'Websites', status: 'start', notices: [data.message, ...process.notices] } : process));
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
                    <Console process={process} />
                    <Notices process={process} notices={notices} updateProcessType={updateProcessType} />
                    <Blacklist />
                </section>
            </main>}
        </>
    );
}

export default Scraper;