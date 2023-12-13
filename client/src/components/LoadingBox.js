import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import '../css/CheckOut.css'

function LoadingBox() {
  return (
    <div className='loadingBox'>
        <Spinner animation="border" role="status" >
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    </div>
  )
}

export default LoadingBox