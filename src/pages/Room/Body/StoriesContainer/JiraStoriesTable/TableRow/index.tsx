import { Button, Typo } from '@scrpoker/components';
import React from 'react';
import style from './style.module.scss';

interface Props {
  storyState: string;
  issueKey: string;
  summary: string;
  issueTypeLink: string;
  onclick?: () => void;
}

const TableRow: React.FC<Props> = ({ storyState, issueKey, summary, issueTypeLink, onclick }) => {
  return (
    <div className={style.tableRow}>
      <div className={style.issueType}>
        <img src={issueTypeLink} />
      </div>
      <div className={style.issueKey}>
        <Typo>{issueKey}</Typo>
      </div>
      <div className={style.summary}>
        <Typo>{summary}</Typo>
      </div>
      <div>
        <Button
          square={true}
          small={true}
          pointerCursor={storyState === 'notAdded' ? true : false}
          icon={storyState === 'notAdded' ? 'plus' : storyState === 'adding' ? 'fas fa-circle-notch fa-spin' : 'check'}
          onClick={storyState === 'notAdded' ? onclick : undefined}
        ></Button>
      </div>
    </div>
  );
};

export default TableRow;
