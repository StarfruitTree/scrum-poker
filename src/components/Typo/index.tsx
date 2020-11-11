import React from 'react';

interface Props {
  type?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
}

const Typo: React.FC<Props> = ({ type, children, className, id }) => {
  const Component = type || 'p';
  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
};

export default Typo;
