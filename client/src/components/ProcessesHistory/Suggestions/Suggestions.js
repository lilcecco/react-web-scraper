import './Suggestions.css';

const Suggestions = () => {
    return (
        <div className='suggestions'>
            <div className='suggestion'>
                <div className="icon" style={{ paddingRight: '3px' }}>
                    <h3>1</h3>
                </div>
                <p>Come prima cosa devi creare un nuovo processo, scegliendo se ricavare le informazioni dai siti web o da Google Maps.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>2</h3>
                </div>
                <p>Inserire i dati richiesti: nel caso di estrazione da Google Maps un url vaido, nel caso di estrazione da siti web una lista di url.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>3</h3>
                </div>
                <p>Puoi avere fino a cinque processi attivi contemporaneamente. Puoi accedervi, iniziare l'estrazione e visualizzare i risultati di ognuno di essi.</p>
            </div>
        </div>
    );
}

export default Suggestions;