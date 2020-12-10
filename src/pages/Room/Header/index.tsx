import React, { useEffect } from 'react';
import RoomInfo from './RoomInfo';
import style from './style.module.scss';
import UsersContainer from './UsersContainer';
import { connect } from 'react-redux';
import { Actions } from '@scrpoker/store';

interface Data {
  users: IUser[];
  roomState: string;
}

interface RoomState {
  roomState: string;
  users?: IUser[];
}

interface Props {
  className?: string;
  roomConnection: signalR.HubConnection;
  users: IUser[];
  roomCode: string;
  roomName: string;
  description: string;
  submittedUsers: number;
  updateUsersAndRoomState: (data: IUsersAndRoomstate) => IRoomAction;
  updateUsersAndCanBeRevealed: (data: IUsersAndCanBeRevealed) => IRoomAction;
  updateUsersAndSubmittedUsers: (data: IUsersAndSubmittedUsers) => IRoomAction;
  updateRoomState: (roomState: string) => IRoomAction;
  updateCanBeRevealed: (canBeRevealed: boolean) => IRoomAction;
  resetRoom: (data: IResetRoom) => IRoomAction;
}

const Header: React.FC<Props> = ({
  className = '',
  roomConnection,
  users,
  roomCode,
  roomName,
  description,
  submittedUsers,
  updateUsersAndRoomState,
  updateUsersAndCanBeRevealed,
  updateRoomState,
  updateCanBeRevealed,
  updateUsersAndSubmittedUsers,
  resetRoom,
}) => {
  const data = {
    roomCode: roomCode,
    roomName: roomName,
    description: description,
    members: users.length,
  };

  const firstTimeJoinCallback = async ({ users, roomState }: Data) => {
    updateUsersAndRoomState({ users, roomState });
  };

  const newUserConnectedCallback = async (user: IUser) => {
    const newUers = users.splice(0);
    newUers.push(user);
    updateUsersAndCanBeRevealed({ users: newUers, canBeRevealed: false });
  };

  const userStatusChangedCallback = async (user: IUser) => {
    const newUsers = users.map((u) => {
      if (u.name == user.name) {
        u.point = user.point;
        u.status = user.status;
      }
      return u;
    });

    submittedUsers++;
    updateUsersAndSubmittedUsers({ users: newUsers, submittedUsers });
    if (submittedUsers === users.length) {
      updateCanBeRevealed(true);
    }
  };

  const roomStateChangedCallback = async ({ roomState, users }: RoomState) => {
    if (users === undefined) {
      updateRoomState(roomState);
    } else {
      if (roomState === 'revealed') {
        updateUsersAndRoomState({ roomState, users });
      } else if (roomState === 'waiting') {
        resetRoom({ point: -1, isLocked: false, canBeRevealed: false, submittedUsers: 0, users, roomState });
      }
    }
  };

  useEffect(() => {
    roomConnection.on('firstTimeJoin', firstTimeJoinCallback);
  }, []);

  useEffect(() => {
    roomConnection.off('newUserConnected');
    roomConnection.on('newUserConnected', newUserConnectedCallback);
  }, [newUserConnectedCallback]);

  useEffect(() => {
    roomConnection.off('userStatusChanged');
    roomConnection.on('userStatusChanged', userStatusChangedCallback);
  }, [userStatusChangedCallback]);

  useEffect(() => {
    roomConnection.off('roomStateChanged');
    roomConnection.on('roomStateChanged', roomStateChangedCallback);
  }, [roomStateChangedCallback]);

  return (
    <div className={`${style.header} ${className}`}>
      <RoomInfo data={data} className={style.roomInfo} />
      <UsersContainer users={users} />
    </div>
  );
};

const mapStateToProps = ({
  roomData: { roomConnection, users, roomCode, roomName, description, submittedUsers },
}: IGlobalState) => {
  return {
    roomConnection,
    users,
    roomCode,
    roomName,
    description,
    submittedUsers,
  };
};

const mapDispatchToProps = {
  updateUsersAndRoomState: Actions.roomActions.updateUsersAndRoomState,
  updateUsersAndCanBeRevealed: Actions.roomActions.updateUsersAndCanBeRevealed,
  updateUsersAndSubmittedUsers: Actions.roomActions.updateUsersAndSubmittedUsers,
  updateRoomState: Actions.roomActions.updateRoomState,
  updateCanBeRevealed: Actions.roomActions.updateCanBeRevealed,
  updateSubmittedUsers: Actions.roomActions.updateSubmittedUsers,
  resetRoom: Actions.roomActions.resetRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
