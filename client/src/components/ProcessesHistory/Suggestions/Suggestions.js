import './Suggestions.css';

const Suggestions = () => {
    return (
        <div className='suggestions'>
            <div className='suggestion'>
                <div className="icon" style={{ paddingRight: '3px' }}>
                    <h3>1</h3>
                </div>
                <p>Crea un nuovo processo.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>2</h3>
                </div>
                <p>Inserisci i dati.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>3</h3>
                </div>
                <p>Estrai le informazioni.</p>
            </div>
        </div>
    );
}

export default Suggestions;