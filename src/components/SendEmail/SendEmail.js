import React, { useEffect, useState } from 'react'
import './SendEmail.css'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SERVICE_ID = 'service_8om0mif'
const TEMPLATE_ID = 'template_spprxgg'
const PUBLIC_KEY = '2eyHiJYODn1OC-921'


const SendEmail = (props) => {
  const [message, setMessage] = useState('')
  // const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message);


  const handleSendEmail = async (obj) => {
    setLoading(true)
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
        setLoading(false)
        notify("🦄 Success you are getting stickers!")
      },
      (error) => {
        console.log(error.text)
        notify("Uh Oh! something went wrong try again")
      },
    )
  }


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

  const resetForm = async () => {
    setAddress('')
    setZip('')
    setCity('')
    setState('')
    setMessage('')
  }

  return (
    <div className="email-container">
      <div className="heading">
        * Give me a mailing address and I well send free stickers by mail!
      </div>
      <div>
        <form>
          <label>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>Zip Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={zip}
            onChange={handleZipCodeChange}
          />
          <label>City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State</label>
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
            placeholder="Want a free custom sticker? Include your email or social and I will get in contact and create a free custom sticker for you!"
          />
          <div className='button-container'>
            <button
              className="send"
              disabled={zip.length < 5 && address.length === 0 || loading}
              onClick={(e) => {
                e.preventDefault()
                handleSendEmail({ address, city, state, zip, message }).then(
                  () => {
                    resetForm()
                    props.setIsSent(true)
                  },
                )
              }}
            >
              {loading ? (
                <span className="spinner" aria-hidden="true"></span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#f7f7f7" }} />
    </div>
  )
}

export default SendEmail
