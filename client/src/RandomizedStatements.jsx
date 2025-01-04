import React, { useState } from 'react';
import ModalPopup from './ModalPopup';

const RandomizedStatements = ({ statements }) => {
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (statement) => {
    setSelectedStatement(statement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStatement(null);
    setIsModalOpen(false);
  };

  const handleGuess = (item) => {
    alert(`You guessed: ${item.text}. It is ${item.type === 'lie' ? 'a lie!' : 'true!'}`);
    closeModal();
  };

  return (
    <div className="statements">
      {statements.map((statement, index) => (
        <button
          key={index}
          onClick={() => openModal(statement)}
          className="statement-button"
        >
          <div>
            <strong>{statement.name}</strong>
          </div>
        </button>
      ))}

      <ModalPopup
        statement={selectedStatement}
        isOpen={isModalOpen}
        onClose={closeModal}
        onGuess={handleGuess}
      />
    </div>
  );
};

export default RandomizedStatements;
