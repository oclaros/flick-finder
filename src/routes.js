import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetail";
import Layout from "./hoc/Layout";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" exact component={MovieDetails} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
