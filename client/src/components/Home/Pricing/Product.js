import { FiCheckCircle } from "react-icons/fi";

const Product = ({ product, onSubmit }) => {

  return (
    <div className='product' style={product.prod_name === 'Premium' ? { transform: 'scale(1.08)' } : {}}>
      <h2>{product.prod_name}</h2>
      <div className='product-price-container'>
        <span className='product-price'>${product.price}</span>/mo
      </div>
      <ul>
        {product.description.map((description, i) => 
        <li key={`desc-elem-${i}`}><FiCheckCircle className="desc-elem-icon" />{description}</li>
        )}
      </ul>
      <div className='button btn-style-1' onClick={() => onSubmit(product.price_id)}>SUBSCRIBE</div>
    </div>
  );
}

export default Product;
