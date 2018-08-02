import React from 'react';
import {NavLink} from 'react-router-dom';
const MainNav = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/MovieSearch'>Movie Search</NavLink>
      <NavLink to='/NowPlaying'>NowPlaying</NavLink>
      <NavLink to="/UpcomingMovies">Upcoming Movies</NavLink>
    </nav>
  );
};

export default MainNav;