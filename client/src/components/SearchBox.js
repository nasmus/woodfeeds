import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHendler = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}`: '/search' );
    };

  return (
    <div>
        <div className="align-self-center">
            <div className="header-search">
                <form className="ec-btn-group-form" onSubmit={submitHendler} >
                    <input 
                        name='q'
                        id='q'
                        className="form-control ec-search-bar" 
                        placeholder="Search products..." 
                        type="text" 
                        aria-describedby='button-search'
                        aria-label='search product'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="submit" id='button-search' type="submit"><i className="fi-rr-search"></i></button>
                </form>
            </div>
        </div>
    </div>
  )
}
