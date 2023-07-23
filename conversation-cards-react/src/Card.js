// src/Card.js

import React from 'react';
import './Card.css';

function Card({ card, onSnooze, onMarkAnswered, onNext }) {
  return (
    <div className="card">
      <h2>{card.question}</h2>
      <p>Category: {card.category}</p>
      <div className="buttons">
        <button className="snooze" onClick={() => onSnooze(card.id)}>
          Snooze
        </button>
        <button
          className="mark-answered"
          onClick={() => onMarkAnswered(card.id)}
        >
          Mark as Answered
        </button>
        <button className="next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Card;
