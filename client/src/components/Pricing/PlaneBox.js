import { useNavigate } from 'react-router-dom';

const PlaneBox = ({ isLogged, title, price, options, boxStyle }) => {
  const navigate = useNavigate();

  return (
    <div className='plane-box' style={boxStyle} >
      <h2>{title}</h2>
      <div className='plane-price-container'>
        <span className='plane-price'>${price}</span>/mo
      </div>
      <ul>
        <li>Scraper BOT: {options.scraper}</li>
        {options.email && <li>Email BOT: {options.email}</li>}
        <li>Assistence: 24h</li>
      </ul>
      <div className='button btn-style-1' onClick={() => navigate(`/auth/${isLogged ? '' : 'register'}`)}>
        {isLogged ? 'UPDATE' : 'SUBSCRIBE'}
      </div>
      {!isLogged && <div className='trial-alert' >5 days trial</div>}
    </div>
  );
}

PlaneBox.defaultProps = {
  centralBoxStyle: null
}

export default PlaneBox;