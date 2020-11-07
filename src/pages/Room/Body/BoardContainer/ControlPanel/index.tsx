import React, { useContext } from 'react';
import { Button } from '@scrpoker/components';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';

interface Props {
  className?: string;
}

const ControlPanel: React.FC<Props> = ({ className = '' }) => {
  const { roomConnection, point, userRole, roomCode, roomState } = useContext(UserContext);
  const userContext = useContext(UserContext);
  console.log(roomState);
  return (
    <div className={`${style.controlPanel} ${className}`}>
      {userRole === 0 ? (
        roomState === 'waiting' ? (
          <Button
            className={style.button}
            onClick={() => {
              roomConnection.send('ChangeRoomState', roomCode, 'playing');
            }}
            disabled={false}
          >
            Start
          </Button>
        ) : (
          <React.Fragment>
            <Button
              className={style.button}
              disabled={point === -1 || userContext.isLocked ? true : false}
              onClick={() => {
                roomConnection.send(
                  'ChangeUserStatus',
                  userContext.roomCode,
                  userContext.username,
                  'ready',
                  userContext.point
                );
                userContext.setGlobalState({ ...userContext, isLocked: true });
              }}
            >
              Lock
            </Button>
            <Button
              className={style.button}
              disabled={!userContext.canBeRevealed}
              onClick={() => {
                roomConnection.send('ChangeRoomState', userContext.roomCode, 'revealed');
              }}
            >
              Reveal
            </Button>
          </React.Fragment>
        )
      ) : roomState === 'waiting' || roomState === 'revealed' ? (
        <React.Fragment />
      ) : (
        <Button
          className={style.button}
          disabled={point === -1 || userContext.isLocked ? true : false}
          onClick={() => {
            roomConnection.send(
              'ChangeUserStatus',
              userContext.roomCode,
              userContext.username,
              'ready',
              userContext.point
            );
            userContext.setGlobalState({ ...userContext, isLocked: true });
          }}
        >
          Lock
        </Button>
      )}
    </div>
  );
};

export default ControlPanel;
