import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Button from '.';

describe('<Button />', () => {
  it('should render button with className="primary" and children is hello when buttonType="primary"', () => {
    const component = renderer.create(
      <Button buttonType="primary">hello</Button>
    );

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('primary');
  });

  it('should render button with className="secondary custom-button" and children is hello when buttonType="secondary" and className="custom-button"', () => {
    const component = renderer.create(
      <Button
        iconClassName="arrow-right"
        className="custom-button"
        buttonType="secondary"
      >
        hello
      </Button>
    );

    let tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('secondary custom-button');
  });
});
