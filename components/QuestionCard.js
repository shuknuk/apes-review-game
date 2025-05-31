"use client";
import { useState } from "react";
import questions from "@/data/questions.json";

export default function QuestionCard({ onAnswer }) {
  const [question, setQuestion] = useState(questions[Math.floor(Math.random() * questions.length)]);

  const handleClick = (choice) => {
    onAnswer(choice === question.correct);
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{question.question}</h2>
      {question.choices.map((c, i) => (
        <button
          key={i}
          className="block w-full text-left px-4 py-2 mb-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          onClick={() => handleClick(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
