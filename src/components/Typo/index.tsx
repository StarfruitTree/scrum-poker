import React from 'react';

interface Props {
  type?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Typo: React.FC<Props> = ({ type, children, className }) => {
  const Component = type || 'p';
  return <Component className={className}>{children}</Component>;
};

export default Typo;
