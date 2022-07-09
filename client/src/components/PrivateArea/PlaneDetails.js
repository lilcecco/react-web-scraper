import { Link } from 'react-router-dom';

const PlaneDetails = ({ subscribed, user, onSubmit }) => {
    return (
        <>
        <h2>Plan Details</h2>
        <div className='subtitle'>
            <h4>Plan Informations</h4>
            <span></span>
        </div>
        <div className='textbox'>
            <div>Level</div>
            <div className='text'>{subscribed() ? user.prod_name.toUpperCase() : 'INACTIVE'}</div>
            <span></span>
            {subscribed() ? (
                <div className='cta btn-style-3' onClick={onSubmit}>Manage billing</div>
            ) : (
                <Link to='/pricing'><div className='cta btn-style-3'>Move to pricing</div></Link>
            )}
        </div>
        </>
    );
}

export default PlaneDetails;