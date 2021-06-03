import React, { useState, useEffect, useReducer } from "react";
import login from '../reducers/login';
import '../action/types.js';

const Login = (props) => {
  const initialState = {
    _id: '',
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
  };

  const [user, setUser] = useState(initialState);


  const handleInputChange = event => {
    const { name, value , password} = event.target;
    
    if(name){
      setUser({ ...user, [name]: value })
      console.log('name: ', initialState.name)
    }
    if(password){
      setUser({ ...user, [password]: value })
      console.log('id: ', initialState.password)
    }

  };

  const login = () => {

    props.history.push('/');
  }

  useEffect(() => {
    // console.log('user: ', user)
  }, [user])

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

        <button onClick={login} className="button btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;