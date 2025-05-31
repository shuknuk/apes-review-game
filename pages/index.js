"use client";
import { useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import ScoreBoard from "@/components/ScoreBoard";
import DisasterPopup from "@/components/DisasterPopup";
import InstructionsModal from "@/components/InstructionsModal";
import ProgressBar from "@/components/ProgressBar";
import CardDrawer from "@/components/CardDrawer";

export default function Home() {
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [cards, setCards] = useState([]);
  const [showDisaster, setShowDisaster] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [winMessage, setWinMessage] = useState("");

  const resourceTypes = ["Solar Panel", "Tree", "Water Filter", "Awareness Campaign"];

  const countResources = () => {
    const counts = {};
    for (let res of resources) {
      counts[res] = (counts[res] || 0) + 1;
    }
    return counts;
  };

  const checkVictory = () => {
    const counts = countResources();
    return resourceTypes.every((type) => counts[type] >= 3);
  };

  const handleAnswer = (correct) => {
    setQuestionCount((prev) => prev + 1);
    if (correct) {
      setScore((prev) => prev + 10);
      const newLabel = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
      setCards((prev) => [...prev, { type: "resource", label: newLabel }]);
      setResources((prev) => [...prev, newLabel]);
      if (checkVictory()) {
        setWinMessage("🌟 You collected 3 of each resource and built a sustainable civilization!");
        setGameOver(true);
      }
    } else {
      setScore((prev) => prev - 5);
      const disaster = ["Oil Spill", "Deforestation", "Wildfire", "Toxic Waste"][Math.floor(Math.random() * 4)];
      setDisasters((prev) => [...prev, disaster]);
      setCards((prev) => [...prev, { type: "disaster", label: disaster }]);
      setShowDisaster(true);
    }
    if (score - 5 <= -20) {
      setWinMessage("💀 Environmental collapse... too many disasters.");
      setGameOver(true);
    }
  };

  const handleCloseDisaster = () => setShowDisaster(false);

  return (
    <main className="min-h-screen bg-green-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">🌍 Survive the Planet!</h1>
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      {gameOver ? (
        <div className="text-center mt-10 text-2xl">{winMessage}</div>
      ) : (
        <>
          <ProgressBar progress={questionCount} />
          <ScoreBoard score={score} resources={resources} />
          <QuestionCard onAnswer={handleAnswer} />
          <CardDrawer cards={cards} />
          {showDisaster && <DisasterPopup onClose={handleCloseDisaster} />}
        </>
      )}
    </main>
  );
}
