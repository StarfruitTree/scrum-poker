import React from 'react';
import style from './style.module.scss';
import { Typo, Icon } from '@scrpoker/components';

interface Props {
  iconName: string;
  actionName: string;
  className?: string;
  onClick: () => void;
}

const Box: React.FC<Props> = ({ iconName, actionName, onClick, className = '' }) => {
  return (
    <div className={`${style.box} ${className}`} onClick={onClick}>
      <div className={style.upper}>
        <Icon name={iconName} size="2x" />
      </div>

      <Typo className={style.actionName}>{actionName}</Typo>
    </div>
  );
};

export default Box;
