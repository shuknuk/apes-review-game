"use client";
"use client";
// Shuffle helper
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
import { useState } from "react";
import questions from "@/data/questions.json";

export default function QuestionCard({ onAnswer }) {
  const shuffled = shuffle(questions).slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionSet] = useState(shuffled);
  const [question, setQuestion] = useState(questionSet[currentIndex]);

  const handleClick = (choice) => {
    onAnswer(choice === question.correct, question);
    if (currentIndex + 1 < questionSet.length) {
      setCurrentIndex(currentIndex + 1);
      setQuestion(questionSet[currentIndex + 1]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{question.question}</h2>
      {question.choices.map((c, i) => (
        <button
          key={i}
          className="block w-full px-4 py-2 mb-2 bg-green-700 text-white hover:bg-green-800 rounded shadow-md text-center"
          onClick={() => handleClick(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
