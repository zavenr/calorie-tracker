export default function Dashboard() {
  // Placeholder values
  const calorieGoal = 2000;
  const caloriesConsumed = 1350;
  const caloriesRemaining = calorieGoal - caloriesConsumed;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        Dashboard
      </h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">🎯 Calorie Goal:</span>
          <span className="text-green-600 font-semibold">
            {calorieGoal} kcal
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">🍽️ Consumed:</span>
          <span className="text-red-500 font-semibold">
            {caloriesConsumed} kcal
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">⚡ Remaining:</span>
          <span className="text-blue-500 font-semibold">
            {caloriesRemaining} kcal
          </span>
        </div>
      </div>
    </div>
  );
}
