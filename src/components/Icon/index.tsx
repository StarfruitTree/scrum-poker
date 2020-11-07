import React from 'react';

interface Props {
  name: string;
  size?: string;
  className?: string;
  onclick?: () => void;
}

const Icon: React.FC<Props> = ({ name, size, onclick, className = '' }) => {
  return <i onClick={onclick} className={`fas fa-${name} ${size} ${className}`} />;
};

export default Icon;
