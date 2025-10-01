import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Utensils } from "lucide-react";
import { FormLayout, Card } from "../components/Layout";
import {
  Form,
  Input,
  NumberInput,
  FormSection,
  FormActions,
} from "../components/Form";
import { LoadingSpinner } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorHandling";
import useAppStore from "../store/useAppStore";
import { foodLogsAPI } from "../services/api";

const AddFood = () => {
  const navigate = useNavigate();
  const { addFoodLog, setError, calculateDailyTotals } = useAppStore();

  const [formData, setFormData] = useState({
    food_name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Food name validation
    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required";
    } else if (formData.food_name.trim().length < 2) {
      newErrors.food_name = "Food name must be at least 2 characters";
    }

    // Numeric field validation
    const numericFields = ["calories", "protein", "carbs", "fats"];
    numericFields.forEach((field) => {
      const value = parseFloat(formData[field]);
      if (!formData[field] || isNaN(value) || value < 0) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be a positive number`;
      } else if (value > 10000) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } seems too high`;
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear general error
    if (localError) {
      setLocalError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);

    try {
      const foodLog = {
        food_name: formData.food_name.trim(),
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein),
        carbs: parseInt(formData.carbs),
        fats: parseInt(formData.fats),
      };

      const createdLog = await foodLogsAPI.create(foodLog);
      addFoodLog(createdLog);
      calculateDailyTotals();

      // Success feedback and navigation
      navigate("/dashboard", {
        state: { message: "Food logged successfully!" },
      });
    } catch (error) {
      console.error("Error creating food log:", error);
      setLocalError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Quick add presets for common foods
  const quickPresets = [
    { name: "Banana (medium)", calories: 105, protein: 1, carbs: 27, fats: 0 },
    { name: "Apple (medium)", calories: 95, protein: 0, carbs: 25, fats: 0 },
    {
      name: "Chicken Breast (100g)",
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 4,
    },
    {
      name: "Greek Yogurt (1 cup)",
      calories: 130,
      protein: 23,
      carbs: 9,
      fats: 0,
    },
  ];

  const fillPreset = (preset) => {
    setFormData({
      food_name: preset.name,
      calories: preset.calories.toString(),
      protein: preset.protein.toString(),
      carbs: preset.carbs.toString(),
      fats: preset.fats.toString(),
    });
    setErrors({});
  };

  return (
    <FormLayout title="Add Food" onBack={handleBack}>
      {localError && (
        <ErrorMessage
          error={localError}
          onDismiss={() => setLocalError(null)}
        />
      )}

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <Utensils size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Log Your Food</h2>
            <p className="text-gray-400 text-sm">Track your nutrition intake</p>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <FormSection title="Food Information">
            <Input
              name="food_name"
              label="Food Name"
              placeholder="e.g., Grilled Chicken Breast"
              value={formData.food_name}
              onChange={handleInputChange}
              error={errors.food_name}
              required
              autoComplete="off"
              maxLength={100}
            />
          </FormSection>

          <FormSection title="Nutritional Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                name="calories"
                label="Calories"
                placeholder="0"
                value={formData.calories}
                onChange={handleInputChange}
                error={errors.calories}
                unit="kcal"
                min="0"
                max="10000"
                required
              />

              <NumberInput
                name="protein"
                label="Protein"
                placeholder="0"
                value={formData.protein}
                onChange={handleInputChange}
                error={errors.protein}
                unit="g"
                min="0"
                max="1000"
                required
              />

              <NumberInput
                name="carbs"
                label="Carbohydrates"
                placeholder="0"
                value={formData.carbs}
                onChange={handleInputChange}
                error={errors.carbs}
                unit="g"
                min="0"
                max="1000"
                required
              />

              <NumberInput
                name="fats"
                label="Fats"
                placeholder="0"
                value={formData.fats}
                onChange={handleInputChange}
                error={errors.fats}
                unit="g"
                min="0"
                max="1000"
                required
              />
            </div>
          </FormSection>

          <FormActions>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 sm:flex-none sm:min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Food
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary flex-1 sm:flex-none"
              disabled={isSubmitting}
            >
              <ArrowLeft size={18} className="mr-2" />
              Cancel
            </button>
          </FormActions>
        </Form>
      </Card>

      {/* Quick Presets */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Quick Add</h3>
        <p className="text-gray-400 text-sm mb-4">
          Tap to quickly fill in common foods
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickPresets.map((preset, index) => (
            <motion.button
              key={preset.name}
              type="button"
              onClick={() => fillPreset(preset)}
              whileTap={{ scale: 0.98 }}
              className="p-3 bg-dark-900 hover:bg-dark-700 rounded-xl text-left transition-colors"
              disabled={isSubmitting}
            >
              <div className="font-medium text-sm mb-1">{preset.name}</div>
              <div className="text-xs text-gray-400">
                {preset.calories} cal • P:{preset.protein}g • C:{preset.carbs}g
                • F:{preset.fats}g
              </div>
            </motion.button>
          ))}
        </div>
      </Card>
    </FormLayout>
  );
};

export default AddFood;
