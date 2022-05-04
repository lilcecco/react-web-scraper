import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import Controller from './Controller';
import Blacklist from './Blacklist';
import './Scraper.css';

const Scraper = ({ getProcess, deleteProcess }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const process = getProcess(id);

    const onDelete = (id) => {
        deleteProcess(id);
        navigate('/');
    }

    return (
        <main className='scraper'>
            <div className='scraper-icons'>
                <FiArrowLeft className='icon' onClick={() => navigate('/')}/>
                <FiX className='icon' onClick={() => onDelete(id)} />
            </div>
            <Controller process={process} />
            <section className='bottom-section'>
                <div className='console-container'>
                    {'>'}
                </div>
                <Blacklist />
            </section>
        </main>
    );
}

export default Scraper;