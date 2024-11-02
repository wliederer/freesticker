import React, { useEffect, useState } from 'react'
import './SendEmail.css'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload  from '../ImageUpload/ImageUpload';
const SERVICE_ID = 'service_8om0mif'
const TEMPLATE_ID = 'template_spprxgg'
const PUBLIC_KEY = '2eyHiJYODn1OC-921'
const URL = 'https://ihavetotakeashit.org'
const LOCAL_URL = 'http://localhost:8080'


const SendEmail = (props) => {
  const [message, setMessage] = useState('')
  // const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false);
  const [imagesToUpload, setImagesToUpload] = useState([]); 
  const [images, setImages] = useState([]); // Store local preview images
  const notify = (message) => toast(message);

  const uploadImagesToS3 = async () => {
    const uploadedImageUrls = [];
    for (const file of imagesToUpload) {
      const formData = new FormData();
      formData.append('file', file);
        const response = await fetch(URL+`/images/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'api-key': process.env.REACT_APP_API_KEY,
          },
        });

        if (!response.ok) {
          if (response.status === 413) {
            throw new Error('File size too large. 10MB limit.');
          } else {
            const errorText = await response.text();
            throw new Error(`Failed to upload image: ${errorText}`);
          }
        }
        const imageUrl = await response.text();
        uploadedImageUrls.push(imageUrl);
    }

    return uploadedImageUrls;
  };


  const handleSendEmail = async (obj) => {
    setLoading(true)
    let imageUrls = []
    try {
      imageUrls = await uploadImagesToS3();
    } catch (error) {
      console.error('Error uploading image:', error);
      notify(`Image upload failed: ${error.message || 'Please try again.'}`);
      setLoading(false)
      return;
    }
    let result = ''
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result += key + ': ' + obj[key] + ', '
      }
    }
    if (imageUrls.length > 0) {
      result += '\nImage URLs:\n' + imageUrls.join('\n');
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
    setImagesToUpload([])
    setImages([])
  }

  return (
    <div className="email-container">
      <div className="heading">
        * Give me a mailing address and I well send free stickers by mail!
      </div>
      <div>
        <form>
          <label>Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            placeholder="Want a free custom sticker? Include your email or social and I will get in contact and create a free custom sticker for you!  You can also just attach up to 3 images per request!"
          />
          <label style={{ color: 'grey' }}>Optionally add up to 3 images you would like me to reference while creating sticker</label>
          <ImageUpload setImagesToUpload={setImagesToUpload} images={images} setImages={setImages} />
          <div className='button-container'>
            <button
              className="send"
              disabled={zip.length < 5 && address.length === 0 || loading}
              onClick={async (e) => {
                e.preventDefault()
                try {
                  await handleSendEmail({ address, city, state, zip, message });
            
                  resetForm();
                  props.setIsSent(true);
                } catch (error) {
                  console.error("Failed to send email:", error);
                }
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
