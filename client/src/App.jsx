// client/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import InputForm from './inputForm';
import { io } from "socket.io-client";

function App() {
  const [statements, setStatements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [inputFormOpen, setInputFormOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
        s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const callback = (data) => {
      console.log(data);
      setStatements((prevStatements) => [...prevStatements, data]);
      console.log(statements);
    }

    socket.on("newStatement", callback);
    return () => {
      socket.off("newStatement", callback);
    };
  }, [socket]);


  const handleSubmit = (formData) => {
    setStatements([...statements, formData]);
    socket.emit("sendStatements", formData);
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
              className={selected === statement ? 'selected' : ''}
            >
              <div>
              <strong>{statement.name}</strong>
              </div>
              <div>Truth 1: {statement.truth1}</div>
              <div>Truth 2: {statement.truth2}</div>
              <div>Lie: {statement.lie}</div>
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

