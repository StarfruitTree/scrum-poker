import React from 'react';
import style from './style.module.scss';
import Box from './Box';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface Props {
  boxes: Box[];
}

const BoxContainer: React.FC<Props> = ({ boxes }) => {
  return (
    <div className={style.boxContainer}>
      {boxes.map((box, key) => (
        <Box
          className={style.box}
          key={key}
          iconName={box.iconName}
          actionName={box.actionName}
          onClick={box.onClick}
        />
      ))}
    </div>
  );
};

export default BoxContainer;
