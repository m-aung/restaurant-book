import React, { useState, useEffect, useReducer } from "react";
// import signup from '../reducers/signup';
import UserDataServices from '../services/users'
import * as ACTION from '../action/types.js';
import DatePicker from 'react-date-picker';

function signupReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'signup': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'success': {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'reset': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}

const initialState = {
  username: '',
  email:'',
  firstName: '',
  lastName:'',
  password: '',
  age: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

export default function Signup (props) {
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const { username, password, firstName, lastName, age, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'signup' });
    UserDataServices.createUser({username, password}).then(res => {
      console.log(res.data)
      setTimeout(()=>{
        dispatch({ type: 'success' })
      }, 2050)
      props.login(state)
      props.history.push('/')
      return res.data}).catch(err => dispatch({ type: 'error' },error))
    };

  return (
    <div className='App'>
      <div className='login-container'>
          <form className='submit-form' onSubmit={onSubmit}>
            {error && <div className="error"><span className='form-control-danger' htmlFor ='input_error'>{error}</span></div>}
            <span>
              Sign up!<br/>
              It's easy.
            </span>
            <div className="form-group">
            <input
              className="input form-control"
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'firstName',
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              className="input form-control"
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'lastName',
                  payload: e.currentTarget.value,
                })
              }
            />
            </div>
            <div className="form-group">  
            <input
              className="input form-control"
              type='dropdown'
              placeholder='13 or over'
              autoComplete='13'
              value={age}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'age',
                  payload: e.currentTarget.value,
                })
              }
            />
             <input
                className="input form-control"
                type='password'
                placeholder='New Password'
                autoComplete='new-password'
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: 'field',
                    fieldName: 'password',
                    payload: e.currentTarget.value,
                  })
                }
              />
            </div>
            <button className="btn btn-success" type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
      </div>
    </div>
  );
}