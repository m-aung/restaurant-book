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
  id:'',
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

    props.history.push({pathname:'/login',state:{ fromDashboard: true }})

    setClear(true)
    console.log('state: ',state)
    console.log(props.history)

  }
  const onSubmit = async (e) => {
    e.preventDefault();
    // testing
    if(username.includes('test')&& password === 't'){
      props.login({...props.user,'userId':'userid2222', 'username': username})
      console.log('username: ',props.user)
      return props.history.push('/')
    }
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
      if(!res.data.user_id) {
        setTimeout(()=>{
          dispatch({ type: 'error', count: 1, payload: res.data.error })
        }, 1550)
      }
      else {setTimeout(()=>{
        dispatch({ type: 'success' })
      }, 1550)
      console.log('from setTimeout 2, res.data:',res.data)
      props.login({...props.user,'userId':res.data.user_id, 'username': username})
      console.log('username: ',props.user)
      props.history.push('/')}
      return res.data}).catch(err => dispatch({ type: 'error', count: 1, payload:'Connection Error. Try again later.'}))}
    };

  return (
    <div className='app-grid'>
      <div className="left-blank"/>
          <form className='card p-1 container-md login-container' onSubmit={onSubmit}>
            <center>
              Please Login!
            </center>
          {state.error && <div className="alert alert-danger"><center className='form-control-danger' htmlFor ='input_error'>{state.error}</center></div>}
            <div className="form-group container-lg">
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
            <input
              className="input-login form-control"
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
            <div className="container p-1">
              <center>
            <button className="btn button-color" type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <input className="pointer btn"  type="submit" disabled ={errorCount>3? true : false}onClick={reloadPage} value='click to refresh'/>
            </center>
            </div>
          </form>
      <div className="right-blank"/>
    </div>
  );
}