import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetail";
import UpcomingMovies from './components/UpcomingMovies';
import MovieSearch from './components/MovieSearch';
import Layout from "./hoc/Layout";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/UpcomingMovies' component={UpcomingMovies} />
          <Route path='/MovieSearch' component={MovieSearch} />
          <Route path="/" exact component={Home} />
          <Route path="/:id" exact component={MovieDetails} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
