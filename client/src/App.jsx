// client/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import InputForm from './inputForm';
import { io } from "socket.io-client";

function App() {
  const [statements, setStatements] = useState([]);
  const [lie, setLie] = useState('');
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState('');
  const [inputFormOpen, setInputFormOpen] = useState(false);
  const socket = io("http://localhost:3001"); // Express server's URL

  useEffect(() => {
    // Fetch game data from the server
    fetch('http://localhost:3001/api/game')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const shuffledStatements = [data.truth1, data.truth2, data.lie].sort(() => Math.random() - 0.5);
        setStatements(shuffledStatements);
        setLie(data.lie);
      });
  }, []);

  useEffect(() => {
    // Listen for backend confirmation
    socket.on("formSubmissionResponse", (data) => {
      console.log("Response from server:", data);
    });
    return () => {
      socket.off("formSubmissionResponse");
    };
  }, []);


  const handleSubmit = (formData) => {
    console.log("Sending form data:", formData);

    socket.emit("sendFormData", formData);

  };

  const handleSelection = (statement) => {
    setSelected(statement);
    if (statement === lie) {
      setResult('Correct! That was the lie.');
    } else {
      setResult('Wrong! That was actually true.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Two Truths and a Lie</h1>
        <button onClick={() => setInputFormOpen(true)}>Submit Two Truths and a Lie</button>
        <InputForm 
          isOpen={inputFormOpen}
          onClose={() => setInputFormOpen(false)}
          onSubmit={handleSubmit}>
        </InputForm>
        <p>Can you spot the lie?</p>
        <div className="statements">
          {statements.map((statement, index) => (
            <button
              key={index}
              onClick={() => handleSelection(statement)}
              className={selected === statement ? 'selected' : ''}
            >
              {statement}
            </button>
          ))}
        </div>
        {result && <p className="result">{result}</p>}
      </header>
    </div>
  );
}

export default App;

