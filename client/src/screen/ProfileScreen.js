import React, { useContext, useReducer, useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
  
      default:
        return state;
    }
  };
  
  export default function ProfileScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
      loadingUpdate: false,
    });
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
            phone,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: 'UPDATE_SUCCESS',
        });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('User updated successfully');
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
        });
        toast.error(getError(err));
      }
    };

    useEffect(() => {
      if(!userInfo){
        navigate('/')
      }
    },[userInfo,navigate])
  
    return (
      <div className="container small-container">
        <h1 className="my-3">User update Profile</h1>
        <form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <button className="px-3 py-2.5 text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg"  type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }