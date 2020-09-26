import React from 'react';
import renderer from 'react-test-renderer';
import Card from './index';

describe('<Card />', () => {
  it('Should render a card component with className="card standBy "', () => {
    const component = renderer.create(<Card status="standBy" />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('card standBy ');
  });

  it('Should render a card component with className="card ready "', () => {
    const component = renderer.create(<Card status="ready" />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('card ready ');
  });

  it('Should render a card component with className="card revealed "', () => {
    const component = renderer.create(<Card status="revealed" point={2} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('card revealed ');
  });
});
