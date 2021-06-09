import React, { useState, useEffect, useReducer } from "react";
// import login from '../reducers/login';
import UserDataServices from '../services/users'
import * as ACTION from '../action/types.js';

function loginReducer(state, action) {
  
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
        error:'',
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
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
        errorCount: state.errorCount + action.count,
      };
    }
    case 'logOut': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case 'refresh':{
      return initialState
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
  errorCount: 0,
};

export default function Login (props) {
  const [clear,setClear] = useState(false)
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn, errorCount } = state;
  useEffect(async() => {
    dispatch({ type: 'refresh' });
    return () =>{
      setClear(false)
    }
  }, [clear])

  const reloadPage = async (e)=> {
    console.log('state: ', state)
    e.preventDefault();
    // console.log('from login history: ',history)
    props.history.push({pathname:'/login',state:{ fromDashboard: true }})
    // props.refresh(initialState)
    setClear(true)
    console.log('state: ',state)
    console.log(props.history)
    // history.go(0)
    // const curURI = document.baseURI
    // const documentURI = document.documentURI
    // console.log(curURI, 'and: ', documentURI)
    // location.replace(curURI);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'login' });
    if(errorCount > 3) {
      setTimeout(()=>{
        dispatch({ type: 'refresh'} )
      }, 30000)
      return dispatch({ type: 'error', count: 1, payload: 'Try again in 5 minutes' })
    }
    if(!username || !password ) {
      setTimeout(()=>{
        dispatch({ type: 'error', count: 0, payload: 'Please fill all the fields!' } )
      }, 50)
    }
    else {
    UserDataServices.verifyUser({username, password}).then(res => {
      // console.log('res.data: ', res.data)
      if(!res.data) {
        setTimeout(()=>{
          dispatch({ type: 'error', count: 1, payload: res.data.error })
        }, 1550)
      }
      else {setTimeout(()=>{
        dispatch({ type: 'success' })
      }, 1550)
      props.login({userId:res.data._id})
      props.history.push('/')}
      return res.data}).catch(err => dispatch({ type: 'error', count: 1, payload:'Connection Error. Try again later.'}))}
    };

  return (
    <div className='App'>
      <div className='card p-5 text-right login-container'>
      {state.error && <div className="alert alert-danger"><span className='form-control-danger' htmlFor ='input_error'>{state.error}</span></div>}
          <form className='submit-form' onSubmit={onSubmit}>
            <p>Please Login!</p>
            <div className="form-group">
            <input
              className="input-login form-control"
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
            <div className="input-login form-group">
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
            <div className="container m-3">
            <button className="btn button-color" type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <input className="pointer btn"  type="submit" disabled ={errorCount>3? true : false}onClick={reloadPage} value='click to refresh'/>
            </div>
          </form>
      </div>
    </div>
  );
}