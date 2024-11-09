import React, {useEffect} from 'react';
import './TransactionHero.css'; 

const TransactionHero = ({products, transactions}) => {
    // useEffect(() => {
    //     console.log(products,"products")
    //     console.log(transactions,"transactions")
    // },[products,transactions])
    return (
        <div className="transaction-hero-container">
            <div className="hero-content">
                <div className='hero-title'>Ceramics Left:{products.length - transactions.length} </div>
            </div>
        </div>
    );
}

export default TransactionHero;