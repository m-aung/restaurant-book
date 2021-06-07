import React, { useState, useEffect, useReducer } from "react";
// import signup from '../reducers/signup';
import UserDataServices from '../services/users'
// import * as ACTION from '../action/types.js';
import DatePicker from 'react-date-picker';
// import { createPopper } from '@popperjs/core';
import Dropdown from 'react-dropdown';

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
  robort: true,
};

export default function Signup (props) {

  const [state,setState] = useState(initialState) // setting up state
  const { username, password, firstName, lastName, email, age, error, isLoggedIn , isLoading, robort} = state; // destructing


  const onSubmit = async (e) => {
    e.preventDefault(); // preventing multiple clicking
    console.log('when submit: ',state)
    if(!username || !password || !age || !firstName || !lastName || !email || robort){
      setState({...state, isLoading:true, error: 'Please fill up all fields'}) // setting up loading state and error
      setTimeout(()=> {
        setState({...state, isLoading:false})
        // console.log('error from Timeout: ', error,'| Loading: ', isLoading)
      }, 2000)
      // console.log('After error: ', error,'| Loading: ', isLoading)
      return 
    } 
    else if(!email.includes(`\/[@.]{6,_}/g`)){
      setState({...state, error: 'Invalid email address.'})
    }

    else if(password && !password.includes(`\ /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/g`)){// includes special characters and has to have mini length 6 
      setState({...state, isLoading:true, error:`Minimum 6 characters and must include at least one of the following: \n @,#,$,%,^,&,*, 0-9, a-z or A-Z`})
      setTimeout(()=> {
        setState({...state, isLoading:false})
        // console.log('error from Timeout: ', error,'| Loading: ', isLoading)
      }, 2000)
      return
    } 
    else{
      setState({ ...state, error: '', isLoading: true});
      UserDataServices.createUser(state).then(res => {
        console.log(res.data)
        setTimeout(()=>{
          setState({...state, isLoggedIn: true, isLoading: false,})
        }, 2050)
        props.login({userId:res.data._id, username})
        props.history.push('/')
        return res.data}).catch(err => dispatch({ type: 'error' },error))
    }
    };

    const MAXDATE = (date) => {
      const now = new Date();
      const curYear = parseInt(String(now.getFullYear())) - 13;
      const curDay = String(now.getDate());
      const curMonth = String(now.getMonth());
      return new Date(curYear, curMonth, curDay);
    };
    const options = [
      'under 13', 'over 13', 'prefer not to say'
    ];

  return (
    <div className='App'>
          <form className='card p-3 text-right' onSubmit={onSubmit}>
            <span>  
              Sign up!<br/>
              It's easy.
            </span>
            {error && <div className="alert alert-danger"><span className='form-control-danger' htmlFor ='input_error'>{error}</span></div>}
            <div className="form-group">
              <div className="input-group-prepend">
            <input
              className="input form-control"
              type='text'
              placeholder='First Name'
              spellCheck= {false}
              value={firstName}
              onChange={(e) =>
                setState({
                  ...state,
                  firstName:e.currentTarget.value
                })
              }
            />
            <input
              className="input form-control"
              type='text'
              placeholder='Last Name'
              spellCheck= {false}
              value={lastName}
              onChange={(e) =>
                setState({
                  ...state,
                  lastName:e.currentTarget.value
                })
              }
            />
            </div>
            <input
              className="input form-control"
              type='text'
              placeholder='Username'
              spellCheck= {false}
              autoCapitalize = {false}
              value={username}
              onChange={(e) =>
                setState({
                  ...state,
                  username:e.currentTarget.value
                })
              }
            />
            <input
              className="input form-control"
              type='email'
              placeholder='Email'
              spellCheck= {false}
              value={email}
              onChange={(e) =>
                setState({
                  ...state,
                  email:e.currentTarget.value
                })
              }
            />
            <Dropdown className="input btn btn-light dropdown" options={options} onChange={(e)=>{setState({...state, age:e['value'] })
          console.log(state.age)}} placeholder="Select an option" />
             <input
                className="input form-control"
                type='password'
                placeholder='New Password'
                autoComplete='new-password'
                value={password}
                onChange={(e) =>
                  setState({
                    ...state,
                    password:e.currentTarget.value
                  })
                }
              />
            <div className="input form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={(e)=> {setState({...state, robort:false,})}}/>
              <label className="label form-check-label" htmlFor="exampleCheck1">click here to verify</label>
            </div>
            <button className="btn button-color" type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            </div>
          </form>
    </div>)}