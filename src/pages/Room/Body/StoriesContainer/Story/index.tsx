import React, { useRef, useState } from 'react';
import style from './style.module.scss';
import { Typo, Avatar, Icon } from '@scrpoker/components';
import Popup from './Popup';

interface IPopupState {
  isHidden: boolean;
  left?: number;
  top?: number;
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
  onClick?: (event: React.MouseEvent) => void;
  deleteStory?: (event: React.MouseEvent) => void;
}

const Story: React.FC<Props> = ({
  onClick,
  deleteStory,
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
      const left = ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width + 5;
      const top = ref.current.getBoundingClientRect().y + 6;
      setPopupState({ isHidden: state, left, top });
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
      {deleteStory ? <Icon onClick={deleteStory} className={style.closeButton} name="trash-alt" size="sm" /> : null}
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
