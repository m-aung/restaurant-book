import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurants.js";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  // useEffect(async () => {
  //   console.log('Clicked: ',isClicked)
  //     setTimeout(()=>{
  //       console.log('Clicked: ',isClicked)
  //     },1550)
  //     return()=>{
  //       setIsClicked(false)
  //     }
  // }, [searchCuisine,searchName,searchZip])

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        // console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        // console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        // console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = async() => {
    setIsClicked(true)
    console.log(isClicked)
    setTimeout(()=>{
      setIsClicked(false)
          },1550)
    find(searchName, "name")
  };

  const findByZip = async () => {
    setIsClicked(true)
    console.log(isClicked)
    setTimeout(()=>{
      setIsClicked(false)
          },1550)
    find(searchZip, "zipcode")
  };

  const findByCuisine = async () => {
    setIsClicked(true)
    console.log(isClicked)
    setTimeout(()=>{
      setIsClicked(false)
          },1550)
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn button-color"
              type="button"
              disabled={isClicked}
              onClick={findByName}
            >
              {isClicked ? 'Searching...' : 'Search'}
              
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn button-color"
              type="button"
              disabled={isClicked}
              onClick={findByZip}
            >
              {isClicked ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn button-color"
              type="button"
              disabled={isClicked}
              onClick={findByCuisine}
            >
              {isClicked ? 'Searching...' : 'Search'}
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-2">
              <div className="card ">
                <div className="card-body card card-modify">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1 button-color">
                    View Reviews
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1 button-color">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RestaurantsList;