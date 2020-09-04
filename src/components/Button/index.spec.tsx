import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Button from '.';

describe('<Button />', () => {
  it('should render button with className="secondary custom-button" and children is hello when type="secondary" and className="custom-button"', () => {
    const component = renderer.create(
      <Button icon="arrow-right" className="custom-button" type="secondary">
        hello
      </Button>
    );

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('secondary custom-button');
  });

  it('should render button with className="secondary"', () => {
    const component = renderer.create(
      <Button icon="arrow-right" type="secondary">
        hello
      </Button>
    );

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('button');

    expect(tree.props.className).toBe('secondary ');
  });
});
