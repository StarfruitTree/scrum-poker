import React from 'react';
import style from './style.module.scss';
import { Typo, Icon } from '@scrpoker/components';
import Avatar from '@scrpoker/components/Avatar';
import { connect } from 'react-redux';

interface Props {
  currentStory: IStory | undefined;
  className?: string;
}

const Board: React.FC<Props> = ({ currentStory, className = '' }) => {
  return currentStory !== undefined ? (
    <div className={`${style.board} ${className}`}>
      <div className={style.header}>
        <Typo className={style.title} type="h2">
          {currentStory.title}
        </Typo>
        {currentStory.point ? <Typo className={style.point}>{currentStory.point}</Typo> : ''}
      </div>
      <div className={style.content}>
        <Typo type="span">{currentStory.content}</Typo>
      </div>
      <div className={style.submit}>
        <div className={style.assign}>
          <Typo type="h3">Assignee</Typo>
          <Icon name="plus-circle" size="lg" className={style.icon} />
          {currentStory.assignee ? (
            <div className={style.assignee}>
              <Avatar letter={currentStory.assignee[0]} />
              <Typo>{currentStory.assignee}</Typo>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={style.submitPoint}>
          <Typo type="h3">Point</Typo>
          <Icon name="plus-circle" size="lg" className={style.icon} />
          {currentStory.point ? <Avatar className={style.customPoint} letter={currentStory.point.toString()} /> : ''}
        </div>
      </div>
    </div>
  ) : (
    <div className={`${style.board} ${className}`}></div>
  );
};

const mapStateToProps = ({ roomData: { currentStory } }: IGlobalState) => {
  return {
    currentStory,
  };
};

export default connect(mapStateToProps)(Board);
