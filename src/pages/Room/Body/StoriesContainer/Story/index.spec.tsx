import React from 'react';
import renderer from 'react-test-renderer';
import Story from './index';

describe('<Story />', () => {
  it('should render a story component with className="story " and without point, assignee', () => {
    const component = renderer.create(
      <Story isJiraStory={true} onClick={() => console.log('hello')} title="Implement header" />
    );
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('story ');
  });

  it('should render a story component with className="story custom" and with point, assignee', () => {
    const component = renderer.create(
      <Story
        isJiraStory={false}
        onClick={() => console.log('hello')}
        title="Implement header"
        point={8}
        assignee="An Pham"
        className="custom"
      />
    );
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props.className).toBe('story custom');
  });
});
