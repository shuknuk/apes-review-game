export default function ScoreBoard({ score, resources }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 max-w-xl mx-auto">
      <p className="text-lg">🌱 Sustainability Score: <strong>{score}</strong></p>
      <p className="mt-2">🎁 Resources Collected: {resources.join(", ")}</p>
    </div>
  );
}
