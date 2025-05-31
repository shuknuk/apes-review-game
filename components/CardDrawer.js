export default function CardDrawer({ cards }) {
  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-2">🃏 Cards Collected</h3>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-2 rounded border text-sm font-medium text-center ${
              card.type === "resource" ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500"
            }`}
          >
            {card.label}
          </div>
        ))}
      </div>
    </div>
  );
}