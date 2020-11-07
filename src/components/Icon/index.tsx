import React from 'react';

interface Props {
  name: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ name, size, onClick, className }) => {
  return <i onClick={onClick} className={`fas fa-${name} ${size} ${className}`} />;
};

export default Icon;
