import ReactDOM from 'react-dom';
import React from 'react';
import './styles/global.scss';
import {
  CreateRoomPage,
  LandingPage,
  JoinRoomPage,
  WelcomePage,
  RoomPage,
} from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Room from './pages/Room';

export const NameContext = React.createContext({ username: '' });

function App() {
  return (
    // <NameContext.Provider value={{ username: '' }}>
    //   <Router>
    //     <Switch>
    //       <Route path="/" exact>
    //         <LandingPage />
    //       </Route>
    //       <Route path="/welcome">
    //         <WelcomePage />
    //       </Route>
    //       <Route path="/room/create" exact>
    //         <CreateRoomPage />
    //       </Route>
    //       <Route path="/room/join" exact>
    //         <JoinRoomPage />
    //       </Route>
    //       <Route path="/room/:channel" exact>
    //         <RoomPage />
    //       </Route>
    //     </Switch>
    //   </Router>
    // </NameContext.Provider>
    <RoomPage />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
