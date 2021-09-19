import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Search from './components/search';
import Recipes from './components/recipes';
import Footer from './components/footer';


const App = () => (
  <Router>
    <div className="App">
      <Route path="/" component={Navbar} />

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


export default App;
