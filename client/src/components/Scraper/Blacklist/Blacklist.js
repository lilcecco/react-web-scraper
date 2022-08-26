import { useContext, useState } from 'react';
import { BlacklistContext } from '../../App';
import BlacklistElements from './BlacklistElements';
import AddBlacklistElement from './AddBlacklistElement';
import './Blacklist.css';

const Blacklist = ({ user }) => {
    const [showAddBlacklistElem, setShowAddBalcklistElem] = useState(false);
    const { blacklist, deleteBlacklistElem, addBlacklistElement } = useContext(BlacklistContext);

    const onAdd = (blacklistElem) => {
        setShowAddBalcklistElem(!showAddBlacklistElem);

        addBlacklistElement(blacklistElem);
    }

    return (
        <div className='blacklist-container'>
            <div className='blacklist-header'>
                <h3>BLACKLIST</h3>
                <div className='button btn-style-2' onClick={() => setShowAddBalcklistElem(!showAddBlacklistElem)}>
                    {showAddBlacklistElem ? 'CLOSE' : 'ADD'}
                </div>
            </div>
            {showAddBlacklistElem ? (
                <AddBlacklistElement onAdd={onAdd} user={user}/>
            ) : (
                <BlacklistElements blacklist={blacklist} onDelete={deleteBlacklistElem} />
            )}
        </div>
    );
}

export default Blacklist;