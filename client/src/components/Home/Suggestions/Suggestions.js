import './Suggestions.css';

const Suggestions = () => {
    return (
        <div className='suggestions'>
            <div className='suggestion'>
                <div className="icon" style={{ paddingRight: '3px' }}>
                    <h3>1</h3>
                </div>
                <p>At first you have to create a new process clicking the button “New”</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>2</h3>
                </div>
                <p>Insert the process name, copy and paste the websites list in the specific area and select what you want scrape, then click "Add"</p>
            </div>
            <div className='suggestion'>
            <div className="icon">
                    <h3>3</h3>
                </div>
                <p>Now you can see all your processes, their details and you can start them</p>
            </div>
        </div>
    );
}

export default Suggestions;