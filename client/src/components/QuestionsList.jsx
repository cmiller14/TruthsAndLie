import React, { useState } from "react";

function QuestionsList({ questions, onSubmitAnswer }) {
  // Track the selected answers for each question
  const [selectedAnswer, setSelectedAnswers] = useState({});

  const handleSelect = (qIndex, answer) => {
    setSelectedAnswers((prev) => {
      // Toggle off if already selected
      if (prev[qIndex] === answer) {
        const updated = { ...prev };
        delete updated[qIndex]; // remove the selection
        return updated;
      }
      // Otherwise set the new answer
      return {
        ...prev,
        [qIndex]: answer,
      };
    });
  };

  const handleSubmit = (qIndex) => {
    if (!selectedAnswer[qIndex]) return;
    onSubmitAnswer(qIndex, selectedAnswer[qIndex]);
  };

  return (
    <div className="shadow-card">
      <h3 className="mb-3">Questions</h3>
      {!questions || questions.length === 0 ? (
        <p className="text-muted">No questions yet.</p>
      ) : (
        <ul className="list-group">
          {questions.map((q, i) => (
            <li key={i} className="list-group-item">
              <div className="mb-2">
                <strong>{q.author}:</strong> {q.text}
              </div>

              {/* Answer choices */}
              <ul className="list-group mt-2">
                {Object.values(q.answers).map((ans, j) => (
                  <li
                    key={j}
                    className={`list-group-item list-group-item-action ${
                      selectedAnswer[i] === ans ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(i, ans)}
                  >
                    {ans}
                  </li>
                ))}
              </ul>

              {/* Submit button */}
              <button
                className="btn btn-sm btn-primary mt-2"
                disabled={!selectedAnswer[i]}
                onClick={() => handleSubmit(i)}
              >
                Submit Answer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionsList;


