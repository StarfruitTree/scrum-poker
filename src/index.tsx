import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LandingPage, JoinRoomPage, WelcomePage, RoomPage, SignUpPage, LoginPage, HomePage } from './pages';
import { store } from './store';
import './index.scss';
import { AUTHENTICATE, JOIN_ROOM } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';
import { Actions } from '@scrpoker/store';

interface IUserInfoResponse {
  jwtToken: string;
  userId: number;
  name: string;
  userRoomCode?: string;
  expiration: number;
  email?: string;
}

const App = () => {
  const isTokenValid = getAuthHeader() ? true : false;
  const authenticate = async () => {
    fetch(AUTHENTICATE, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(({ jwtToken, userId, name, userRoomCode, expiration, email }: IUserInfoResponse) => {
        const date = new Date();
        date.setSeconds(expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;

        const userInfo: IUserInfoPayload = {
          jwtToken,
          userId,
          name,
          userRoomCode,
          email,
        };
        store.dispatch(Actions.userActions.updateUserInfo(userInfo));
      })
      .catch((err) => console.log(err));
  };

  const joinRoom = () => {
    const roomCode = window.location.pathname.slice(6);
    const joinRoomData = {
      roomCode,
    };

    fetch(JOIN_ROOM, {
      method: 'POST',
      body: JSON.stringify(joinRoomData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
    })
      .then((response) => response.json())
      .then((roomData: IRoomInfoPayload) => {
        store.dispatch(Actions.roomActions.updateRoomInfo(roomData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isTokenValid) {
      authenticate();
      if (window.location.pathname.includes('/room')) {
        joinRoom();
      }
    }
  }, []);

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
};

ReactDOM.render(<App />, document.getElementById('root'));
