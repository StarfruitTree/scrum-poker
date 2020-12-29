import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LandingPage, JoinRoomPage, WelcomePage, RoomPage, SignUpPage, LoginPage, HomePage } from './pages';
import { store } from './store';
import './index.scss';
import { AUTHENTICATE, JOIN_ROOM } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';
import { Actions } from '@scrpoker/store';
import CookieReader from 'js-cookie';
interface IUserInfoResponse {
  jwtToken: string;
  userId: number;
  name: string;
  userRoomCode?: string;
  expiration: number;
  email?: string;
}

const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(getAuthHeader() ? true : false);

  const currentPath = window.location.pathname;
  const authenticate = async () => {
    fetch(AUTHENTICATE, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader() as string,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(({ jwtToken, userId, name, userRoomCode, expiration, email }: IUserInfoResponse) => {
        const date = new Date();
        date.setSeconds(expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
        document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;

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
        Authorization: getAuthHeader() as string,
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
      const refreshTime = new Date(CookieReader.get('tokenExpiration') as string).getTime() - new Date().getTime();
      setTimeout(authenticate, refreshTime - 5000);
      if (currentPath.includes('/room')) {
        joinRoom();
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isTokenValid ? <Redirect to={{ pathname: '/home' }} /> : <LandingPage />}
          </Route>
          <Route path="/welcome">{isTokenValid ? <Redirect to={{ pathname: '/home' }} /> : <WelcomePage />}</Route>
          <Route path="/signup" exact>
            {isTokenValid ? <Redirect to={{ pathname: '/home' }} /> : <SignUpPage setIsTokenValid={setIsTokenValid} />}
          </Route>
          <Route path="/login" exact>
            {isTokenValid ? <Redirect to={{ pathname: '/home' }} /> : <LoginPage setIsTokenValid={setIsTokenValid} />}
          </Route>
          <Route path="/home" exact>
            {isTokenValid ? <HomePage /> : <Redirect to={{ pathname: '/login' }} />}
          </Route>
          <Route path="/room/join" exact>
            {isTokenValid ? <Redirect to={{ pathname: '/home' }} /> : <JoinRoomPage />}
          </Route>
          <Route path="/room/:channel" exact>
            {isTokenValid ? <RoomPage /> : <Redirect to={{ pathname: '/login' }} />}
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
