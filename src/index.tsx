import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LandingPage, JoinRoomPage, WelcomePage, RoomPage, SignUpPage, LoginPage, HomePage } from './pages';
import { store } from './store';
import './index.scss';
import { AUTHENTICATE, JOIN_ROOM, REFRESH_TOKEN } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';
import { Actions } from '@scrpoker/store';
import CookieReader from 'js-cookie';

const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(getAuthHeader() ? true : false);
  const currentPath = window.location.pathname;
  const isOfficialUser = CookieReader.get('officialUser') ? true : false;

  const refreshToken = async () => {
    fetch(REFRESH_TOKEN, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader() as string,
      },
    })
      .then((response) => response.json())
      .then(({ jwtToken, expiration, email }: IUserInfoResponse) => {
        const date = new Date();
        date.setMinutes(date.getMinutes() + expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
        document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;
        if (email) {
          document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
        }
      })
      .catch((err) => console.log(err));
  };

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
      .then(({ userId, name, userRoomCode, email, jiraToken, jiraDomain }: IUserInfoResponse) => {
        const userInfo: IUserInfoPayload = {
          userId,
          name,
          userRoomCode,
          email,
          jiraToken,
          jiraDomain,
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
      authenticate();
      if (currentPath.includes('/room')) {
        if (!currentPath.includes('/room/join')) {
          joinRoom();
        }
      }
      const expiration = new Date(CookieReader.get('tokenExpiration') as string);
      if (expiration.getTime() - new Date().getTime() <= 300000) {
        console.log('hihihi');
        refreshToken();
      } else {
        expiration.setMinutes(expiration.getMinutes() - 5);
        setTimeout(() => {
          console.log('hahaha');
          refreshToken();
        }, expiration.getTime() - new Date().getTime());
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isTokenValid && isOfficialUser ? (
              <Redirect to={{ pathname: '/home' }} />
            ) : isTokenValid ? (
              <Redirect to={{ pathname: '/room/join' }} />
            ) : (
              <LandingPage />
            )}
          </Route>
          <Route path="/welcome">
            {isOfficialUser ? (
              <Redirect to={{ pathname: '/home' }} />
            ) : isTokenValid ? (
              <Redirect to={{ pathname: '/room/join' }} />
            ) : (
              <WelcomePage />
            )}
          </Route>
          <Route path="/signup" exact>
            {isTokenValid && isOfficialUser ? (
              <Redirect to={{ pathname: '/home' }} />
            ) : (
              <SignUpPage setIsTokenValid={setIsTokenValid} />
            )}
          </Route>
          <Route path="/login" exact>
            {isTokenValid && isOfficialUser ? (
              <Redirect to={{ pathname: '/home' }} />
            ) : (
              <LoginPage setIsTokenValid={setIsTokenValid} />
            )}
          </Route>
          <Route path="/home" exact>
            {isTokenValid && isOfficialUser ? <HomePage /> : <Redirect to={{ pathname: '/login' }} />}
          </Route>
          <Route path="/room/join" exact>
            {isTokenValid && isOfficialUser ? (
              <Redirect to={{ pathname: '/home' }} />
            ) : (
              <JoinRoomPage setIsTokenValid={setIsTokenValid} />
            )}
          </Route>
          <Route path="/room/:channel" exact>
            {isTokenValid ? <RoomPage /> : <Redirect to={{ pathname: '/room/join' }} />}
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
