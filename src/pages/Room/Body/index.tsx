import React from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className = '' }) => {
  const stories: Story[] = [
    {
      id: 1,
      title: 'Implement header component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 3,
    },
    {
      id: 2,
      title: 'Implement body component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 5,
    },
    {
      id: 3,
      title: 'Implement footer component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 5,
    },
    {
      id: 4,
      title: 'Implement APIs',
      content: `In word processing and desktop publishing, a hard return or paragraph break indicates a new paragraph, to be distinguished from the soft return at the end of a line internal to a paragraph. This distinction allows word wrap to automatically re-flow text as it is edited, without losing paragraph breaks. The software may apply vertical white space or indenting at paragraph breaks, depending on the selected style.
      How such documents are actually stored depends on the file format. For example, HTML uses the <p> tag as a paragraph container. In plaintext files, there are two common formats. Pre-formatted text will have a newline at the end of every physical line, and two newlines at the end of a paragraph, creating a blank line. An alternative is to only put newlines at the end of each paragraph, and leave word wrapping up to the application that displays or processes the text.     
      A line break that is inserted manually, and preserved when re-flowing, may still be distinct from a paragraph break, although this is typically not done in prose. HTML's <br /> tag produces a line break without ending the paragraph; the W3C recommends using it only to separate lines of verse (where each "paragraph" is a stanza), or in a street address`,
      assignee: 'Hieu Le',
      point: 5,
    },
  ];

  const currentStory: Story = {
    id: 4,
    title: 'Implement APIs',
    content: `In word processing and desktop publishing, a hard return or paragraph break indicates a new paragraph, to be distinguished from the soft return at the end of a line internal to a paragraph. This distinction allows word wrap to automatically re-flow text as it is edited, without losing paragraph breaks. The software may apply vertical white space or indenting at paragraph breaks, depending on the selected style.
    How such documents are actually stored depends on the file format. For example, HTML uses the <p> tag as a paragraph container. In plaintext files, there are two common formats. Pre-formatted text will have a newline at the end of every physical line, and two newlines at the end of a paragraph, creating a blank line. An alternative is to only put newlines at the end of each paragraph, and leave word wrapping up to the application that displays or processes the text.  
    A line break that is inserted manually, and preserved when re-flowing, may still be distinct from a paragraph break, although this is typically not done in prose. HTML's <br /> tag produces a line break without ending the paragraph; the W3C recommends using it only to separate lines of verse (where each "paragraph" is a stanza), or in a street address`,
    assignee: 'Hieu Le',
    point: 5,
  };

  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer currentStory={currentStory} />
    </div>
  );
};

export default Body;
