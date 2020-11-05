import React from 'react';

interface Props {
  name: string;
  size?: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ name, size, className = '' }) => {
  return <i className={`fas fa-${name} ${size} ${className}`} />;
};

export default Icon;
