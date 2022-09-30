import { Link } from 'react-router-dom';

const PlaneDetails = ({ subscribed, user, onSubmit }) => {
    return (
        <>
        <h2>Plan Details</h2>
        <div className='subtitle'>
            <h4>Plan Informations</h4>
            <span></span>
        </div>
        {subscribed() ? (
            <div className='textbox'>
                <div>Level</div>
                <div className='text'>{user.prod_name.toUpperCase()}</div>
                <span></span>
                <div className='cta btn-style-3' onClick={onSubmit}>MANAGE BILLING</div>
            </div>
        ) : (
            <div className='textbox'>
                <div className='text'>Your subscription is currently inactive</div>
                <span></span>
                <Link to='/pricing'><div className='cta btn-style-3'>MOVE TO PRICING</div></Link>
            </div>
        )}
        </>
    );
}

export default PlaneDetails;