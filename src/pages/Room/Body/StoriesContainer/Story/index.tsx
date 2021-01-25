import React, { useState } from 'react';
import style from './style.module.scss';
import { Typo, Avatar } from '@scrpoker/components';
import Popup from './Popup';

interface Props {
  selected: boolean;
  title: string;
  assignee?: string;
  point?: number;
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
  isJiraStory,
  jiraIssueId,
  className = '',
}) => {
  const [isPopupHidden, setIsPopupHidden] = useState(true);

  const submittedPointByUsers: ISubmittedPointByUsers[] = [
    { userId: 1, userName: 'An Pham', point: 5 },
    { userId: 2, userName: 'Hoang Trinh', point: 3 },
    { userId: 3, userName: 'Pham Van An', point: 8 },
  ];

  return (
    <div
      onMouseEnter={() => setIsPopupHidden(false)}
      onMouseLeave={() => setIsPopupHidden(true)}
      onClick={onClick}
      className={`${style.story} ${className} ${onClick !== undefined ? style.clickable : ''} ${
        selected ? style.selected : ''
      }`}
    >
      <Popup className={style.popup} submittedPoint={submittedPointByUsers} isHidden={isPopupHidden} />
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
