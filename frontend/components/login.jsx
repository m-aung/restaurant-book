import React, { useState, useEffect } from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);


  const handleInputChange = event => {
    const { name, value , password} = event.target;
    
    if(name){
      setUser({ ...user, [name]: value })
      console.log('name: ', initialUserState.name)
    }
    if(password){
      setUser({ ...user, [password]: value })
      console.log('id: ', initialUserState.password)
    }

  };

  const login = () => {
    // props.login(user)
    setUser({...user, name: 'test'})
    console.log('name: ',initialUserState.name)
    alert('Authentication is currently under-construction!')
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

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;