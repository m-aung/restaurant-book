// import modules
import React, {useState} from "react";
import { Switch, Route, Link } from "react-router-dom";

// import from files
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Signup from "./components/signup"

// functional component App
function App() {
  
  // const history = new BrowserHistory
  // const history = useHistory()
  // console.log(history)
  // setting initial state using react hooks
  const [path,setPath] = useState('/')
  const [user, setUser] = useState(null);
  const [navMenu, setNavMenu] = useState('');
  // fetch user information from database otherwise default is null
  const login = async(user = null) => {
    setUser(user);
    console.log('user from login function: ', user)
  }
  
  // when logged out set user to null
  const logout = async ()=> {
    setUser(null)
  }

  
  const toggleMenu = () => {
    return navMenu === '' ? setNavMenu('show') : setNavMenu('')
  }

  const updatePath = async (current='/')=> {
    setPath(current)
  }


  // const BackButton = ({ match, destination }) => {
    
  //   if (match.path === '/') {
  //       parentPath = `/${destination}`;
  //   } else {
  //       const arr = match.path.split('/');
  //       const currPage = arr[arr.length - 1];
  //       parentPath = arr
  //           .filter((item) => {
  //               return item !== currPage;
  //           })
  //           .join('/');
  //   }
  // }

  return (
    // creating nav-bar
    
    <div> 
    <a className="navbar color title" href="/">{user ? user.username + '\'s\t' : ''} Restaurant Book 
    </a>
    <nav className="color navbar navbar-expand-lg navbar-light" >
    <button className="navbar-toggler" type="button" onClick={ toggleMenu}data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon "></span>
    </button>
    
    <div className={"collapse navbar-collapse " + navMenu }id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
    <Link className="nav-link" to={{pathname:path, state: { fromDashboard: true }}} activeopacity={0.8}>{'Back'}</Link>
    </li>
    <li className="nav-item">
    <Link to={"/restaurants"} className="nav-link" activeopacity={0.8}>
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
        <Link to={"/login"} className="nav-link" activeopacity={0.8}>
        Login
        </Link>
        )}
    </li>
    <li className="nav-item">
      <Link to={'/signup'} className='nav-link' activeopacity={0.8}>
        signup
      </Link>
      </li>
    </ul>
    </div>
    </nav>
    
    <div className="container mt-3">
    
    <Switch>
    <Route exact path={["/", "/restaurants"]} render={(props) => (
      <RestaurantsList {...props} />
      )} />
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
        <Restaurant {...props} user={user}/>
        )}
        />
        {/* login route */}
        <Route 
        path="/login"
        render={(props) => (
          <Login {...props} login={login}/>
          )} />
          <Route 
        path="/signup"
        render={(props) => (
          <Signup {...props} signup={login} />
          )}
          />
          </Switch>

          </div>
          </div>        
  )}
        export default App;