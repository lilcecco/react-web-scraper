import { useState, useContext } from 'react';
import { ProcessesContext } from '../App';
import Processes from './Processes';
import AddProcess from './AddProcess';
import Suggestions from './Suggestions';
import './ProcessesHistory.css';

const ProcessesHistory = ({ user }) => {
    const [showAddProcess, setShowAddProcess] = useState(false);
    const { processes, addProcess } = useContext(ProcessesContext);

    const onAdd = (process) => {
        if (processes.length > 4) {
            alert('You can\'t add other processes (5/5)');
            return;
        }
        setShowAddProcess(false);
        addProcess(process);
    }

    return (
        <main className='processes-history-container'>
            <div className='processes-history'>
            <div className='processes-history-header'>
                <h1>PROCESSES HISTORY</h1>
                <div className='button btn-style-2' onClick={() => setShowAddProcess(!showAddProcess)}>
                    {showAddProcess ? 'CLOSE' : 'NEW'}
                </div>
            </div>
            {showAddProcess ? <AddProcess onAdd={onAdd} user={user} /> : <Processes processes={processes} />}
        </div>
        <Suggestions />
    </main>

    );
}

export default ProcessesHistory;