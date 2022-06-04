const Product = ({ product }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lookup_key: product.lookup_key }),
    });
    const data = await res.json();
    console.log(data);
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
      <form onSubmit={(e) => onSubmit(e)}>
        {/* <input type='hidden' name='lookup_key' value={product.lookup_key} /> */}
        <button className='button btn-style-1' type='submit'>SUBSCRIBE</button>
      </form>
      <div className='trial-alert'>5 days trial</div>
    </div>
  );
}

export default Product;
