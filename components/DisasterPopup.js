export default function DisasterPopup({ onClose }) {
  const events = ["Oil Spill", "Species Extinction", "Smog Attack", "Toxic Waste Dump"];
  const event = events[Math.floor(Math.random() * events.length)];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-bold mb-2">⚠️ Disaster Event!</h3>
        <p className="mb-4">{event} occurred due to a wrong choice!</p>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}
