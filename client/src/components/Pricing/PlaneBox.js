const PlaneBox = ({ boxStyle, options }) => {
  const onCheckout = async () => {
    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: options.id }),
    });
    const data = await res.json();

    window.location = data.url;
  }

  return (
    <div className='plane-box' style={boxStyle} >
      <h2>{options.title}</h2>
      <div className='plane-price-container'>
        <span className='plane-price'>${options.price}</span>/mo
      </div>
      <ul>
        <li>Scraper BOT: {options.description.scraper}</li>
        {options.description.email && <li>Email BOT: {options.description.email}</li>}
        <li>Assistence: 24h</li>
      </ul>
      <div className='button btn-style-1' onClick={onCheckout}>SUBSCRIBE</div>
      <div className='trial-alert' >5 days trial</div>
    </div>
  );
}

PlaneBox.defaultProps = {
  centralBoxStyle: null
}

export default PlaneBox;