import React, { useEffect, useState } from 'react'
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest.js';
import {useParams} from 'react-router-dom'
import CheckoutForm from '../checkoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51N9Y51CuS0x8KIXywvDOwScJPtJVs6LYHtFBb6GWfJWfD4RICeBsazZvlM6ki0HW6ef4BUR36bl6wr467QvMNjhs00abm5FJsu")


const Pay = () => {

  const [clientSecret, setClientSecret] = useState("")

  const {id} = useParams()

  useEffect(() => {

   const makeRequest = async () => {

      try {

        const res = await newRequest.post(`/orders/create-payment-intent/${id}`)

        setClientSecret(res.data.clientSecret)
        
      } catch (err) {

        console.log(err)
        
      }

   }

   makeRequest()

  },[])

  const appearance = {

    theme: 'stripe',

  }

  const options = {

    clientSecret,
    appearance,

  }

  return (

    <div className='pay'>

       {clientSecret && (

        <Elements options={options} stripe={stripePromise}>

          <CheckoutForm />

        </Elements>

      )}

    </div>
    
  )
}

export default Pay