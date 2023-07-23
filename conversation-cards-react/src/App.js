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
