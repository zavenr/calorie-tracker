import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Main app store for global state management
const useAppStore = create(
  devtools(
    (set, get) => ({
      // Food logs state
      foodLogs: [],
      setFoodLogs: (logs) => set({ foodLogs: logs }),
      addFoodLog: (log) =>
        set((state) => ({ foodLogs: [...state.foodLogs, log] })),

      // Daily totals
      dailyTotals: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      },
      setDailyTotals: (totals) => set({ dailyTotals: totals }),

      // Loading states
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      // Error handling
      error: null,
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Mobile UI state
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      // Calculate daily totals from food logs
      calculateDailyTotals: () => {
        const { foodLogs } = get();
        const today = new Date().toISOString().split("T")[0];

        const todayLogs = foodLogs.filter(
          (log) => log.date && log.date.startsWith(today)
        );

        const totals = todayLogs.reduce(
          (acc, log) => ({
            calories: acc.calories + (log.calories || 0),
            protein: acc.protein + (log.protein || 0),
            carbs: acc.carbs + (log.carbs || 0),
            fats: acc.fats + (log.fats || 0),
          }),
          { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );

        set({ dailyTotals: totals });
        return totals;
      },
    }),
    {
      name: "calorie-tracker-store",
    }
  )
);

export default useAppStore;
