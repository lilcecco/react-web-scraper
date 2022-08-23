import { useState, useEffect } from 'react';
import './Console.css';

const Console = ({ process, updateProcessType }) => {
    const [collumnDiplayed, setCollumnDisplayed] = useState('website');
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isNumbersEmpty, setIsNumbersEmpty] = useState(false)
    const [isNamesEmpty, setIsNamesEmpty] = useState(false);

    useEffect(() => {
        const getIsEmailEmpty = () => {
            const email = process.places.map(place => place.email).filter(email => email);

            if (email.length < 1) {
                setIsEmailEmpty(true);
            } else {
                setIsEmailEmpty(false);
            }
        }

        const getIsNumbersEmpty = () => {
            const numbers = process.places.map(place => place.number).filter(number => number);

            if (numbers.length < 1) {
                setIsNumbersEmpty(true);
            } else {
                setIsNumbersEmpty(false);
            }
        }

        const getIsNamesEmpty = () => {
            const names = process.places.map(place => place.name).filter(name => name);

            if (names.length < 1) {
                setIsNamesEmpty(true);
            } else {
                setIsNamesEmpty(false);
            }
        }

        getIsEmailEmpty();
        getIsNumbersEmpty();
        getIsNamesEmpty();
    }, [process]);

    return (
        <div className='console'>
            <div className="collumn-selectors-container">
                <h3>RESULTS</h3>
                <div className='collumn-selectors'>
                    {(process.type === 'Google Maps' || !isNamesEmpty) && <div className={`button btn-style-4 ${collumnDiplayed === 'name' && 'collumn-selected'}`} onClick={() => setCollumnDisplayed('name')}>Names</div>}
                    <div className={`button btn-style-4 ${collumnDiplayed === 'website' && 'collumn-selected'}`} onClick={() => setCollumnDisplayed('website')}>Websites</div>
                    {(process.type === 'Google Maps' || !isNumbersEmpty) && <div className={`button btn-style-4 ${collumnDiplayed === 'number' && 'collumn-selected'}`} onClick={() => setCollumnDisplayed('number')}>Numbers</div>}
                    {process.type === 'Websites' && <div className={`button btn-style-4 ${collumnDiplayed === 'email' && 'collumn-selected'}`} onClick={() => setCollumnDisplayed('email')}>Email</div>}
                </div>
            </div>
            <ol className='console-display'>
                {(collumnDiplayed !== 'email' || !isEmailEmpty || process.status === 'done') && process.places.map((place, i) => <li className='text' key={`places-info-${i}`} >{place[collumnDiplayed] || '/'}</li>)}
            </ol>
        </div>
    );
}

export default Console;