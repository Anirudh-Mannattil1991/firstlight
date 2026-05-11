import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChild } from "@/hooks/useChild";
import { DateUtils, VACCINATION_SCHEDULE, getVaccinationAdvice } from "@/lib/utils";
import { Plus, Trash2, Check } from "lucide-react";

export default function VaccinationTracker() {
  const { t } = useLanguage();
  const { children, loading, createChild, addVaccination, updateVaccination, deleteChild } = useChild();
  const [showChildForm, setShowChildForm] = useState(false);
  const [childName, setChildName] = useState("");
  const [childDOB, setChildDOB] = useState("");
  const [childGender, setChildGender] = useState<"male" | "female">("male");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [vaccineDate, setVaccineDate] = useState("");
  const [vaccineName, setVaccineName] = useState("");

  const handleCreateChild = async () => {
    if (!childName || !childDOB) return;
    try {
      await createChild(childName, new Date(childDOB), childGender);
      setChildName("");
      setChildDOB("");
      setShowChildForm(false);
    } catch (error) {
      console.error("Failed to create child:", error);
    }
  };

  const handleAddVaccine = async () => {
    if (!selectedChildId || !vaccineDate || !vaccineName) return;
    try {
      await addVaccination(selectedChildId, {
        vaccine: vaccineName,
        scheduledDate: new Date(vaccineDate),
        completedDate: new Date(vaccineDate),
        status: "completed",
      });
      setVaccineDate("");
      setVaccineName("");
      setShowVaccineForm(false);
    } catch (error) {
      console.error("Failed to add vaccine:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const selectedChild = children.find((c) => c.id === selectedChildId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {t("vaccination.title")}
        </h1>

        {/* Child Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`p-6 rounded-xl transition-all ${
                selectedChildId === child.id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              <p className="font-semibold text-lg">{child.name}</p>
              <p className="text-sm opacity-75">
                Age: {DateUtils.calculateAgeInMonths(child.dateOfBirth)} months
              </p>
            </button>
          ))}
          <button
            onClick={() => setShowChildForm(!showChildForm)}
            className="p-6 rounded-xl bg-white hover:shadow-md transition-all border-2 border-dashed border-slate-300 flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Add Child Form */}
        {showChildForm && (
          <Card className="p-6 mb-8 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t("vaccination.childName")}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder={t("vaccination.childName")}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
              <input
                type="date"
                value={childDOB}
                onChange={(e) => setChildDOB(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
              <select
                value={childGender}
                onChange={(e) => setChildGender(e.target.value as "male" | "female")}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateChild}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {t("common.save")}
                </Button>
                <Button
                  onClick={() => setShowChildForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Vaccination Records */}
        {selectedChild && (
          <div className="space-y-6">
            {/* Add Vaccine Form */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  {t("vaccination.vaccines")}
                </h2>
                <Button
                  onClick={() => setShowVaccineForm(!showVaccineForm)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("vaccination.addVaccine")}
                </Button>
              </div>

              {showVaccineForm && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg space-y-4">
                  <input
                    type="date"
                    value={vaccineDate}
                    onChange={(e) => setVaccineDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                  <select
                    value={vaccineName}
                    onChange={(e) => setVaccineName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select vaccine</option>
                    {VACCINATION_SCHEDULE.map((v) => (
                      <option key={v.vaccine} value={v.vaccine}>
                        {v.vaccine}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddVaccine}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      {t("common.save")}
                    </Button>
                    <Button
                      onClick={() => setShowVaccineForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      {t("common.cancel")}
                    </Button>
                  </div>
                </div>
              )}

              {selectedChild.vaccinations.length === 0 ? (
                <p className="text-slate-600 text-center py-8">
                  {t("message.noData")}
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedChild.vaccinations.map((vac) => (
                    <div
                      key={vac.id}
                      className="p-4 bg-slate-50 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-green-600" />
                          <p className="font-semibold text-slate-900">
                            {vac.vaccine}
                          </p>
                        </div>
                        <p className="text-sm text-slate-600">
                          {DateUtils.formatDate(vac.completedDate || vac.scheduledDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Vaccination Schedule */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t("vaccination.schedule")}
              </h2>
              <div className="space-y-2">
                {VACCINATION_SCHEDULE.map((schedule) => {
                  const isCompleted = selectedChild.vaccinations.some(
                    (v) => v.vaccine === schedule.vaccine
                  );
                  return (
                    <div
                      key={schedule.vaccine}
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        isCompleted
                          ? "bg-green-50 border border-green-200"
                          : "bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-slate-300"
                        }`}
                      >
                        {isCompleted && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {schedule.vaccine}
                        </p>
                        <p className="text-xs text-slate-600">
                          Age: {schedule.ageInMonths} months
                        </p>
                      </div>
                      {isCompleted && (
                        <span className="text-xs font-semibold text-green-600">
                          Completed
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
