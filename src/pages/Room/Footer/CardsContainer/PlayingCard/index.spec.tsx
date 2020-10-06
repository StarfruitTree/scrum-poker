import React from 'react';
import renderer from 'react-test-renderer';
import PlayingCard from './index';

describe('<PlayingCard />', () => {
  it('should render a PlayingCard component with className="playingCard chosen custom"', () => {
    const component = renderer.create(
      <PlayingCard point={3} enable={true} className="custom" />
    );

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('playingCard chosen custom');
  });

  it('should render a PlayingCard component with className="playingCard  "', () => {
    const component = renderer.create(<PlayingCard point={3} enable={false} />);

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('playingCard  ');
  });
});
