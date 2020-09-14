import React from 'react';
import renderer from 'react-test-renderer';
import Typo from './index';

describe('<Typo />', () => {
  it('should render h1 without class name when type="h1"', () => {
    const component = renderer.create(<Typo type="h1">hello</Typo>);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('h1');

    expect(tree?.props.className).toBe('');
  });

  it('should render p tag with className="custom"', () => {
    const component = renderer.create(<Typo className="custom">hello</Typo>);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('p');

    expect(tree.props.className).toBe('custom');
  });
});
