"use client";

import React, { useState } from "react";
import Question from "./Question";
import Pagination from "./Pagination";

const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
  {
    question: "What is the highest mountain in the world?",
    answer: "Mount Everest",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    const quizData = {
      questions: questions.map((q, i) => ({
        question: q.question,
        answer: q.answer,
        userAnswer: answers[i],
      })),
    };
    console.log(JSON.stringify(quizData));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Question
          question={questions[currentQuestion].question}
          answer={answers[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <Pagination
          current={currentQuestion + 1}
          total={questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Quiz;
