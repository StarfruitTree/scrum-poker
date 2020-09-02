import React from 'react';
import renderer from 'react-test-renderer';
import Typo from './index';

describe('<Typo />', () => {
  it('should render h1 without class name when type="h1" and className is undefined and render hello text', () => {
    const component = renderer.create(<Typo type="h1">hello</Typo>);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('h1');

    expect(tree?.props.className).toBe(undefined);
  });

  it('should render p with className="custom" when type is undefined with hello text', () => {
    const component = renderer.create(<Typo className="custom">hello</Typo>);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('p');

    expect(tree.props.className).toBe('custom');
  });
});
