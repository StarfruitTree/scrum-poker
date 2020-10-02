import React from 'react';
import renderer from 'react-test-renderer';
import RoomInfo from './index';

describe('<RoomInfo />', () => {
  it('should render a component with className="roomInfo"', () => {
    const component = renderer.create(
      <RoomInfo
        title="Tricentis Flood"
        description="Sprint #53 planning is here, so let's get the party started shall we? Yes..."
        roomCode="123456"
        members={12}
      />
    );

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('roomInfo ');
  });

  it('should render a component with className="roomInfo custom"', () => {
    const component = renderer.create(
      <RoomInfo
        title="Tricentis Flood"
        description="Sprint #53 planning is here, so let's get the party started shall we? Yes..."
        roomCode="123456"
        members={12}
        className="custom"
      />
    );

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('roomInfo custom');
  });
});
