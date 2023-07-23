// src/Card.js

import React from 'react';
import './Card.css';

function Card({ card, onSnooze, onMarkAnswered, onNext }) {
  return (
    <div className="card">
      <h2>{card.question}</h2>
      <p>Category: {card.category}</p>
      <button onClick={() => onSnooze(card.id)}>Snooze</button>
      <button onClick={() => onMarkAnswered(card.id)}>Mark as Answered</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default Card;
