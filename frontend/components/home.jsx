import React, { useState, useEffect, useReducer } from "react";
import picture from '../img/pic-612x612.jpg'

const Home = (props) => {
  return(
    <div className="main-display">
      <section className="home-container ">
        <h3>Welcome to Restaurant Book</h3>
      <img className ="img" src={picture}></img>
      </section>
    </div>
  )
}
export default Home;