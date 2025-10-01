import { useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, TrendingUp, Target, Zap } from "lucide-react";
import { DashboardLayout, Card, Grid } from "../components/Layout";
import { DonutChart, ProgressRing } from "../components/Charts";
import { LoadingSpinner, LoadingCard } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorHandling";
import useAppStore from "../store/useAppStore";
import { foodLogsAPI } from "../services/api";

const Dashboard = () => {
  const {
    foodLogs,
    dailyTotals,
    isLoading,
    error,
    setFoodLogs,
    setLoading,
    setError,
    calculateDailyTotals,
  } = useAppStore();

  // Daily goals (could be made configurable later)
  const goals = {
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const logs = await foodLogsAPI.getAll();
      setFoodLogs(logs);
      calculateDailyTotals();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const macroData = [
    {
      name: "Protein",
      value: dailyTotals.protein,
      color: "#ef4444",
      icon: <Utensils className="w-5 h-5" />,
      goal: goals.protein,
    },
    {
      name: "Carbs",
      value: dailyTotals.carbs,
      color: "#f59e0b",
      icon: <Zap className="w-5 h-5" />,
      goal: goals.carbs,
    },
    {
      name: "Fats",
      value: dailyTotals.fats,
      color: "#3b82f6",
      icon: <Target className="w-5 h-5" />,
      goal: goals.fats,
    },
  ];

  const calorieProgress = (dailyTotals.calories / goals.calories) * 100;

  if (isLoading && foodLogs.length === 0) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="space-y-6">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Today's Progress">
      {error && (
        <ErrorMessage
          error={error}
          onRetry={loadDashboardData}
          className="mb-6"
        />
      )}

      <div className="space-y-6">
        {/* Daily Calories - Main Focus */}
        <Card className="text-center">
          <ProgressRing
            progress={Math.min(calorieProgress, 100)}
            size={160}
            strokeWidth={12}
            value={dailyTotals.calories.toLocaleString()}
            max={goals.calories.toLocaleString()}
            label="Calories Today"
            className="mx-auto"
          />

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <TrendingUp size={16} />
            <span>
              {goals.calories - dailyTotals.calories > 0
                ? `${(
                    goals.calories - dailyTotals.calories
                  ).toLocaleString()} remaining`
                : `${(
                    dailyTotals.calories - goals.calories
                  ).toLocaleString()} over goal`}
            </span>
          </div>
        </Card>

        {/* Macronutrients Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Macronutrients</h2>
          <Grid cols={3} gap={4}>
            {macroData.map((macro) => {
              const progress = (macro.value / macro.goal) * 100;

              return (
                <Card key={macro.name} className="text-center" padding="sm">
                  <div
                    className="flex items-center justify-center mb-2"
                    style={{ color: macro.color }}
                  >
                    {macro.icon}
                  </div>

                  <div className="text-2xl font-bold mb-1">{macro.value}g</div>

                  <div className="text-xs text-gray-400 mb-2">{macro.name}</div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: macro.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    {Math.round(progress)}% of {macro.goal}g
                  </div>
                </Card>
              );
            })}
          </Grid>
        </div>

        {/* Macro Distribution Donut Chart */}
        {dailyTotals.protein + dailyTotals.carbs + dailyTotals.fats > 0 && (
          <Card>
            <h2 className="text-lg font-semibold mb-4">Macro Distribution</h2>
            <DonutChart
              data={[
                {
                  name: "Protein",
                  value: dailyTotals.protein,
                  color: "#ef4444",
                },
                { name: "Carbs", value: dailyTotals.carbs, color: "#f59e0b" },
                { name: "Fats", value: dailyTotals.fats, color: "#3b82f6" },
              ]}
              size={200}
              className="mx-auto"
            />
          </Card>
        )}

        {/* Recent Food Logs */}
        {foodLogs.length > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Foods</h2>
              <span className="text-sm text-gray-400">
                {foodLogs.length} item{foodLogs.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
              {foodLogs
                .slice(-5)
                .reverse()
                .map((log, index) => (
                  <motion.div
                    key={log.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-dark-900 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{log.food_name}</h3>
                      <p className="text-sm text-gray-400">
                        P: {log.protein}g • C: {log.carbs}g • F: {log.fats}g
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="font-semibold text-primary-400">
                        {log.calories} cal
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {foodLogs.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <Utensils className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-lg font-medium mb-2">No food logged yet</h3>
            <p className="text-gray-400 mb-6">
              Start tracking your nutrition by adding your first meal
            </p>
            <button className="btn-primary">Add Food</button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
