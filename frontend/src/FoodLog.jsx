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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getFoodLogs().then(setLogs);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.food_name.trim()) newErrors.food_name = "Food name is required.";
    ["calories", "protein", "carbs", "fats"].forEach((field) => {
      const val = Number(form[field]);
      if (!val || val <= 0) newErrors[field] = "Must be a positive number.";
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
      setLogs((prev) => [...prev, created]);
      setForm({
        food_name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      });
    } catch (err) {
      console.error("❌ Error creating food log:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-800 pt-16">
      <div className="p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Log a New Food</h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <input
              name="food_name"
              value={form.food_name}
              onChange={handleChange}
              placeholder="Food name"
              required
              className="w-full p-2 rounded text-black"
            />
            {errors.food_name && (
              <p className="text-red-400 text-sm">{errors.food_name}</p>
            )}
          </div>

          <div>
            <input
              name="calories"
              type="number"
              value={form.calories}
              onChange={handleChange}
              placeholder="Calories"
              required
              className="w-full p-2 rounded text-black"
            />
            {errors.calories && (
              <p className="text-red-400 text-sm">{errors.calories}</p>
            )}
          </div>

          <div>
            <input
              name="protein"
              type="number"
              value={form.protein}
              onChange={handleChange}
              placeholder="Protein"
              required
              className="w-full p-2 rounded text-black"
            />
            {errors.protein && (
              <p className="text-red-400 text-sm">{errors.protein}</p>
            )}
          </div>

          <div>
            <input
              name="carbs"
              type="number"
              value={form.carbs}
              onChange={handleChange}
              placeholder="Carbs"
              required
              className="w-full p-2 rounded text-black"
            />
            {errors.carbs && (
              <p className="text-red-400 text-sm">{errors.carbs}</p>
            )}
          </div>

          <div>
            <input
              name="fats"
              type="number"
              value={form.fats}
              onChange={handleChange}
              placeholder="Fats"
              required
              className="w-full p-2 rounded text-black"
            />
            {errors.fats && (
              <p className="text-red-400 text-sm">{errors.fats}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"
          >
            Submit
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Your Food Logs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-slate-800 p-4 rounded shadow">
              <div className="font-bold text-lg">{log.food_name}</div>
              <div className="text-white">{log.calories} kcal</div>
              <div className="text-sm text-gray-300">
                Protein: {log.protein}g | Carbs: {log.carbs}g | Fats: {log.fats}
                g
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
