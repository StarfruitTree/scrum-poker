import ReactDOM from 'react-dom';
import React from 'react';
import './styles/global.scss';
import { CreateRoomPage } from './pages';

function App() {
  return (
    <>
      <CreateRoomPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
