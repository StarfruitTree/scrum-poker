import ReactDOM from 'react-dom';
import React from 'react';
import './styles/global.scss';
import { Landing } from './pages';

function App() {
  return (
    <>
      <Landing />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
