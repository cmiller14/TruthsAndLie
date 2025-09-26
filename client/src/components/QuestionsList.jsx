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
            // find the answered record for this question
            const answeredRecord = answeredQuestions?.find(
              (a) => a.questionId === q.id
            );
            const alreadyAnswered = Boolean(answeredRecord);
            const isCorrect = answeredRecord?.isCorrect;

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
                    <span
                      className={`badge ms-2 ${
                        isCorrect ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  )}
                </div>

                {/* Answer choices */}
                <ul className="list-group mt-2">
                  {Object.values(q.answers).map((ans, j) => {
                    const isSelected = selectedAnswer[i] === ans;

                    // apply green/red to chosen answer after submit
                    let bgClass = "";
                    if (alreadyAnswered && isSelected) {
                      bgClass = isCorrect
                        ? "bg-success text-white"
                        : "bg-danger text-white";
                    }

                    return (
                      <li
                        key={j}
                        className={`list-group-item list-group-item-action ${bgClass} ${
                          isSelected && !alreadyAnswered ? "active" : ""
                        }`}
                        style={{
                          cursor: alreadyAnswered ? "not-allowed" : "pointer",
                          opacity: alreadyAnswered ? 0.6 : 1,
                        }}
                        onClick={() => !alreadyAnswered && handleSelect(i, ans)}
                      >
                        {ans}
                      </li>
                    );
                  })}
                </ul>

                {/* Submit button */}
                <button
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!selectedAnswer[i] || alreadyAnswered}
                  onClick={() => handleSubmit(i, q.id)}
                >
                  {alreadyAnswered
                    ? isCorrect
                      ? "Correct!"
                      : "Incorrect"
                    : "Submit Answer"}
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


