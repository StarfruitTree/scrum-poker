import React from 'react';
import style from './style.module.scss';
import { Typo, Icon } from '@scrpoker/components';
import { connect } from 'react-redux';
import { upPoint, downPoint } from '@scrpoker/utils/pointController';
interface Props {
  currentStory: IStory | undefined;
  currentStoryPoint: number;
  roomConnection: any;
  roomState: string;
  roomCode: string;
  role: number;
  className?: string;
}

const Board: React.FC<Props> = ({
  currentStory,
  currentStoryPoint,
  roomState,
  roomConnection,
  roomCode,
  role,
  className = '',
}) => {
  return currentStory !== undefined ? (
    <div className={`${style.board} ${className}`}>
      <div className={style.header}>
        <Typo className={style.title} type="h2">
          {currentStory.title}
        </Typo>
        {currentStoryPoint !== -1 ? (
          <div
            className={`${role === 0 ? style.pointContainerHost : style.pointContainerPlayer} ${
              roomState !== 'revealed' ? style.isDisabled : ''
            }`}
          >
            <div className={style.pointWrapper}>
              <Typo className={style.point}>{currentStoryPoint}</Typo>
            </div>
            {role === 0 ? (
              <div className={style.buttonContainer}>
                <Icon
                  name="caret-square-up"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, upPoint());
                        }
                  }
                />
                <Icon
                  name="caret-square-down"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, downPoint());
                        }
                  }
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : currentStory.point !== -1 ? (
          <div
            className={`${role === 0 ? style.pointContainerHost : style.pointContainerPlayer} ${
              roomState !== 'revealed' ? style.isDisabled : ''
            }`}
          >
            {' '}
            <div className={style.pointWrapper}>
              <Typo className={style.point}>{currentStory.point}</Typo>
            </div>{' '}
            {role === 0 ? (
              <div className={style.buttonContainer}>
                <Icon
                  name="caret-square-up"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, upPoint());
                        }
                  }
                />
                <Icon
                  name="caret-square-down"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, downPoint());
                        }
                  }
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div
            className={`${role === 0 ? style.pointContainerHost : style.pointContainerPlayer} ${
              roomState !== 'revealed' ? style.isDisabled : ''
            }`}
          >
            {' '}
            <div className={style.pointWrapper}>
              <Typo className={style.point}>?</Typo>
            </div>{' '}
            {role === 0 ? (
              <div className={style.buttonContainer}>
                <Icon
                  name="caret-square-up"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, upPoint());
                        }
                  }
                />
                <Icon
                  name="caret-square-down"
                  onClick={
                    roomState !== 'revealed'
                      ? undefined
                      : () => {
                          roomConnection.send('ChangeCurrentStoryPoint', roomCode, downPoint());
                        }
                  }
                />
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
      <div className={style.content}>
        <Typo type="span">{currentStory.content}</Typo>
      </div>
    </div>
  ) : (
    <div className={`${style.board} ${className}`}></div>
  );
};

const mapStateToProps = ({
  roomData: { currentStory, currentStoryPoint, roomState, roomCode, roomConnection, role },
}: IGlobalState) => {
  return {
    currentStory,
    currentStoryPoint,
    roomState,
    roomConnection,
    roomCode,
    role,
  };
};

export default connect(mapStateToProps)(Board);
