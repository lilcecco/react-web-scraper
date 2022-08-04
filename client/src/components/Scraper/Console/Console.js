import { useState } from 'react';
import './Console.css';

const Console = ({ process }) => {
    const [collumnDiplayed, setCollumnDisplayed] = useState('website');

    return (
        <div className='console'>
            <div className="collumn-selectors-container">
                <h3>RESULTS</h3>
                <div className='collumn-selectors'>
                    <div className={`collumn-selector ${collumnDiplayed === 'website' && 'collumn-selected'}`} onClick={(e) => setCollumnDisplayed('website')}>Websites</div>
                    <div className={`collumn-selector ${collumnDiplayed === 'number' && 'collumn-selected'}`} onClick={(e) => setCollumnDisplayed('number')}>Numbers</div>
                    <div className={`collumn-selector ${collumnDiplayed === 'email' && 'collumn-selected'}`} onClick={(e) => setCollumnDisplayed('email')}>Email</div>
                </div>
            </div>
            <div className='display'>
                {process.places.map((place, i) => <div className='text' key={`places-info-${i}`} >{place[collumnDiplayed] || '/'}</div>)}
            </div>
        </div>
    );
}

export default Console;