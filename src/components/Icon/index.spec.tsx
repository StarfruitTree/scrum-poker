import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Icon } from '@scrpoker/components';

describe('<Icon />', () => {
  it('should render an i tag with className="fas fa-arrow-right" when icon="arrow-right"', () => {
    const component = renderer.create(<Icon icon="arrow-right" />);
    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe('i');

    expect(tree.props.className).toBe('fas fa-arrow-right');
  });
});
