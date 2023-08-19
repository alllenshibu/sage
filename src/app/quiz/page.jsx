"use client";

import React, { useEffect, useState } from "react";
import Question from "./Question";
import Pagination from "./Pagination";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get("/api/quiz/attend");

      console.log(res.data);
      setQuestions(res.data);
    };

    getQuestions();
  }, []);

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

  const handleSubmit = async () => {
    const quizData = questions.map((q, i) => ({
      id: q.id,
      title: q.title,
      answer: answers[i],
    }));
    console.log(JSON.stringify(quizData));
    await axios.post("/api/quiz/submit", quizData);
  };
  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Question
          question={questions[currentQuestion].title}
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
