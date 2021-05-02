// importing modules
import React, { useState, useEffect} from "react"; // react and react hooks
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// importing components
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

// functional component
export default function App(){

  // creating hook for user
  const [user, setUser] = React.useState(null)

  // when user login
  async function login(user = null){
    // set the user to login || default null
    setUser(user);
  }

  // when user logout
  async function logout(){
    // set user back to null
    setUser(null);
  }

  return(
    <div>
    <nav className="navbar navbar-expand navbar-skyblue bg-darkblue">
      <a href="/restaurants" className="navbar-brand">
        Restaurant Reviews
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/restaurants"} className="nav-link">
            Restaurants
          </Link>
        </li>
        <li className="nav-item" >
          { user ? (
            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.name}
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}

        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
        <Route 
          path="/restaurants/:id/review"
          render={(props) => (
            <AddReview {...props} user={user} />
          )}
        />
        <Route 
          path="/restaurants/:id"
          render={(props) => (
            <Restaurant {...props} user={user} />
          )}
        />
        <Route 
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
        />
      </Switch>
    </div>
  </div>
  )
}