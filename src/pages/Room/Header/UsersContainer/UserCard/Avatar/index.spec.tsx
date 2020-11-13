import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './index';

describe('<Avatar />', () => {
  it('should render an avatar component with className="avatar " and name="An"', () => {
    const component = renderer.create(
      <Avatar letter="A" pictureRef="https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png" />
    );

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('avatar ');
  });

  it('should render an avatar component with className="avatar noPicture "', () => {
    const component = renderer.create(<Avatar letter="A" />);

    const tree = component.toJSON() as renderer.ReactTestRendererJSON;
    expect(tree.props.className).toBe('avatar noPicture ');
  });
});
