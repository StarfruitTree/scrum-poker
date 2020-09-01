import ReactDOM from 'react-dom';
import React from 'react';
import { Landing } from './pages';
import './styles/global.scss';

function App() {
  return (
    <>
      <Landing />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
