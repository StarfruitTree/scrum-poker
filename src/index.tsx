import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserContext } from '@scrpoker/contexts';
import { CreateRoomPage, LandingPage, JoinRoomPage, WelcomePage, RoomPage, SignUpPage } from './pages';
import { store } from './store';
import './index.scss';

function App() {
  const [globalState, setGlobalState] = useState({
    userName: '',
    userRole: 0,
    roomCode: '',
    roomName: '',
    roomState: '',
    description: '',
    action: '',
    point: -1,
    roomConnection: {},
    isLocked: false,
    submittedUsers: 0,
    canBeRevealed: false,
    roomId: 0,
  });

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ ...globalState, setGlobalState }}>
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
            <Route path="/room/create" exact>
              <CreateRoomPage />
            </Route>
            <Route path="/room/join" exact>
              <JoinRoomPage />
            </Route>
            <Route path="/room/:channel" exact>
              <RoomPage />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
