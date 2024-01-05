import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Product.css';
import SearchSuggestList from "./SearchSuggestList";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [data, setData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const submitHendler = (e) => {
    e.preventDefault();
    setIsFocused(false);
    navigate(query ? `/search?query=${query}` : "/search");
  };
  const focusHandler = () => {
    setIsFocused(true);
  };
  const blurHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 300);
  };

  const HandleChange = (e) => {
    setQuery(e);
    getData(e);
  };

  useEffect(() => {
    const fatchData = async () => {
      const { data } = await axios.get("/api/products");
      setData(data);
    };
    fatchData();
  }, []);

  function getData(value) {
    try {
      const result = data.filter((rez) => {
        return value && rez && rez.name.toLowerCase().includes(value);
      });
      setSuggestion(result);
    } catch (err) {}
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
              onFocus={focusHandler}
              onBlur={blurHandler}
              aria-describedby="button-search"
              aria-label="search product"
              onChange={(e) => HandleChange(e.target.value)}
            />
            <button className="submit" id="button-search" type="submit">
              <i className="fi-rr-search"></i>
            </button>
          </form>
        </div>
        <div className="suggest_search_prodcut">
          {isFocused && suggestion && suggestion.length > 0 ? (
            <SearchSuggestList suggestion={suggestion} />
          ) : (
            ""
          )} 
        </div>
      </div>
    </div>
  );
}
