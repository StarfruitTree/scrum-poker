import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Input from './index';

describe('<Input />', () => {
  it('should render an input tag with placeholder="Your name" and className="custom"', () => {
    const component = renderer.create(
      <Input placeHolder="Your name" className="custom" />
    );
    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('input');

    expect(tree.props.className).toBe('custom');

    expect(tree.props.placeholder).toBe('Your name');
  });

  it('should render an input tag with placeholder="Your name" and className=""', () => {
    const component = renderer.create(<Input placeHolder="Your name" />);
    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('input');

    expect(tree.props.className).toBe('');

    expect(tree.props.placeholder).toBe('Your name');
  });
});
