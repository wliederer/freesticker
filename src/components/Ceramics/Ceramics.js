import React, {useEffect, useState} from 'react';
import './Ceramics.css'
import Product from '../Products/Products';
import Transaction from '../Transaction/Transaction';
const EVENT_ID = 1;
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY
const URL = 'https://freesticker.org:8443/api'
// const URL = 'http://localhost:8080/api'

const Ceramics = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([])

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
        const eventData = data.filter(p => p.eventId === EVENT_ID);
        setProducts(eventData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  useEffect(()=> {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${URL}/transactions/public`, {
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
       
        const eventData = data.filter(t => products.map(p=>p.id).includes(t.productId));
        setTransactions(eventData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    if(products.length){
      fetchTransactions();
    }
  }, [apiUrl, products])
  
  return (
    <div className='ceramics'>
      {/* <h1 className='logo'>Coming Soon!</h1> */}
      <Transaction products={products} transactions={transactions}/>
      <Product products={products} />
    </div>
  );
};

export default Ceramics;
