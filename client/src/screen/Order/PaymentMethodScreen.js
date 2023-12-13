import React, { useContext, useState, useEffect } from 'react'
import CheckOut from '../../components/CheckOut'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Store } from '../../Store'

function PaymentMethodScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart: { shippingAddress, paymentMethod },
    } = state;
  
    const [paymentMethodName, setPaymentMethod] = useState(
      paymentMethod || 'Nagad'
    );
  
    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping');
      }
    }, [shippingAddress, navigate]);
    const submitHandler = (e) => {
      e.preventDefault();
      ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
      localStorage.setItem('paymentMethod', paymentMethodName);
      navigate('/placeorder');
    };
  return (
    <div>
        <CheckOut step1 step2 step3 ></CheckOut>
        <div className='container small-container' >
            <h1 className='my-3' > Payment Method </h1>
            <Form onSubmit={submitHandler} >
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id='Bkash'
                        label='Bkash'
                        value='Bkash'
                        checked = { paymentMethodName === 'Bkash' }
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id='Nagad'
                        label='Nagad'
                        value='Nagad'
                        checked = { paymentMethodName === 'Nagad' }
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Button type='submit' >Continue</Button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default PaymentMethodScreen