import React from 'react';
import renderer from 'react-test-renderer';
import Board from './index';
import { Story } from './index';

describe('<Board />', () => {
  it('should render a board component with className="board " and without story', () => {
    const component = renderer.create(<Board />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board ');
  });

  it('should render a board component with className="board ", with story and without point and assignee', () => {
    const story: Story = {
      id: 3,
      title: 'Implement footer component',
      content: 'Must be responsive',
    };
    const component = renderer.create(<Board story={story} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board ');
  });

  it('should render a board component with className="board custom" and with a story', () => {
    const story: Story = {
      id: 3,
      title: 'Implement footer component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 5,
    };
    const component = renderer.create(
      <Board story={story} className="custom" />
    );
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('board custom');
  });
});
