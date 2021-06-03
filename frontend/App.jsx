// import modules
import React, {useState} from "react";
import { Switch, Route, Link } from "react-router-dom";

// import from files
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

// functional component App
function App() {
  // setting initial state using react hooks
  const [user, setUser] = useState(null);
  const [navMenu, setNavMenu] = useState('');
  // fetch user information from database otherwise default is null
  async function login(user = null) {
    setUser(user);
  }
  
  // when logged out set user to null
  async function logout() {
    setUser(null)
  }
  
  const toggleMenu = () => {
    return navMenu === '' ? setNavMenu('show') : setNavMenu('')
  }
  return (
    // creating nav-bar
    
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary" >
    <a className="navbar-brand" href="/">Restaurant Book
    </a>
    <button className="navbar-toggler" type="button" onClick={ toggleMenu}data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon "></span>
    </button>
    
    <div className={"collapse navbar-collapse " + navMenu }id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
    <Link to={"/restaurants"} className="nav-link">
     <span className="sr-only">Restaurants</span>
    </Link>
    </li>
    <li className="nav-item">
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
    </ul>
    </div>
    </nav>
    
    <div className="container mt-3">
    <Switch>
    {/* restaurants route */}
    <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
    {/* Review route render is used to allow props*/}
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