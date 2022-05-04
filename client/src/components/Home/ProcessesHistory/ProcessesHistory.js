import { useState, useContext } from 'react';
import { ProcessesContext } from '../../App';
import Processes from './Processes';
import AddProcess from './AddProcess';
import './ProcessesHistory.css';

const ProcessesHistory = () => {
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
        <div className='proc-container'>
            <div className='proc-header'>
                <h1>PROCESSES HISTORY</h1>
                <div className='button btn-style-2' onClick={() => setShowAddProcess(!showAddProcess)}>
                    {showAddProcess ? 'CLOSE' : 'NEW'}
                </div>
            </div>
            {showAddProcess ? <AddProcess onAdd={onAdd} /> : <Processes processes={processes} />}
        </div>
    );
}

export default ProcessesHistory;