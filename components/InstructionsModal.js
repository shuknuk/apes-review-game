export default function InstructionsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">🧾 How to Play</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>Answer questions to build a sustainable civilization.</li>
          <li>Correct answers earn points and resources.</li>
          <li>Wrong answers trigger environmental disasters.</li>
          <li>Reach 100 points to win or drop to -20 and lose!</li>
        </ul>
        <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded">Start Game</button>
      </div>
    </div>
  );
}