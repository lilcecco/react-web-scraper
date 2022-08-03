import './Suggestions.css';

const Suggestions = () => {
    return (
        <div className='suggestions'>
            <div className='suggestion'>
                <div className="icon" style={{ paddingRight: '3px' }}>
                    <h3>1</h3>
                </div>
                <p>At first you have to create a new process clicking on the button “new”.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>2</h3>
                </div>
                <p>Insert the process name and the websites list into the specific area. *Make sure that for each raw corresponds an url.</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>3</h3>
                </div>
                <p>You can create up to five processes contemporary, see their status and eventually start them.</p>
            </div>
        </div>
    );
}

export default Suggestions;