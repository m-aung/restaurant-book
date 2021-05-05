// import modules
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

// import from files
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

// functional component App
function App() {
  // setting initial state using react hooks
  const [user, setUser] = React.useState(null);
  
  // if user is not logged in set user to null
  async function login(user = null) {
    setUser(user);
  }
  
  // when logged out set user to null
  async function logout() {
    setUser(null)
  }
  
  return (
    // creating nav-bar
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a href="/restaurants" className="navbar-brand">
    Restaurant Reviews
    </a>
    <div className="navbar-nav mr-auto">
    <li className="nav-item">
    {/* restaurants route */}
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
        // login route
        <Link to={"/login"} className="nav-link">
        Login
        </Link>
        )}
        
        </li>
        </div>
        </nav>
        
        <div className="container mt-3">
        <Switch>
          {/* restaurants route */}
        <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
        {/* Review route */}
        <Route 
        path="/restaurants/:id/review"
        render={(props) => (
          <AddReview {...props} user={user} />
          )}
          />
          {/* restaurants route */}
          <Route 
          path="/restaurants/:id"
          render={(props) => (
            <Restaurant {...props} user={user} />
            )}
            />
            {/* login route */}
            <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
              )}
              />
              </Switch>
              </div>
              </div>
              );
            }
            
            export default App;