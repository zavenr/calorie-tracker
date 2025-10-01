import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart3, Plus, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Layout, Card, Grid } from "../components/Layout";
import useAppStore from "../store/useAppStore";

const Home = () => {
  const navigate = useNavigate();
  const { dailyTotals, foodLogs } = useAppStore();

  const quickActions = [
    {
      title: "Add Food",
      description: "Log your meals quickly",
      icon: <Plus className="w-6 h-6" />,
      action: () => navigate("/add"),
      color: "bg-primary-600",
      hoverColor: "hover:bg-primary-700",
    },
    {
      title: "View Stats",
      description: "Check your progress",
      icon: <BarChart3 className="w-6 h-6" />,
      action: () => navigate("/dashboard"),
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
    },
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary-400" />,
      title: "Track Goals",
      description: "Set and achieve your daily nutrition targets",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Monitor Progress",
      description: "Visualize your health journey with detailed analytics",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Quick Logging",
      description: "Add meals in seconds with our streamlined interface",
    },
  ];

  const todayStats = [
    {
      label: "Calories",
      value: dailyTotals.calories,
      unit: "kcal",
      color: "text-primary-400",
    },
    {
      label: "Protein",
      value: dailyTotals.protein,
      unit: "g",
      color: "text-red-400",
    },
    {
      label: "Foods Logged",
      value: foodLogs.length,
      unit: "items",
      color: "text-green-400",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 sm:py-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Welcome to <span className="text-primary-500">CalorieTracker</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Your personal nutrition companion for a healthier lifestyle. Track,
            analyze, and achieve your fitness goals with ease.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <Grid cols={2} gap={4}>
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`
                  ${action.color} ${action.hoverColor}
                  p-6 rounded-2xl text-left transition-all duration-200 
                  active:scale-95 touch-manipulation shadow-lg
                  hover:shadow-xl transform hover:-translate-y-1
                `}
              >
                <div className="flex items-center gap-3 mb-3">
                  {action.icon}
                  <h3 className="font-semibold text-white text-lg">
                    {action.title}
                  </h3>
                </div>
                <p className="text-white/80 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </Grid>
        </div>

        {/* Today's Summary */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
          <Grid cols={3} gap={4}>
            {todayStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}
                >
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mb-1">{stat.unit}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </Grid>
        </Card>

        {/* Features Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center">
            Why Choose CalorieTracker?
          </h2>
          <Grid cols={1} gap={6} className="sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </Grid>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 border-primary-500">
            <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
            <p className="text-primary-100 mb-6">
              Begin your health journey today by logging your first meal
            </p>
            <button
              onClick={() => navigate("/add")}
              className="btn bg-white text-primary-700 hover:bg-gray-100 font-semibold"
            >
              Add Your First Food
            </button>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
