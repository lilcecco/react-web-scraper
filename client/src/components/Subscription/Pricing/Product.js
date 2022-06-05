const Product = ({ product }) => {

  const onSubmit = async () => {
    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: product.id }),
    });
    const data = await res.json();

    window.location = data.url;
  }

  return (
    <div className='product' style={product.name === 'Premium' ? { transform: 'scale(1.08)' } : {}}>
      <h2>{product.name}</h2>
      <div className='product-price-container'>
        <span className='product-price'>${product.price}</span>/mo
      </div>
      <ul>
        <li>{product.description[0]}</li>
        {product.description[1] && <li>{product.description[1]}</li>}
        <li>24h assistence</li>
      </ul>
      <div className='button btn-style-1' onClick={onSubmit}>SUBSCRIBE</div>
      <div className='trial-alert'>5 days trial</div>
    </div>
  );
}

export default Product;
