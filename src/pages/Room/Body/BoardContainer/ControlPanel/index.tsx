import React from 'react';
import { Button } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';
import { updateIsLocked } from '@scrpoker/store/actions/roomAction';
import { connect } from 'react-redux';

interface Props {
  className?: string;
  currentStory: IStory | undefined;
  roomCode: string;
  roomConnection: any;
  point: number;
  role: number;
  isLocked: boolean;
  roomState: string;
  canBeRevealed: boolean;
  updateIsLocked: (isLocked: boolean) => IRoomAction;
}

const ControlPanel: React.FC<Props> = ({
  roomConnection,
  point,
  role,
  roomState,
  roomCode,
  isLocked,
  currentStory,
  canBeRevealed,
  className = '',
}) => {
  const currentStoryIsPicked = currentStory !== undefined ? true : false;
  return (
    <div className={`${style.controlPanel} ${className}`}>
      {role === 0 ? (
        roomState === 'waiting' ? (
          <Button
            className={style.button}
            onClick={() => {
              roomConnection.send('ChangeRoomState', roomCode, 'playing');
            }}
            disabled={!currentStoryIsPicked}
          >
            Start
          </Button>
        ) : roomState === 'playing' ? (
          <React.Fragment>
            <Button
              className={style.button}
              disabled={point === -1 || isLocked ? true : false}
              onClick={() => {
                roomConnection.send('ChangeUserStatus', roomCode, 'ready', point);
                updateIsLocked(true);
              }}
            >
              Lock
            </Button>
            <Button
              className={style.button}
              disabled={!canBeRevealed}
              onClick={() => {
                roomConnection.send('ChangeRoomState', roomCode, 'revealed');
              }}
            >
              Reveal
            </Button>
          </React.Fragment>
        ) : (
          <Button
            className={style.button}
            onClick={() => {
              roomConnection.send('ChangeRoomState', roomCode, 'waiting');
              roomConnection.send('ChangeCurrentStory', roomCode, -1);
            }}
            disabled={false}
          >
            Done
          </Button>
        )
      ) : roomState === 'waiting' || roomState === 'revealed' ? (
        <React.Fragment />
      ) : (
        <Button
          className={style.button}
          disabled={point === -1 || isLocked ? true : false}
          onClick={() => {
            roomConnection.send('ChangeUserStatus', roomCode, 'ready', point);
            updateIsLocked(true);
          }}
        >
          Lock
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = ({
  roomData: { roomCode, roomState, roomConnection, point, isLocked, currentStory, canBeRevealed, role },
}: IGlobalState) => {
  return {
    roomCode,
    roomState,
    roomConnection,
    point,
    isLocked,
    currentStory,
    canBeRevealed,
    role,
  };
};

const mapDispatchToProps = {
  updateIsLocked: Actions.roomActions.updateIsLocked,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
