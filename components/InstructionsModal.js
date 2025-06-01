export default function InstructionsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">🧾 How to Play</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-800">
          <li>You will answer 12 randomized questions related to environmental science.</li>
          <li>Each correct answer earns you 1 point toward your mission progress.</li>
          <li>Your goal is to save the ecosystem! Outcomes depend on how many points you earn:</li>
          <ul className="list-disc pl-5">
            <li><strong>0–4 points:</strong> 💀 Ecosystem is cooked!</li>
            <li><strong>5–9 points:</strong> ⚠️ Moderately healthy — you can do better.</li>
            <li><strong>10–12 points:</strong> 🎉 Ecosystem saved — great job!</li>
          </ul>
          <li>Wrong answers reduce the health of one of four areas: Biodiversity, Clean Water, Air Quality, or Climate Stability.</li>
          <li>The final ecosystem health is evaluated separately and gives personalized feedback:</li>
          <ul className="list-disc pl-5">
            <li><strong>Low Health:</strong> 🌪️ Very unhealthy — you cause it harm.</li>
            <li><strong>Medium Health:</strong> 🌿 Moderately healthy — you can do better.</li>
            <li><strong>High Health:</strong> 🌳 Very healthy — you are a safe human for this ecosystem!</li>
          </ul>
        </ul>
        <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded">Start Game</button>
      </div>
    </div>
  );
}