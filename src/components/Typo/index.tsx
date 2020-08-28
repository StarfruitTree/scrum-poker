import React, { Component } from 'react';

interface Typo {
  type: keyof JSX.IntrinsicElements;
}

export default function Typo({ type, children }: Typo) {
  const Component = type || 'p';
  return <Component>{children}</Component>;
}
