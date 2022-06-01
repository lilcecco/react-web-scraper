import { Link } from 'react-router-dom';

const PlaneDetails = () => {
    return (
        <>
            <h2>Plane Details</h2>
            <div className='subtitle'>
                <h4>Plane Informations</h4>
                <span></span>
            </div>
            <div className='textbox'>
                <div>Level</div>
                <div className='text'>FREE TRIAL</div>
                <span></span>
                <Link to='/pricing'><div className='cta btn-style-3'>Update Plane</div></Link>
            </div>
            <div className='subtitle'>
                <h4>Pyament Informations</h4>
                <span></span>
            </div>
            <div className='textbox'>
                <div className='text'>No pyament informations</div>
            </div>
            <div className='btn-style-3'>Delete Subscription</div>
        </>
    );
}

export default PlaneDetails;