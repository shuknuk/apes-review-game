"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import QuestionCard from "@/components/QuestionCard";
import DisasterPopup from "@/components/DisasterPopup";
import InstructionsModal from "@/components/InstructionsModal";

export default function Home() {
  const [score, setScore] = useState(0);
  const [showDisaster, setShowDisaster] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [winMessage, setWinMessage] = useState("");

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [biodiversity, setBiodiversity] = useState(100);
  const [cleanWater, setCleanWater] = useState(100);
  const [airQuality, setAirQuality] = useState(100);
  const [climateStability, setClimateStability] = useState(100);

  // Main progress bar state
  const [mainProgress, setMainProgress] = useState(0);

  // Track missed questions
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [showMissedModal, setShowMissedModal] = useState(false);

  // Win/loss check logic in useEffect
  useEffect(() => {
    if (questionCount < 12) return;

    const avgHealth = (biodiversity + cleanWater + airQuality + climateStability) / 4;
    const healthStatus =
      avgHealth < 50
        ? "🌪️ Ecosystem is very unhealthy! Do not enter this ecosystem — you cause it harm."
        : avgHealth < 75
        ? "🌿 Ecosystem is moderately healthy. You can do better!"
        : "🌳 Ecosystem is very healthy. You are a safe human for this ecosystem!";

    let performanceMessage = "";
    if (mainProgress < 5) {
      performanceMessage = "💀 Ecosystem is cooked!";
    } else if (mainProgress < 10) {
      performanceMessage = "⚠️ Ecosystem is moderately healthy. You can do better.";
    } else {
      performanceMessage = "🎉 Ecosystem is saved! Great job!";
    }

    setWinMessage(`${performanceMessage}\n\n${healthStatus}`);
    setGameOver(true);
  }, [questionCount]);

  const checkEcoVictory = () => {
    const averageHealth = (biodiversity + cleanWater + airQuality + climateStability) / 4;
    return questionCount >= 10 && averageHealth >= 60;
  };

  const checkEcoCollapse = () => {
    const averageHealth = (biodiversity + cleanWater + airQuality + climateStability) / 4;

    return (
      biodiversity < 40 ||
      cleanWater < 40 ||
      airQuality < 40 ||
      climateStability < 40 ||
      averageHealth < 60
    );
  };

  // Accept correct (boolean) and question object
  const handleAnswer = (correct, question) => {
    let nextBiodiversity = biodiversity;
    let nextCleanWater = cleanWater;
    let nextAirQuality = airQuality;
    let nextClimateStability = climateStability;

    if (!correct) {
      setWrongCount((prev) => prev + 1);
      setMissedQuestions((prev) => [...prev, question]);

      const categories = ["biodiversity", "cleanWater", "airQuality", "climateStability"];
      const category = categories[Math.floor(Math.random() * categories.length)];

      if (category === "biodiversity") nextBiodiversity = Math.max(0, biodiversity - 10);
      if (category === "cleanWater") nextCleanWater = Math.max(0, cleanWater - 10);
      if (category === "airQuality") nextAirQuality = Math.max(0, airQuality - 10);
      if (category === "climateStability") nextClimateStability = Math.max(0, climateStability - 10);

      // Update states
      if (category === "biodiversity") setBiodiversity(nextBiodiversity);
      if (category === "cleanWater") setCleanWater(nextCleanWater);
      if (category === "airQuality") setAirQuality(nextAirQuality);
      if (category === "climateStability") setClimateStability(nextClimateStability);
    } else {
      setCorrectCount((prev) => prev + 1);
      setMainProgress((prev) => Math.min(12, prev + 1));
    }

    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
  };

  const handleCloseDisaster = () => setShowDisaster(false);

  const getBackgroundClass = () => {
    const total = correctCount + wrongCount;
    if (total === 0) return "from-yellow-100 via-green-100 to-green-200"; // start neutral
    const ratio = correctCount / total;

    if (ratio >= 0.7) return "from-green-200 via-green-300 to-green-400";
    if (ratio >= 0.4) return "from-yellow-100 via-green-100 to-green-200";
    if (ratio >= 0.2) return "from-orange-200 via-yellow-100 to-green-100";
    return "from-red-200 via-orange-200 to-yellow-100";
  };

  return (
    <>
      <Head>
        <title>Survive the Planet!</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>"
        />
      </Head>
      <main className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} text-gray-900 p-4`}>
      {!showInstructions && (
        <button
          onClick={() => setShowInstructions(true)}
          className="fixed top-4 right-4 bg-white shadow-md px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition z-50"
        >
          ❓ Instructions
        </button>
      )}
      <h1 className="text-3xl font-bold text-center mb-4">🌍 Survive the Planet!</h1>
      {showInstructions && (
        <div className="animate-fade-in transition-opacity duration-500">
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        </div>
      )}
      {gameOver ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm w-full">
            <div className="text-5xl mb-4 animate-bounce">
              {winMessage.includes("🎉") ? "🎉" : "💀"}
            </div>
            <h2 className="whitespace-pre-line text-xl font-bold mb-2">{winMessage}</h2>
            <p className="text-sm text-gray-600">Refresh the page to try again.</p>
            {missedQuestions.length > 0 && (
              <button
                onClick={() => setShowMissedModal(true)}
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-sm font-medium rounded"
              >
                📋 View Missed Questions
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:space-x-4 max-w-4xl mx-auto mb-4">
            <div className="bg-white shadow rounded-lg p-4 mb-4 md:mb-0 w-full md:w-1/2">
              <h2 className="font-bold text-lg mb-2">📈 Mission Progress: {mainProgress}/12</h2>
              <div className="w-full h-3 bg-purple-200 rounded mb-4">
                <div
                  className="h-3 bg-purple-600 rounded"
                  style={{ width: `${(mainProgress / 12) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 w-full md:w-1/2">
              <h2 className="font-bold text-lg mb-2">🌱 Ecosystem Health</h2>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 font-medium">Biodiversity</p>
                  <div className="w-full h-3 bg-green-200 rounded">
                    <div
                      className="h-3 bg-green-600 rounded"
                      style={{ width: `${biodiversity}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="mb-1 font-medium">Clean Water</p>
                  <div className="w-full h-3 bg-blue-200 rounded">
                    <div
                      className="h-3 bg-blue-600 rounded"
                      style={{ width: `${cleanWater}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="mb-1 font-medium">Air Quality</p>
                  <div className="w-full h-3 bg-gray-300 rounded">
                    <div
                      className="h-3 bg-gray-700 rounded"
                      style={{ width: `${airQuality}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="mb-1 font-medium">Climate Stability</p>
                  <div className="w-full h-3 bg-yellow-200 rounded">
                    <div
                      className="h-3 bg-yellow-500 rounded"
                      style={{ width: `${climateStability}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-md font-semibold text-shadow-sm text-gray-700 mb-4">
            Questions Left: {Math.max(0, 12 - questionCount)}
          </p>
          <QuestionCard onAnswer={handleAnswer} />
          {showDisaster && <DisasterPopup onClose={handleCloseDisaster} />}
        </>
      )}
      {showMissedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-bold mb-4">❌ Missed Questions</h3>
            <ul className="list-disc list-inside space-y-2 text-left text-sm">
              {missedQuestions.map((q, i) => (
                <li key={i}>
                  <strong>Q:</strong> {q.question} <br />
                  <strong>Answer:</strong> {q.correct}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowMissedModal(false)}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <footer className="text-center text-md text-black mt-10">
        Built by Kinshuk Goel 🌱
      </footer>
      </main>
    </>
  );
}
