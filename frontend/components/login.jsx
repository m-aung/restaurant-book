import React, { useState, useEffect, useReducer } from "react";
import login from '../reducers/login';
import UserDataServices from '../services/users'
import * as ACTION from '../action/types.js';

function loginReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'login': {
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
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'logOut': {
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
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

export default function LoginUseReducer(props) {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'login' });
    UserDataServices.verifyUser({username, password}).then(res => {
      console.log(res.data)
      dispatch({ type: 'success' })
      props.login(state)
      props.history.push('/')
      return res.data}).catch(err => dispatch({ type: 'error' },error))
    };

  return (
    <div className='App'>
      <div className='login-container'>
          <form className='submit-form' onSubmit={onSubmit}>
            {error && <div className="error"><span className='form-control-danger' htmlFor ='input_error'>{error}</span></div>}
            <p>Please Login!</p>
            <div className="form-group">
            <label htmlFor="user">Username</label>
            <input
              className="form-control"
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.currentTarget.value,
                })
              }
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type='password'
              placeholder='password'
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