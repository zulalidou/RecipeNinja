import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/home"
import RecipeCard from "./components/recipe-card"
import Search from "./components/search"
import About from "./components/about"
import Recipes from "./components/recipes"

import "./App.css"


const App = () => {
  return (
    <Router>
        <div className='App'>
            <Route path="/" component={Navbar} />

            {/*The Switch component makes it so that only 1 route is displayed at any given time*/}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/recipes/:name" component={Recipes} />
            </Switch>

            <Route path="/" component={Footer} />
        </div>
    </Router>
  );
}


export default App;
