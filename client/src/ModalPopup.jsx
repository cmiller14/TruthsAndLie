import React from 'react';

const ModalPopup = ({ statement, isOpen, onClose, onGuess }) => {
  if (!isOpen || !statement) return null; // Don't render if not open or no statement provided

  const shuffleStatements = (truth1, truth2, lie) => {
    const items = [
      { text: truth1, type: 'truth' },
      { text: truth2, type: 'truth' },
      { text: lie, type: 'lie' },
    ];
    return items.sort(() => Math.random() - 0.5);
  };

  const shuffledItems = shuffleStatements(statement.truth1, statement.truth2, statement.lie);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Guess the Lie</h3>
        <p>{statement.name}</p>
        {shuffledItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onGuess(item)}
            className="guess-button"
          >
            {item.text}
          </button>
        ))}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPopup;
