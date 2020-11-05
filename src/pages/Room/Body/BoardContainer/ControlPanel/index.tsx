import React, { useContext } from 'react';
import { Button } from '@scrpoker/components';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';

interface Props {
  canBeRevealed?: boolean;
  className?: string;
}

const ControlPanel: React.FC<Props> = ({ canBeRevealed, className = '' }) => {
  const { roomConnection, point, userRole, roomCode, roomState } = useContext(
    UserContext
  );
  const userContext = useContext(UserContext);
  console.log(roomState);
  return (
    <div className={`${style.controlPanel} ${className}`}>
      {userRole === 0 ? (
        roomState === 'waiting' ? (
          <Button
            className={style.button}
            onclick={() => {
              roomConnection.send('ChangeRoomState', roomCode, 'playing');
            }}
            disabled={false}
            type="primary"
          >
            Start
          </Button>
        ) : (
          <React.Fragment>
            <Button
              className={style.button}
              disabled={point === -1 ? true : false}
              type="primary"
              onclick={() => {
                roomConnection.send(
                  'ChangeUserStatus',
                  userContext.roomCode,
                  userContext.username,
                  'ready',
                  userContext.point
                );
              }}
            >
              Lock
            </Button>
            <Button
              className={style.button}
              disabled={!canBeRevealed}
              type="primary"
              onclick={() => {
                roomConnection.send(
                  'ChangeRoomState',
                  userContext.roomCode,
                  'revealed'
                );
              }}
            >
              Reveal
            </Button>
          </React.Fragment>
        )
      ) : roomState === 'waiting' ? (
        <React.Fragment />
      ) : (
        <Button
          className={style.button}
          disabled={point === -1 ? true : false}
          type="primary"
          onclick={() => {
            roomConnection.send(
              'ChangeUserStatus',
              userContext.roomCode,
              userContext.username,
              'ready',
              userContext.point
            );
          }}
        >
          Lock
        </Button>
      )}
    </div>
  );
};

export default ControlPanel;
