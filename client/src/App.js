import React from 'react';
import {BrowserRouter as Router,
  Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Search from './components/search';
import Recipes from './components/recipes';
import Footer from './components/footer';
import PageNotFound from './components/page-not-found';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-208053083-1');
ReactGA.pageview(window.location.pathname);

// const history = createBrowserHistory();

// history.listen((location) => {
//   console.log('A new page is being accessed??');
//   console.log(window.location);
//   ReactGA.pageview(window.location.pathname + window.location.search);
// });


const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Navbar} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/recipes/:name" component={Recipes} />
          <Route component={PageNotFound} />
        </Switch>

        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
};


export default App;
