import { DonutChart } from "@tremor/react";
import { Drumstick, Wheat, Pizza } from "lucide-react";

export default function Dashboard() {
  const data = {
    calories: 2500,
    protein: 125,
    carbs: 240,
    fats: 70,
  };

  const macroCards = [
    {
      label: "Protein",
      value: data.protein,
      color: "rose", // Tailwind color name
      icon: <Drumstick size={20} color="#f87171" />,
    },
    {
      label: "Carbs",
      value: data.carbs,
      color: "amber",
      icon: <Wheat size={20} color="#facc15" />,
    },
    {
      label: "Fats",
      value: data.fats,
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
            { name: "Calories", value: data.calories },
            { name: "Remaining", value: 3000 - data.calories }, // temp goal
          ]}
          category="value"
          index="name"
          colors={["indigo", "slate"]}
          showAnimation
        />
        <h2 className="text-4xl font-bold text-center mt-4 text-indigo-400">
          {data.calories} kcal
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
                { name: "Remaining", value: 300 - macro.value }, // temporary target
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
