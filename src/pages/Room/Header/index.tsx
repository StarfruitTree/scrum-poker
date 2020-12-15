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

interface IUserLeft {
  userId: number;
}

interface Props {
  className?: string;
  roomConnection: signalR.HubConnection;
  users: IUser[];
  roomCode: string;
  roomName: string;
  description: string;
  submittedUsers: number;
  updateUsers: (data: IUser[]) => IRoomAction;
  updateUsersAndRoomState: (data: IUsersAndRoomstate) => IRoomAction;
  updateUsersAndSubmittedUsers: (data: IUsersAndSubmittedUsers) => IRoomAction;
  updateRoomState: (roomState: string) => IRoomAction;
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
  updateUsers,
  updateUsersAndRoomState,
  updateRoomState,
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
    console.log(users);
  };

  const newUserConnectedCallback = async (user: IUser) => {
    const newUers = users.slice(0);
    newUers.push(user);
    updateUsers(newUers);
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
  };

  const roomStateChangedCallback = async ({ roomState, users }: RoomState) => {
    if (users === undefined) {
      updateRoomState(roomState);
    } else {
      if (roomState === 'revealed') {
        updateUsersAndRoomState({ roomState, users });
      } else if (roomState === 'waiting') {
        resetRoom({ point: -1, isLocked: false, submittedUsers: 0, users, roomState });
      }
    }
  };

  const userLeftCallback = async ({ userId }: IUserLeft) => {
    const newUsers = users.slice(0);
    const user = newUsers.find(({ id }) => id === userId);
    newUsers.splice(newUsers.indexOf(user as IUser), 1);

    if (user?.status === 'ready') {
      submittedUsers--;
      updateUsersAndSubmittedUsers({ users: newUsers, submittedUsers });
    } else {
      updateUsers(newUsers);
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

  useEffect(() => {
    roomConnection.off('userLeft');
    roomConnection.on('userLeft', userLeftCallback);
  }, [userLeftCallback]);

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
  updateUsers: Actions.roomActions.updateUsers,
  updateUsersAndRoomState: Actions.roomActions.updateUsersAndRoomState,
  updateUsersAndSubmittedUsers: Actions.roomActions.updateUsersAndSubmittedUsers,
  updateRoomState: Actions.roomActions.updateRoomState,
  updateSubmittedUsers: Actions.roomActions.updateSubmittedUsers,
  resetRoom: Actions.roomActions.resetRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
