"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get("/api/quiz/attend");

      console.log(res.data);
      setQuestions(res.data);
    };

    getQuestions();
    return () => {
      setQuestions([]);
    };
  }, []);

  function handleClick(values) {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === questions.length - 1) {
      alert("Quiz Completed");
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-[570px] bg-gray-100">
      <h1 className="text-center text-3xl font-semibold pt-12">Quiz</h1>
      <div className="grid place-items-center mt-12">
        {questions.length > 0 && (
          <div className="w-[650px] flex flex-col gap-2 shadow-xl rounded-xl p-5 bg-white">
            <h1 className="text-2xl font-semibold">
              Question : {currentQuestion + 1}
            </h1>
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].title}
            </h2>
            <form className="flex flex-col gap-5 mt-6">
              <div
                className="transition-all text-lg text-white px-2 py-1 rounded-xl font-medium bg-blue-500 hover:bg-blue-400"
                onClick={() => {
                  setAnswers([...answers, "1"]);
                  handleClick();
                }}
              >
                {questions[currentQuestion].option_1}
              </div>
              <div
                className="transition-all text-lg text-white px-2 py-1 rounded-xl font-medium bg-blue-500 hover:bg-blue-400"
                onClick={() => {
                  setAnswers([...answers, "2"]);
                  handleClick();
                }}
              >
                {questions[currentQuestion].option_2}
              </div>
              <div
                className="transition-all text-lg text-white px-2 py-1 rounded-xl font-medium bg-blue-500 hover:bg-blue-400"
                onClick={() => {
                  setAnswers([...answers, "3"]);
                  handleClick();
                }}
              >
                {questions[currentQuestion].option_3}
              </div>
              <div
                className="transition-all text-lg text-white px-2 py-1 rounded-xl font-medium bg-blue-500 hover:bg-blue-400"
                onClick={() => {
                  setAnswers([...answers, "4"]);
                  handleClick();
                }}
              >
                {questions[currentQuestion].option_4}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
