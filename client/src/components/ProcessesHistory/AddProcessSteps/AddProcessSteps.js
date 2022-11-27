import './AddProcessSteps.css';

const AddProcessStep = ({ text }) => {
    return (
        <div className="add-process-step">
            <div className="add-process-checklist"></div>
            <div className="add-process-text">{text}</div>
        </div>
    )
}

const AddProcessSteps = () => {
    return (
        <div className="add-process-steps">
            <h3 style={{ marginBottom: '30px' }}>GETTING STARTED</h3>
            <AddProcessStep text="Create a new process" />
            <div className="add-process-line"></div>
            <AddProcessStep text="Select the scrape mode"/>
            <div className="add-process-line"></div>
            <AddProcessStep text="Insert input data"/>
            <div className="add-process-line"></div>
            <AddProcessStep text="Add the process"/>
            <h3 style={{ margin: '60px 0 30px 0' }} >WHAT'S NEXT?</h3>
            <p>Now you can select and run one of your processes and check their status from here</p>
        </div>
    )
}

export default AddProcessSteps;