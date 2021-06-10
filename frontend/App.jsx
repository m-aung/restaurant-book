// import modules
import React, {useState} from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

// import from files
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Signup from "./components/signup"
import NotFound from './components/404'

// functional component App
function App() {
  let {path, url} = useRouteMatch()
  // setting initial state using react hooks
  // const [path,setPath] = useState('/')
  const [user, setUser] = useState(null);
  const [navMenu, setNavMenu] = useState('');
  // fetch user information from database otherwise default is null
  const login = async(user = null) => {
    setUser(user);
    // console.log('user from login function: ', user)
  }
  
  // when logged out set user to null
  const logout = async ()=> {
    setUser(null)
  }

  const refresh = async (refreshState=null) => {
    setUser(refreshState)
  }
  
  const toggleMenu = () => {
    return navMenu === '' ? setNavMenu('show') : setNavMenu('')
  }

  const updatePath = async (current='/')=> {
    
    location.history.push(current)
  }


  return (
    // creating nav-bar
    
    <div> 
    <a className="navbar color title" href="/">{user ? user.username + '\'s\t' : ''} <center>Restaurant Book </center>
    </a>
    <nav className="color navbar navbar-expand-sm navbar-light" >
    <button className="navbar-toggler" type="button" onClick={ toggleMenu }data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon "></span>
    </button>
    
    <div className={"collapse navbar-collapse " + navMenu }id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
    <Link className="nav-link" 
    to={{
      pathname:`/`,
      // search: "?sort=name",
      // hash: "#the-hash",
      state: { fromDashboard: true }
    }} 
    activeopacity={0.8}
    >{'Home'}
    </Link>
    </li>
    <li className="nav-item">
    <Link to={{
      pathname: `/restaurants`, //`${path}`,//`/restaurants`,
      // state: { fromDashboard: true }
    }} 
      className="nav-link" 
      activeopacity={0.8}
    >
     <span className="sr-only">Restaurants</span>
    </Link>
    </li>
    { user ? (
      <li className="nav-item">
      <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
      Logout {user.name}
      </a>
      </li>
      ) : (      
        <li className="nav-item">
        <Link 
        // login route
        to={{
          pathname: `/login`,
          // search: "?user=unknown",
          // hash: "#the-hash",
          state: { fromDashboard: true }
        }} 
        className="nav-link" 
        activeopacity={0.8}>
        Login
        </Link>
        </li>
        )}
        { user ? (
          <div></div>
      ) : (      
        <li className="nav-item">
      <Link to={{
        pathname:'/signup',
        // state: { fromDashboard: true }
        }} 
        className='nav-link' 
        activeopacity={0.8}>
        signup
      </Link>
      </li>
        )}
    </ul>
    </div>
    </nav>
    <Link to={{pathname:''}}></Link>
    <div className="container mt-3">
    
    <Switch>
    <Route exact path = {[path,`/restaurants`,`/restaurants/`]} /*{[`/`,`/restaurants`]}*/ render={(props) => (
      <RestaurantsList {...props} />
      )} />
      {/* <Route path = {'/*'} render={(props)=>{
        <div>Error 404 not found</div>
      }}></Route> */}
    <Route exact
    path={`/restaurants/:id/review`}
    render={(props) => (
      <AddReview {...props} user={user} />
      )}
      />
      {/* restaurants route */}
      <Route exact
      path={`/restaurants/:id`}
      render={(props) => (
        <Restaurant {...props} user={user}/>
        )}
        />
        {/* login route */}
        <Route exact
        path={`/login`}
        render={(props) => (
          <Login 
          {...props}
          login={login}
          refresh ={refresh}
          />
          )} />
          <Route exact
        path='/signup'//{`${url}/signup`}
        render={(props) => (
          <Signup {...props} signup={login} />
          )}
          />
          <Route component={NotFound}/>
          </Switch>
          </div>
          </div>        
  )}
        export default App;