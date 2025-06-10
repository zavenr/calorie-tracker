import { useEffect, useState } from "react";
import { DonutChart } from "@tremor/react";
import { Drumstick, Wheat, Pizza } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/foodlogs")
      .then((res) => {
        setLogs(res.data);

        const totals = res.data.reduce(
          (acc, item) => ({
            calories: acc.calories + item.calories,
            protein: acc.protein + item.protein,
            carbs: acc.carbs + item.carbs,
            fats: acc.fats + item.fats,
          }),
          { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );

        setTotals(totals);
      })
      .catch((err) => {
        console.error("Error fetching logs:", err);
      });
  }, []);

  const macroCards = [
    {
      label: "Protein",
      value: totals.protein,
      color: "rose",
      icon: <Drumstick size={20} color="#f87171" />,
    },
    {
      label: "Carbs",
      value: totals.carbs,
      color: "amber",
      icon: <Wheat size={20} color="#facc15" />,
    },
    {
      label: "Fats",
      value: totals.fats,
      color: "blue",
      icon: <Pizza size={20} color="#60a5fa" />,
    },
  ];

  return (
    <div className="p-8 text-white flex flex-col items-center">
      {/* Calories Donut */}
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-lg mb-12 shadow flex flex-col items-center">
        <DonutChart
          data={[
            { name: "Calories", value: totals.calories },
            { name: "Remaining", value: Math.max(3000 - totals.calories, 0) },
          ]}
          category="value"
          index="name"
          colors={["indigo", "slate"]}
          showAnimation
        />
        <h2 className="text-4xl font-bold text-center mt-4 text-indigo-400">
          {totals.calories} kcal
        </h2>
        <p className="text-center text-slate-400">Total Calories</p>
      </div>

      {/* Macro Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {macroCards.map((macro) => (
          <div
            key={macro.label}
            className="bg-slate-900 rounded-xl p-6 flex flex-col items-center shadow"
          >
            <DonutChart
              data={[
                { name: macro.label, value: macro.value },
                { name: "Remaining", value: Math.max(300 - macro.value, 0) },
              ]}
              category="value"
              index="name"
              colors={[macro.color, "slate"]}
              showAnimation
            />
            <h3 className={`text-xl font-bold mt-4 text-${macro.color}-400`}>
              {macro.value}g <span className="text-white">{macro.label}</span>
            </h3>
            <div className="mt-2">{macro.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
