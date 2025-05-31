export default function ProgressBar({ progress }) {
  const percent = Math.min(progress, 10) * 10;
  return (
    <div className="w-full max-w-xl mx-auto bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-green-600 h-4 rounded-full"
        style={{ width: `${percent}%`, transition: "width 0.5s" }}
      ></div>
    </div>
  );
}