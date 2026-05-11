import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChild } from "@/hooks/useChild";
import { DateUtils } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

export default function NutritionTracker() {
  const { t } = useLanguage();
  const { children, loading, addNutritionLog } = useChild();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(
    children[0]?.id || null
  );
  const [showForm, setShowForm] = useState(false);
  const [mealDate, setMealDate] = useState(new Date().toISOString().split("T")[0]);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [mealDescription, setMealDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  const handleAddMeal = async () => {
    if (!selectedChildId || !mealDescription) return;
    try {
      await addNutritionLog(selectedChildId, {
        date: new Date(mealDate),
        meals: [
          {
            id: Date.now().toString(),
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
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const selectedChild = children.find((c) => c.id === selectedChildId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {t("nutrition.title")}
        </h1>

        {/* Child Selection */}
        {children.length > 0 && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedChildId === child.id
                    ? "bg-green-500 text-white"
                    : "bg-white text-slate-900 hover:shadow-md"
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        )}

        {selectedChild ? (
          <div className="space-y-6">
            {/* Add Meal Form */}
            <Card className="p-6">
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

            {/* Nutrition Logs */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t("nutrition.dailyIntake")}
              </h2>
              {selectedChild.nutritionLogs.length === 0 ? (
                <p className="text-slate-600 text-center py-8">
                  {t("message.noData")}
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedChild.nutritionLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 bg-slate-50 rounded-lg border-l-4 border-green-500"
                    >
                      <p className="font-semibold text-slate-900 mb-2">
                        {DateUtils.formatDate(log.date)}
                      </p>
                      <div className="space-y-2">
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
                        {log.waterIntake > 0 && (
                          <p className="text-sm text-blue-600">
                            💧 {log.waterIntake} {t("nutrition.cups")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Nutrition Tips */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {t("nutrition.insights")}
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li>• Eat a variety of colorful fruits and vegetables</li>
                <li>• Include protein at every meal</li>
                <li>• Drink plenty of water throughout the day</li>
                <li>• Limit sugary and processed foods</li>
                <li>• Eat regular, balanced meals</li>
              </ul>
            </Card>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-slate-600 mb-4">{t("message.noData")}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
