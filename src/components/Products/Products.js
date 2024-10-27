import React from 'react';
import './Products.css';

const Product = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Product;