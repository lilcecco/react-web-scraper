const Product = ({ product, onSubmit }) => {

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
      <div className='button btn-style-1' onClick={() => onSubmit(product.id)}>SUBSCRIBE</div>
      <div className='trial-alert'>5 days trial</div>
    </div>
  );
}

export default Product;
