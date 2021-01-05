import React from 'react';

type IconSize = 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x';

interface Props {
  name: string;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ name, size, className = '', onClick }) => {
  const sizeClass = size ? `fa-${size}` : '';
  return <i onClick={onClick} className={`fas fa-${name} ${sizeClass} ${className}`} />;
};

export default Icon;
