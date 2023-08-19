import React from "react";

const Pagination = ({ current, total, onNext, onPrev, onSubmit }) => {
  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrev}
        disabled={current === 1}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg"
      >
        Previous
      </button>
      {current !== total && (
        <button
          onClick={handleNext}
          disabled={current === total}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Next
        </button>
      )}
      {current === total && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      )}
      <p className="text-gray-500 text-sm">
        Question {current} of {total}
      </p>
    </div>
  );
};

export default Pagination;
