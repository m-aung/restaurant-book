import React, { useState } from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);


  const handleInputChange = event => {
    const { name, value , id} = event.target;

      if(name){
        setUser({ ...user, [name]: value })
        console.log('name: ', initialUserState.name)
      }
      if(id){
        setUser({ ...user, [id]: value })
        console.log('id: ', initialUserState.id)
      }

  };

  const login = () => {
    // props.login(user)
    // setUser({...user, name: })
    console.log('name: ',initialUserState.id)
    props.history.push('/');
  }

  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

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
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
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