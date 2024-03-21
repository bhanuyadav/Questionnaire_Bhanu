import React, { useState, useEffect } from "react";
import { getData, storeData, clearData } from "./storage";
import "./App.css";

const questions = [
  "Can you code in Ruby?",
  "Can you code in JavaScript?",
  "Can you code in Swift?",
  "Can you code in Java?",
  "Can you code in C#?",
];

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    clearData();
    setAnswers([]);
    setAverageScore(0);
  }, []);

  useEffect(() => {
    const storedAnswers = getData();
    if (storedAnswers.length > 0) {
      setAnswers(storedAnswers);
    }
  }, []);

  useEffect(() => {
    calculateAverageScore();
  }, [answers]);

  const calculateAverageScore = () => {
    if (answers.length <= 1) {
      setAverageScore(0);
      return;
    }

    let totalScore = 0;
    answers.forEach((answer) => {
      totalScore += answer.score;
    });
    const avgScore = Math.round(
      ((totalScore - answers[answers.length - 1].score) /
        (answers.length - 1)) *
        100
    );
    setAverageScore(avgScore);
  };

  const handleAnswer = (index, answer) => {
    const score = answer === "Yes" ? 1 : 0;
    const newAnswers = [...answers];
    newAnswers[index] = { question: questions[index], answer, score };
    setAnswers(newAnswers);
    storeData(newAnswers);
  };

  const calculateScore = () => {
    const yesCount = answers.filter((answer) => answer.answer === "Yes").length;
    return (yesCount / questions.length) * 100;
  };

  return (
    <div className="app-container">
      <h1 className="title">Questionnaire</h1>
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            <span className="question">{question}</span>
            <div className="answer-buttons">
              <button
                className={`answer-button ${
                  answers[index]?.answer === "Yes" && "selected"
                }`}
                onClick={() => handleAnswer(index, "Yes")}
              >
                Yes
              </button>
              <button
                className={`answer-button ${
                  answers[index]?.answer === "No" && "selected"
                }`}
                onClick={() => handleAnswer(index, "No")}
              >
                No
              </button>
            </div>
          </li>
        ))}
      </ul>
      {answers.length === questions.length && (
        <div className="result-container">
          <h2 className="result">
            Score for this run: {calculateScore().toFixed(2)}%
          </h2>
          {answers.length > 1 && (
            <h2 className="result">Average score: {averageScore}%</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
