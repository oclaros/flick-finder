import React from 'react';

const Home = () => {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <p>the key is {process.env.REACT_APP_API_KEY}</p>
    </div>
  );
};

export default Home;