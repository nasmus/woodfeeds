import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchSuggestList from './SearchSuggestList';

export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState([]);

    const submitHendler = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}`: '/search' );
    };

    const HandleChange = (e) => {
        setQuery(e);
        getData(e);
    }

    
        async function getData(value) {
            try {
                const { data } = await axios.get('/api/products');
                const result = data.filter((rez) => {
                    return value && rez && rez.name.toLowerCase().includes(value)
                });
                setSuggestion(result);
                console.log(suggestion);
            } catch (err) {
                console.log(err);
            }
        }

  return (
    <div>
      <div className="align-self-center">
        <div className="header-search">
          <form className="ec-btn-group-form" onSubmit={submitHendler}>
            <input
              name="q"
              id="q"
              className="form-control ec-search-bar"
              placeholder="Search products..."
              type="text"
              aria-describedby="button-search"
              aria-label="search product"
              onChange={(e) => HandleChange(e.target.value)}
            />
            <button className="submit" id="button-search" type="submit">
              <i className="fi-rr-search"></i>
            </button>
          </form>
        </div>
          {suggestion && suggestion.length > 0 ? <SearchSuggestList suggestion={suggestion} /> : ''}
      </div>
    </div>
  );
}
