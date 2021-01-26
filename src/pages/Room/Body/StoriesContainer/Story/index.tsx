import React, { useRef, useState } from 'react';
import style from './style.module.scss';
import { Typo, Avatar } from '@scrpoker/components';
import Popup from './Popup';

interface IPopupState {
  isHidden: boolean;
  leftedSpace?: number;
}

interface Props {
  selected: boolean;
  title: string;
  assignee?: string;
  point?: number;
  submittedPointByUsers?: ISubmittedPointByUsers[];
  isJiraStory: boolean;
  jiraIssueId?: string;
  className?: string;
  onClick?: (() => void) | undefined;
}

const Story: React.FC<Props> = ({
  onClick,
  selected,
  title,
  assignee,
  point,
  submittedPointByUsers,
  isJiraStory,
  jiraIssueId,
  className = '',
}) => {
  const [popUpState, setPopupState] = useState<IPopupState>({ isHidden: true });
  const ref = useRef<HTMLDivElement>(null);

  const calculateLeftedSpaceAndSetPopupState = (state: boolean) => {
    if (ref.current) {
      const leftedSpace = ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width + 5;
      setPopupState({ isHidden: state, leftedSpace });
    }
  };

  return (
    <div
      onMouseEnter={() => calculateLeftedSpaceAndSetPopupState(false)}
      onMouseLeave={() => calculateLeftedSpaceAndSetPopupState(true)}
      onClick={onClick}
      className={`${style.story} ${className} ${onClick !== undefined ? style.clickable : ''} ${
        selected ? style.selected : ''
      }`}
      ref={ref}
    >
      <Popup className={style.popup} submittedPoint={submittedPointByUsers} popUpState={popUpState} />
      <div className={style.title}>
        <Typo>{title}</Typo>
      </div>

      <div className={style.details}>
        {point !== -1 ? <Typo className={style.point}>{point}</Typo> : <Typo></Typo>}
        {assignee ? (
          <div className={style.assignee}>
            <Avatar letter={assignee[0]} />
            <Typo type="span">{assignee}</Typo>
          </div>
        ) : (
          ''
        )}
        {isJiraStory ? (
          <div className={style.jiraIssueId}>
            <Typo className={style.span} type="span">
              {jiraIssueId}
            </Typo>{' '}
            &nbsp;&nbsp;
            <img width={16} height={16} src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/jira.svg" />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Story;
