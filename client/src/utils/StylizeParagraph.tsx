// StylizeParagraph.tsx
import React from 'react';

const StylizeParagraph = (paragraph: string): JSX.Element => {
    const points = paragraph.split('. ');

    // Map each point to a JSX element with a new line after it
    const jsxElements = points.map((point, index) => (
      <React.Fragment key={index}>
        <span>{point}.</span>
        <br />
      </React.Fragment>
    ));
  
    return <div>{jsxElements}</div>;
}

export default StylizeParagraph;

