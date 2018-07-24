import React from 'react';
import MainNav from '../../components/MainNav';
import Header from '../../components/Header';

const Layout = (props) => {
  return (
    <div className="layoutContainer">
      <MainNav />
      <Header />
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;