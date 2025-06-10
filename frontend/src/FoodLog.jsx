import { useEffect, useState } from "react";
import { getFoodLogs, createFoodLog } from "./auth/api";

export default function FoodLog() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    food_name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  useEffect(() => {
    getFoodLogs().then(setLogs);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting log:", form);

    const newLog = {
      ...form,
      calories: parseInt(form.calories),
      protein: parseInt(form.protein),
      carbs: parseInt(form.carbs),
      fats: parseInt(form.fats),
      user_id: "demo-user",
    };

    try {
      const created = await createFoodLog(newLog);
      console.log("✅ Log created:", created);
      setLogs((prev) => [...prev, created]);

      setForm({
        food_name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      });
    } catch (err) {
      console.error(
        "❌ Error creating food log:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Log a New Food</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          name="food_name"
          value={form.food_name}
          onChange={handleChange}
          placeholder="Food name"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          name="calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
          placeholder="Calories"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          name="protein"
          type="number"
          value={form.protein}
          onChange={handleChange}
          placeholder="Protein"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          name="carbs"
          type="number"
          value={form.carbs}
          onChange={handleChange}
          placeholder="Carbs"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          name="fats"
          type="number"
          value={form.fats}
          onChange={handleChange}
          placeholder="Fats"
          required
          className="w-full p-2 rounded text-black border-pink-500"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
        <button
          onClick={async () => {
            try {
              const res = await fetch("http://localhost:3001/api/foodlogs", {
                method: "DELETE",
              });

              if (res.ok) {
                setLogs([]);
                console.log("✅ Logs cleared from DB.");
              } else {
                console.error("❌ Failed to delete logs:", await res.json());
              }
            } catch (err) {
              console.error("❌ Error clearing logs:", err);
            }
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white mt-4"
        >
          Clear All Logs
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Food Logs</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="bg-slate-800 p-4 rounded">
            <strong>{log.food_name}</strong> — {log.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
