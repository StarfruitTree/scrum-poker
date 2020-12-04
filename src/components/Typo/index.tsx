import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
  linkTo?: string;
}

const Typo: React.FC<Props> = ({ type, children, className, id, linkTo }) => {
  const Component = type || 'p';
  return linkTo ? (
    <Link to={linkTo} className={className} id={id}>
      {children}
    </Link>
  ) : (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
};

export default Typo;
