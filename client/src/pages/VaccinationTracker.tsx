import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateUtils, VACCINATION_SCHEDULE } from "@/lib/utils";
import { childUserA } from "@/data/seedData";
import { Plus, Check, Clock, AlertCircle } from "lucide-react";

export default function VaccinationTracker() {
  const { t } = useLanguage();
  const [showChildForm, setShowChildForm] = useState(false);
  const [childName, setChildName] = useState("");
  const [childDOB, setChildDOB] = useState("");
  const [childGender, setChildGender] = useState<"male" | "female">("male");
  const [selectedChildId, setSelectedChildId] = useState<string>(childUserA.id);
  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [vaccineDate, setVaccineDate] = useState("");
  const [vaccineName, setVaccineName] = useState("");

  const handleCreateChild = async () => {
    if (!childName || !childDOB) return;
    setChildName("");
    setChildDOB("");
    setShowChildForm(false);
  };

  const handleAddVaccine = async () => {
    if (!vaccineDate || !vaccineName) return;
    setVaccineDate("");
    setVaccineName("");
    setShowVaccineForm(false);
  };

  const selectedChild = childUserA;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {t("vaccination.title")}
        </h1>

        {/* Child Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setSelectedChildId(childUserA.id)}
            className={`p-6 rounded-xl transition-all ${
              selectedChildId === childUserA.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-slate-900 hover:shadow-md"
            }`}
          >
            <p className="font-semibold text-lg">{childUserA.name}</p>
            <p className="text-sm opacity-75">
              Age: {DateUtils.calculateAgeInMonths(childUserA.dateOfBirth)} months
            </p>
            <p className="text-xs opacity-75 mt-1">
              DOB: {DateUtils.formatDateShort(childUserA.dateOfBirth)}
            </p>
          </button>
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

              <div className="space-y-3">
                {selectedChild.vaccinations.map((vac) => (
                  <div
                    key={vac.id}
                    className={`p-4 rounded-lg flex justify-between items-start ${
                      vac.status === "completed"
                        ? "bg-green-50 border-l-4 border-green-500"
                        : "bg-yellow-50 border-l-4 border-yellow-500"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {vac.status === "completed" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                        <p className="font-semibold text-slate-900">
                          {vac.vaccine}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600">
                        {DateUtils.formatDate(vac.completedDate || vac.scheduledDate)}
                      </p>
                      {vac.location && (
                        <p className="text-xs text-slate-600 mt-1">
                          Location: {vac.location}
                        </p>
                      )}
                      {vac.notes && (
                        <p className="text-xs text-slate-700 italic mt-1">
                          {vac.notes}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        vac.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {vac.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
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
                  const isUpcoming =
                    schedule.ageInMonths >
                    DateUtils.calculateAgeInMonths(selectedChild.dateOfBirth);
                  return (
                    <div
                      key={schedule.vaccine}
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        isCompleted
                          ? "bg-green-50 border border-green-200"
                          : isUpcoming
                          ? "bg-slate-50 border border-slate-200"
                          : "bg-yellow-50 border border-yellow-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isUpcoming
                            ? "bg-slate-300"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {isCompleted && <Check className="w-3 h-3" />}
                        {!isCompleted && !isUpcoming && (
                          <AlertCircle className="w-3 h-3" />
                        )}
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
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                          Completed
                        </span>
                      )}
                      {!isCompleted && !isUpcoming && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          Overdue
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          Upcoming
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Vaccination Summary */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Vaccination Summary
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {selectedChild.vaccinations.length}
                  </p>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {VACCINATION_SCHEDULE.filter(
                      (s) =>
                        s.ageInMonths <=
                          DateUtils.calculateAgeInMonths(
                            selectedChild.dateOfBirth
                          ) &&
                        !selectedChild.vaccinations.some(
                          (v) => v.vaccine === s.vaccine
                        )
                    ).length}
                  </p>
                  <p className="text-sm text-slate-600">Overdue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (selectedChild.vaccinations.length /
                        VACCINATION_SCHEDULE.length) *
                        100
                    )}
                    %
                  </p>
                  <p className="text-sm text-slate-600">Complete</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
