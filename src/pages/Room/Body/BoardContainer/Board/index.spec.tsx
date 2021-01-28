import React from 'react';
import renderer from 'react-test-renderer';
import Board from './index';

describe('<Board />', () => {
  it('should render a board component with className="board " and without story', () => {
    const component = renderer.create(<Board />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board ');
  });

  it('should render a board component with className="board ", with story and without point and assignee', () => {
    const component = renderer.create(<Board />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board ');
  });

  it('should render a board component with className="board custom" and with a story', () => {
    const component = renderer.create(<Board className="custom" />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board custom');
  });
});
