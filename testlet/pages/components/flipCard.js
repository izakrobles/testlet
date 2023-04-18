import React, { useState, useEffect } from "react";

function FlipCard(props) {
  const [view, setView] = useState(false);
  const [position, setPosition] = useState('center');

  const toggleView = () => {
    setView(!view);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      toggleView();
    } else if (event.key === 'ArrowLeft') {
      setPosition('left');
    } else if (event.key === 'ArrowRight') {
      setPosition('right');
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [view]);

  useEffect(() => {
    setView(false);
    setPosition('center');
  }, [props.question, props.answer]);

  return (
    <div className="FlipCard-container">
      <div className={`flip-card ${view ? 'flipped' : ''} ${position === 'left' ? 'flip-card-left' : (position === 'right' ? 'flip-card-right' : '')}`} onClick={toggleView}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {props.question}
          </div>
          <div className="flip-card-back">
            {view ? props.answer : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlipCard;
