import React, {useEffect, useState} from 'react';
import './Ceramics.css'
import Product from '../Products/Products';

const Ceramics = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY
  const URL = 'https://ihavetotakeashit.org'
const LOCAL_URL = 'http://localhost:8080'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);
  
  return (
    <div className='ceramics'>
      <h1 className='logo'>Coming Soon!</h1>
      <Product products={products} />
    </div>
  );
};

export default Ceramics;
