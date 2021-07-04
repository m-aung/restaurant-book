import React, { useState, useEffect, useReducer } from "react";
import { render } from "react-dom";

const Home = (props) => {
  return(
    <div className="main-display">
      <section className="home-container ">
        <h3>Welcome to Restaurant Book</h3>
      <img className ="img" src="../img/restaurant_img-612x612.jpg"></img>
      </section>
    </div>
  )
}
export default Home;