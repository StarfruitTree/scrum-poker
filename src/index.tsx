import ReactDOM from 'react-dom';
import React from 'react';
import { Navbar, Button } from './components';
import './styles/global.css';
import Typo from '@scrpoker/components/Typo';
import LandingPage from './page/Landing';

function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
