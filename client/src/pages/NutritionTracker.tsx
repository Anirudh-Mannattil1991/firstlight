import { useState } from "react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppData } from "@/contexts/AppDataContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateUtils } from "@/lib/utils";
import { Plus, TrendingUp, Droplet } from "lucide-react";

export default function NutritionTracker() {
  const { t } = useLanguage();
  const { state, addNutritionLog } = useAppData();
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [mealDate, setMealDate] = useState(new Date().toISOString().split("T")[0]);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [mealDescription, setMealDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  // Set initial child on load
  React.useEffect(() => {
    if (state.children.length > 0 && !selectedChildId) {
      setSelectedChildId(state.children[0].id);
    }
  }, [state.children, selectedChildId]);

  const selectedChild = state.children.find((c) => c.id === selectedChildId);
  const logs = selectedChild?.nutritionLogs || [];

  const handleAddMeal = async () => {
    if (!mealDescription || !selectedChildId) return;
    addNutritionLog(selectedChildId, {
      date: new Date(mealDate),
      meals: [
        {
          type: mealType,
          description: mealDescription,
          calories: calories ? parseInt(calories) : undefined,
        },
      ],
      waterIntake: waterIntake ? parseInt(waterIntake) : 0,
    });
    setMealDescription("");
    setCalories("");
    setWaterIntake("");
    setShowForm(false);
  };

  const calculateAverageCalories = () => {
    const allCalories = logs.flatMap((log) =>
      log.meals.map((m) => m.calories || 0)
    );
    if (allCalories.length === 0) return 0;
    return Math.round(
      allCalories.reduce((a, b) => a + b, 0) / allCalories.length
    );
  };

  const calculateTotalWater = () => {
    return logs.reduce((sum, log) => sum + log.waterIntake, 0);
  };

  const calculateAverageWater = () => {
    if (logs.length === 0) return 0;
    return Math.round(calculateTotalWater() / logs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t("nutrition.title")}
        </h1>
        <p className="text-slate-600 mb-8">
          Track nutrition and hydration across different pregnancy contexts
        </p>

        {/* Child Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {state.children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`p-4 rounded-xl transition-all text-left ${
                selectedChildId === child.id
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md border border-slate-200"
              }`}
            >
              <p className="font-semibold">{child.name}</p>
              <p className="text-sm opacity-75">{child.nutritionLogs.length} log entries</p>
            </button>
          ))}
        </div>

        {/* Nutrition Statistics */}
        {selectedChild && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Calories/Meal</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {calculateAverageCalories()}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {logs.length} meals tracked
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Water/Day</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {calculateAverageWater()}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">cups per day</p>
                </div>
                <Droplet className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Entries</p>
                  <p className="text-3xl font-bold text-green-600">
                    {logs.length}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {logs.length > 0
                      ? `${Math.round((logs.length / 30) * 100)}% of month`
                      : "Start tracking"}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </Card>
          </div>
        )}

        {/* Add Meal Form */}
        {selectedChild && (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("nutrition.addMeal")}
              </h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("nutrition.addMeal")}
              </Button>
            </div>

            {showForm && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg space-y-4">
                <input
                  type="date"
                  value={mealDate}
                  onChange={(e) => setMealDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
                <select
                  value={mealType}
                  onChange={(e) =>
                    setMealType(e.target.value as "breakfast" | "lunch" | "dinner" | "snack")
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="breakfast">{t("nutrition.breakfast")}</option>
                  <option value="lunch">{t("nutrition.lunch")}</option>
                  <option value="dinner">{t("nutrition.dinner")}</option>
                  <option value="snack">{t("nutrition.snack")}</option>
                </select>
                <textarea
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  placeholder={t("nutrition.mealDescription")}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder={t("nutrition.calories")}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="number"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(e.target.value)}
                    placeholder={`${t("nutrition.water")} (${t("nutrition.cups")})`}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddMeal}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    {t("common.save")}
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Nutrition Logs */}
        {selectedChild && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t("nutrition.dailyIntake")}
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-slate-50 rounded-lg border-l-4 border-green-500"
                  >
                    <p className="font-semibold text-slate-900 mb-2">
                      {DateUtils.formatDate(log.date)}
                    </p>
                    <div className="space-y-2 mb-2">
                      {log.meals.map((meal) => (
                        <div
                          key={meal.id}
                          className="text-sm text-slate-700 bg-white p-2 rounded"
                        >
                          <p className="font-medium capitalize">
                            {meal.type}: {meal.description}
                          </p>
                          {meal.calories && (
                            <p className="text-xs text-slate-600">
                              {meal.calories} {t("nutrition.calories")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {log.waterIntake > 0 && (
                      <p className="text-sm text-blue-600 font-medium">
                        💧 {log.waterIntake} {t("nutrition.cups")}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-600 text-center py-4">No nutrition logs yet</p>
              )}
            </div>
          </Card>
        )}

        {/* Nutrition Tips */}
        {selectedChild && (
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t("nutrition.insights")}
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li>• Eat a variety of colorful fruits and vegetables daily</li>
              <li>• Include protein at every meal (eggs, fish, beans, meat)</li>
              <li>• Drink at least 8-10 cups of water throughout the day</li>
              <li>• Limit sugary and processed foods</li>
              <li>• Eat regular, balanced meals and healthy snacks</li>
              <li>• Take prenatal vitamins and iron supplements as prescribed</li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
