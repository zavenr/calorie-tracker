import { useEffect, useState } from "react";
import { DonutChart } from "@tremor/react";
import { Drumstick, Wheat, Pizza } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [dailyData, setDailyData] = useState([]);

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

        const daily = res.data.reduce((acc, item) => {
          const date = item.date?.split("T")[0];
          if (!date) return acc;
          if (!acc[date]) acc[date] = { date, calories: 0 };
          acc[date].calories += item.calories;
          return acc;
        }, {});
        setDailyData(Object.values(daily));
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

  const macroData = [
    { name: "Protein", value: totals.protein },
    { name: "Carbs", value: totals.carbs },
    { name: "Fats", value: totals.fats },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-800 pt-20">
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

        {/* Macro Breakdown */}
        <div className="bg-slate-900 rounded-xl p-6 w-full max-w-lg mb-12 shadow flex flex-col items-center">
          <DonutChart
            data={macroData}
            category="value"
            index="name"
            colors={["rose", "amber", "blue"]}
            showAnimation
          />
          <div className="flex justify-around w-full mt-4">
            {macroCards.map((macro) => (
              <div key={macro.label} className="flex items-center space-x-1">
                {macro.icon}
                <span className={`text-${macro.color}-400 font-semibold`}>
                  {macro.label}: {macro.value}g
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Calories Bar Chart */}
        {dailyData.length > 0 && (
          <div className="bg-slate-900 rounded-xl p-6 mt-12 w-full max-w-4xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Calories by Day
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dailyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#c084fc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
