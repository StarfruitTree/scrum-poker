import React from 'react';
import renderer from 'react-test-renderer';
import PlayingCard from './index';

describe('<PlayingCard />', () => {
  it('should render a PlayingCard component with className="playingCard enable custom" and isSelected=true', () => {
    const component = renderer.create(
      <PlayingCard
        isSelected={true}
        point={3}
        enable={true}
        className="custom"
      />
    );
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('playingCard enable custom');
  });

  it('should render a PlayingCard component with className="playingCard  " and isSelected=true', () => {
    const component = renderer.create(
      <PlayingCard isSelected={true} point={3} enable={false} />
    );
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('playingCard disable ');
  });
});
