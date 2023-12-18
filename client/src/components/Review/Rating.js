import React from 'react';

function Rating(props) {
    const { rating,numReviews = 0,caption } = props;
  return (
    <div style={{color:"#ff8000",textDecoration:'none'}} className='rating'>
        <span>
            <i className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt': 'far fa-star' } />
        </span>
        <span>
            <i className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt': 'far fa-star' } />
        </span>
        <span>
            <i className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? ' fas fa-star-half-alt': 'far fa-star' } />
        </span>
        <span>
            <i className={rating >= 4 ? 'fas fa-star' : rating >= 3.5 ? 'fas fa-star-half-alt': 'far fa-star' } />
        </span>
        <span>
            <i className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt': 'far fa-star' } />
        </span>
        {
            caption ? (
                <span>{caption}</span>
            ) : (
                <span style={{color:"blue"}}>{' (' + numReviews +')'}</span>
            )
        }
    </div>
  )
}

export default Rating