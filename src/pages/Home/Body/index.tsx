import React from 'react';
import style from './style.module.scss';
import BoxContainer from './BoxContainer';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className = '' }) => {
  const boxes: Box[] = [
    {
      iconName: 'house-user',
      actionName: 'Join your room',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
    {
      iconName: 'arrow-right',
      actionName: 'Join a room',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
    {
      iconName: 'compress-arrows-alt',
      actionName: 'Integration',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
    {
      iconName: 'user-circle',
      actionName: 'Profile',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
  ];

  return (
    <div className={`${style.body} ${className}`}>
      <BoxContainer boxes={boxes} />
    </div>
  );
};

export default Body;
