// src/App.js

/*
import React, { useState } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import './Card.css';

function App() {
  // A placeholder for backend data
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      text: 'What is your favorite book?',
      category: 'Personal',
      snoozed: false,
      answered: false,
    },
    {
      id: uuidv4(),
      text: 'What places would you like to visit?',
      category: 'Travel',
      snoozed: false,
      answered: false,
    },
    {
      id: uuidv4(),
      text: 'What have you read, seen, or listened to that has shaped your life?',
      category: 'Creativity',
      snoozed: false,
      answered: false,
    },
    {
      id: uuidv4(),
      text: 'What has been your favorite age so far? Why?',
      category: 'Personal',
      snoozed: false,
      answered: false,
    },
    {
      id: uuidv4(),
      text: 'How do you want to be remembered?',
      category: 'Intention',
      snoozed: false,
      answered: false,
    },
    // add more as you see fit
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSnooze = (id) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, snoozed: true } : card))
    );
  };

  const handleMarkAnswered = (id) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, answered: true } : card))
    );
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  return (
    <div className="App">
      <Card
        card={cards[currentIndex]}
        onSnooze={handleSnooze}
        onMarkAnswered={handleMarkAnswered}
        onNext={handleNext}
      />
    </div>
  );
}

export default App;
*/

// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {
  const [card, setCard] = useState(null);

  const fetchCard = async () => {
    const res = await axios.get('http://localhost:3001/card');
    setCard(res.data);
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:3001/card/${card.id}`)
      .then((response) => {
        if (response.data) {
          console.log(`Card with id ${card.id} deleted successfully.`);
          handleNext(); // Fetch the next card
        } else {
          console.error(`Failed to delete card with id ${card.id}.`);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleMarkAnswered = async () => {
    if (card) {
      await axios.put(`http://localhost:3001/card/${card.id}/answer`);
      fetchCard();
    }
  };

  const handleNext = () => {
    fetchCard();
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Card
        card={card}
        onDelete={handleDelete}
        onMarkAnswered={handleMarkAnswered}
        onNext={handleNext}
      />
    </div>
  );
}

export default App;
