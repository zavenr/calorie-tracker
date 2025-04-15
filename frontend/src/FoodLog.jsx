import { useState } from "react";

export default function FoodLog() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!food || !calories) return;

    const newEntry = {
      id: Date.now(),
      food,
      calories: parseInt(calories),
    };

    setEntries([newEntry, ...entries]);
    setFood("");
    setCalories("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-grenn-600 mb-4 text-center">
        Food Log
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="e.g., Banana"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calories
          </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="e.g., 105"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Entry
        </button>
      </form>

      {/* Entries list */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Your Entries:</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="bg-gray-100 px-4 py-2 rounded flex justify-between items-center"
              >
                <span>{entry.food}</span>
                <span className="text-sm text-gray-600">
                  {entry.calories} kcal
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
