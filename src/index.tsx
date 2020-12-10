import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LandingPage, JoinRoomPage, WelcomePage, RoomPage, SignUpPage, LoginPage, HomePage } from './pages';
import { store } from './store';
import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/welcome">
            <WelcomePage />
          </Route>
          <Route path="/signup" exact>
            <SignUpPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/room/join" exact>
            <JoinRoomPage />
          </Route>
          <Route path="/room/:channel" exact>
            <RoomPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
