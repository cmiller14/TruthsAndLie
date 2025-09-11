import React from "react";

function AddQuestionModal({
  show,
  onClose,
  onAdd,
  questionData,
  setQuestionData,
}) {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleAnswerChange = (field, value) => {
  setQuestionData((prev) => ({
    ...prev,
    answers: {
      ...prev.answers,
      [field]: value,
    },
  }));
};


  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-card">
          <div className="modal-header">
            <h5 className="modal-title">Add a Question</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* Question */}
            <textarea
              className="form-control mb-3"
              rows="2"
              placeholder="Type your question here..."
              name="text"
              value={questionData.text}
              onChange={handleChange}
            />

            {/* Answers */}
            <label className="form-label">Truth Answer</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Correct answer"
              value={questionData.answers.truth}
              onChange={(e) => handleAnswerChange("truth", e.target.value)}
            />

            <label className="form-label">False Answer 1</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Wrong answer 1"
              value={questionData.answers.false1}
              onChange={(e) => handleAnswerChange('false1', e.target.value)}
            />

            <label className="form-label">False Answer 2</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Wrong answer 2"
              value={questionData.answers.false2}
              onChange={(e) => handleAnswerChange('false2', e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onAdd}>
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;

