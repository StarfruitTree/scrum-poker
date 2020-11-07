import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Icon from './index';

describe('<Icon />', () => {
  it('should render an i tag with className="fas fa-arrow-right fa-3x custom"', () => {
    const component = renderer.create(<Icon name="arrow-right" size="fa-3x" className="custom" />);
    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('i');

    expect(tree.props.className).toBe('fas fa-arrow-right fa-3x custom');
  });

  it('should render an i tag with className="fas fa-arrow-right fa-3x "', () => {
    const component = renderer.create(<Icon name="arrow-right" size="fa-3x" />);
    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('i');

    expect(tree.props.className).toBe('fas fa-arrow-right fa-3x ');
  });
});
