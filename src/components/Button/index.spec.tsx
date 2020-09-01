import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Button from '.';

describe('<Button />', () => {
  it('should render button with className="primary" and children is hello when type="primary"', () => {
    const component = renderer.create(<Button type="primary">hello</Button>);

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('primary');
  });

  it('should render button with className="secondary custom-button" and children is hello when type="secondary" and className="custom-button"', () => {
    const component = renderer.create(
      <Button icon="arrow-right" className="custom-button" type="secondary">
        hello
      </Button>
    );

    let tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('secondary custom-button');
  });
});
