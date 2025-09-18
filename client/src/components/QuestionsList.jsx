import React, { useState } from "react";

function QuestionsList({ questions, onSubmitAnswer, answeredQuestions }) {
  // Track the selected answers for each question
  const [selectedAnswer, setSelectedAnswers] = useState({});

  const handleSelect = (qIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: answer,
    }));
  };

  const handleSubmit = (qIndex, qId) => {
    if (!selectedAnswer[qIndex]) return;
    onSubmitAnswer(qId, selectedAnswer[qIndex]);
  };

  return (
    <div className="shadow-card">
      <h3 className="mb-3">Questions</h3>
      {!questions || questions.length === 0 ? (
        <p className="text-muted">No questions yet.</p>
      ) : (
        <ul className="list-group">
          {questions.map((q, i) => {
            const alreadyAnswered = answeredQuestions?.includes(q.id); // 👈 check here

            return (
              <li
                key={i}
                className={`list-group-item ${
                  alreadyAnswered ? "bg-light text-muted" : ""
                }`}
              >
                <div className="mb-2">
                  <strong>{q.author}:</strong> {q.text}
                  {alreadyAnswered && (
                    <span className="badge bg-info ms-2">Answered</span>
                  )}
                </div>

                {/* Answer choices */}
                <ul className="list-group mt-2">
                  {Object.values(q.answers).map((ans, j) => (
                    <li
                      key={j}
                      className={`list-group-item list-group-item-action ${
                        selectedAnswer[i] === ans ? "active" : ""
                      }`}
                      style={{
                        cursor: alreadyAnswered ? "not-allowed" : "pointer",
                        opacity: alreadyAnswered ? 0.6 : 1,
                      }}
                      onClick={() =>
                        !alreadyAnswered && handleSelect(i, ans)
                      }
                    >
                      {ans}
                    </li>
                  ))}
                </ul>

                {/* Submit button */}
                <button
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!selectedAnswer[i] || alreadyAnswered} // 👈 disabled if answered
                  onClick={() => handleSubmit(i, q.id)}
                >
                  {alreadyAnswered ? "Already Answered" : "Submit Answer"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default QuestionsList;

