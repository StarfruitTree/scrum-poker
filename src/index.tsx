import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import {
  CreateRoomPage,
  LandingPage,
  JoinRoomPage,
  WelcomePage,
} from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { getQueryParams } from './utils';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/room/create" exact>
          <CreateRoomPage />
        </Route>
        <Route path="/room/join" exact>
          <JoinRoomPage />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
