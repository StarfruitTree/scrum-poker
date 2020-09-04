import ReactDOM from 'react-dom';
import React from 'react';
import './styles/global.scss';
import { JoinRoomPage } from './pages';

function App() {
  return (
    <>
      <JoinRoomPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
