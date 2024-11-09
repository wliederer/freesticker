import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import TransactionHero from './TransactionHero';
import emailjs from '@emailjs/browser'
import 'react-toastify/dist/ReactToastify.css';
import './Transaction.css'

const SERVICE_ID = 'service_8om0mif'
const TEMPLATE_ID = 'template_spprxgg'
const PUBLIC_KEY = '2eyHiJYODn1OC-921'
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY
const URL = 'https://freesticker.org:8443/api'
const LOCAL_URL = 'http://localhost:8080/api'

const Transaction = ({products, transactions}) => {
    const [message, setMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [loading, setLoading] = useState(false);
    const notify = (message) => toast(message);

    const handleZipCodeChange = (event) => {
        setZip(event.target.value)
        if (event.target.value.length === 5) {
          fetchCityAndState(event.target.value)
        }
      }
      const fetchCityAndState = async (zipCode) => {
        try {
          const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
          const data = await response.json()
          setCity(data.places[0]['place name'])
          setState(data.places[0]['state'])
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      const handleSendEmail = async (obj) => {       
        let result = ''
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            result += key + ': ' + obj[key] + ', '
          }
        }
        
        result = result.slice(0, -2)
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { message: result }, PUBLIC_KEY).then(
          (result) => {
            console.log(result.text)
          },
          (error) => {
            console.log(error.text)
            notify("Uh Oh! something went wrong try again")
          },
        )
      }

      const handleTransaction = async()=>{
        const payload = {
            customer: {
                firstName,
                lastName
            },
            address: {
                line1: addressLine1,
                line2: addressLine2,
                city,
                state,
                zipcode: zip
            },
            productId: products[0].id
        }
        try {
            const response = await fetch(`${LOCAL_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                let text = await response.text()
                notify(text)
            } else {
                let messageMe = message + "ATTN: Ceramics purchased"
                handleSendEmail({firstName, lastName, addressLine1, addressLine2, city, state, zip, messageMe})
                console.log("Transaction successfully received!");
                notify("Transaction successfully received!");
            }
        } catch (error) {
            console.log(error)
            console.error("Failed to create transaction:");
            notify(error);
        } finally {
            setLoading(false)
        }
      }
    
      const resetForm = async () => {
        setFirstName('')
        setLastName('')
        setAddressLine1('')
        setAddressLine2('')
        setZip('')
        setCity('')
        setState('')
        setMessage('')
      }

    return (
        <div>
            <TransactionHero products={products} transactions = {transactions} />
        <div className='transaction-container'>
            {products.length - transactions.length > 0 ?
            <div>
            <div className="heading">
                * Fill out the information and I will send free ceramics!
            </div>
            <div>
                We are almost ready
            {/* <form>
                <label>First Name*</label>
                <input
                type='text'
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name*</label>
                <input
                type='text'
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
          <label>Address Line 1 *</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <label>Address Line 2 *</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
          <label>Zip Code *</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={zip}
            onChange={handleZipCodeChange}
          />
          <label>City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Want me to send shipping updates? include your email or social handle"
          />
          <button
              className="send-transaction"
              disabled={zip.length < 5 || 
                addressLine1.length === 0 || 
                firstName.length === 0 || 
                lastName.length === 0 || 
                city.length === 0 ||
                state.length === 0 ||
                loading}
              onClick={async (e) => {
                e.preventDefault()
                setLoading(true)
                await handleTransaction()
              }}
            >
              {loading ? (
                <span className="spinner" aria-hidden="true"></span>
              ) : (
                'Submit'
              )}
            </button>
          </form> */}
            </div>
            </div>
            : <div className="heading">We Sold out!</div> }
        </div>
        <ToastContainer toastStyle={{ backgroundColor: "#f7f7f7", maxWidth: "300px" }} />
        </div>
    )
}

export default Transaction;