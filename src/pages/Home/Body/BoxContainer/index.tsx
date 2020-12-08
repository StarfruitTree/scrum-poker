import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './style.module.scss';
import Box from './Box';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { joinRoom } from '@scrpoker/store/actions/roomAction';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface Props {
  userRoomCode: string;
  joinRoom: (roomCode: string) => Promise<void>;
}

const BoxContainer: React.FC<Props> = ({ userRoomCode, joinRoom }) => {
  const history = useHistory();

  const boxes: Box[] = [
    {
      iconName: 'house-user',
      actionName: 'Join your room',
      onClick: async () => {
        await joinRoom(userRoomCode);
        history.push('/room/' + userRoomCode);
      },
    },
    {
      iconName: 'arrow-right',
      actionName: 'Join a room',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
    {
      iconName: 'compress-arrows-alt',
      actionName: 'Integration',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
    {
      iconName: 'user-circle',
      actionName: 'Profile',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
  ];
  return (
    <div className={style.boxContainer}>
      {boxes.map((box, key) => (
        <Box
          className={style.box}
          key={key}
          iconName={box.iconName}
          actionName={box.actionName}
          onClick={box.onClick}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ userData: { userRoomCode } }: IGlobalState) => {
  return {
    userRoomCode,
  };
};

export default connect(mapStateToProps, {
  joinRoom: Actions.roomActions.joinRoom,
})(BoxContainer);
