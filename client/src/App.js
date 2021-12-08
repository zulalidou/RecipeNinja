import React, {useEffect} from 'react';
import {BrowserRouter as Router,
  Switch, Route, useLocation} from 'react-router-dom';
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


const App = () => {
  const history = createBrowserHistory();

  history.listen(location => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(window.location.pathname); // Record a pageview for the given page
  });


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
