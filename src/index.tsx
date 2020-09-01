import ReactDOM from 'react-dom';
import React from 'react';
import LandingPage from './page/Landing';
import WelcomeForm from './page/Welcome';
import './styles/global.scss';

function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
