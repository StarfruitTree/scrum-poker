import ReactDOM from 'react-dom';
import React from 'react';
import LandingPage from './pages/Landing';
import WelcomeForm from './pages/Welcome';
import './styles/global.scss';

function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
