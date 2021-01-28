import React from 'react';

interface Props {
  type?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
  htmlString?: string;
}

const Typo: React.FC<Props> = ({ type, children, htmlString, className, id }) => {
  const Component = type || 'p';
  return (
    <Component id={id} className={className}>
      {htmlString ? <div dangerouslySetInnerHTML={{ __html: htmlString }}></div> : children}
    </Component>
  );
};

export default Typo;
