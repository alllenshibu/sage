import React from "react";

const Question = ({ question, answer, onAnswer }) => {
  const handleChange = (event) => {
    onAnswer(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{question}</h2>
      <input
        type="text"
        value={answer || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      />
    </div>
  );
};

export default Question;
