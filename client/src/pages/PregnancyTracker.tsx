import { useState } from "react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppData } from "@/contexts/AppDataContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateUtils, PREGNANCY_MILESTONES, getPregnancyAdvice } from "@/lib/utils";
import { Calendar, Plus, ChevronRight } from "lucide-react";

export default function PregnancyTracker() {
  const { t } = useLanguage();
  const { state, addAppointment } = useAppData();
  const [selectedPregnancyId, setSelectedPregnancyId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentType, setAppointmentType] = useState("checkup");
  const [appointmentNotes, setAppointmentNotes] = useState("");

  // Set initial pregnancy on load
  React.useEffect(() => {
    if (state.pregnancies.length > 0 && !selectedPregnancyId) {
      setSelectedPregnancyId(state.pregnancies[0].id);
    }
  }, [state.pregnancies, selectedPregnancyId]);

  const pregnancy = state.pregnancies.find((p) => p.id === selectedPregnancyId);

  const handleAddAppointment = async () => {
    if (!appointmentDate || !selectedPregnancyId) return;
    addAppointment(selectedPregnancyId, {
      date: new Date(appointmentDate),
      type: appointmentType,
      notes: appointmentNotes,
      completed: false,
    });
    setAppointmentDate("");
    setAppointmentType("checkup");
    setAppointmentNotes("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {t("pregnancy.title")}
          </h1>
          <p className="text-slate-600">
            Explore realistic pregnancy journeys across different contexts
          </p>
        </div>

        {/* Pregnancy Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {state.pregnancies.map((preg) => (
            <button
              key={preg.id}
              onClick={() => setSelectedPregnancyId(preg.id)}
              className={`p-4 rounded-xl transition-all text-left ${
                selectedPregnancyId === preg.id
                  ? "bg-rose-500 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md border border-slate-200"
              }`}
            >
              <p className="font-semibold">Pregnancy {state.pregnancies.indexOf(preg) + 1}</p>
              <p className="text-sm opacity-75">
                {preg.currentWeek} weeks
              </p>
            </button>
          ))}
        </div>

        {/* Header Stats */}
        {pregnancy && (
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {t("pregnancy.title")}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-rose-50 rounded-xl">
                <p className="text-sm text-slate-600">{t("pregnancy.week")}</p>
                <p className="text-2xl font-bold text-rose-600">
                  {pregnancy.currentWeek}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-slate-600">{t("pregnancy.trimester")}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {DateUtils.calculateTrimester(pregnancy.currentWeek)}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-slate-600">{t("pregnancy.dueDate")}</p>
                <p className="text-lg font-bold text-green-600">
                  {DateUtils.formatDateShort(pregnancy.dueDate)}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-slate-600">Days Until Due</p>
                <p className="text-2xl font-bold text-purple-600">
                  {DateUtils.calculateDaysUntil(pregnancy.dueDate)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pregnancy Advice */}
        {pregnancy && (
          <Card className="p-6 bg-amber-50 border-amber-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              {t("pregnancy.education")}
            </h2>
            <p className="text-slate-700">
              {getPregnancyAdvice(pregnancy.currentWeek)}
            </p>
          </Card>
        )}

        {/* Measurements Trend */}
        {pregnancy && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Health Measurements
            </h2>
            <div className="space-y-3">
              {pregnancy.measurements.length > 0 ? (
                pregnancy.measurements.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-4 bg-slate-50 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {DateUtils.formatDate(m.date)}
                      </p>
                      <p className="text-sm text-slate-600">
                        Weight: {m.weight}kg | BP: {m.bloodPressure}
                      </p>
                      {m.notes && (
                        <p className="text-xs text-slate-500 mt-1 italic">{m.notes}</p>
                      )}
                    </div>
                    {idx === pregnancy.measurements.length - 1 && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-600 text-center py-4">No measurements recorded yet</p>
              )}
            </div>
          </Card>
        )}

        {/* Appointments Section */}
        {pregnancy && (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("pregnancy.appointments")}
              </h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                size="sm"
                className="bg-rose-500 hover:bg-rose-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("pregnancy.addAppointment")}
              </Button>
            </div>

            {showForm && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg space-y-4">
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="checkup">Checkup</option>
                  <option value="ultrasound">Ultrasound</option>
                  <option value="lab">Lab Test</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                  placeholder={t("pregnancy.notes")}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddAppointment}
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
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

            <div className="space-y-3">
              {pregnancy.appointments.length > 0 ? (
                pregnancy.appointments.map((apt) => (
              <div
                key={apt.id}
                className={`p-4 rounded-lg flex justify-between items-start ${
                  apt.completed
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-yellow-50 border-l-4 border-yellow-500"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-rose-600" />
                    <p className="font-semibold text-slate-900">
                      {DateUtils.formatDate(apt.date)}
                    </p>
                    <span className="text-xs font-medium px-2 py-1 bg-white rounded">
                      {apt.type === "initial_checkup"
                        ? "Initial"
                        : apt.type === "missed"
                        ? "Missed"
                        : apt.type}
                    </span>
                  </div>
                  {apt.notes && (
                    <p className="text-sm text-slate-700 mt-2">{apt.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {apt.completed && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                      Completed
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                </div>
              ))
              ) : (
                <p className="text-slate-600 text-center py-4">No appointments scheduled yet</p>
              )}
            </div>
          </Card>
        )}

        {/* Milestones */}
        {pregnancy && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t("pregnancy.milestone")}
            </h2>
            <div className="space-y-3">
              {PREGNANCY_MILESTONES.filter((m) => m.week <= pregnancy.currentWeek).map(
                (milestone) => (
                  <div
                    key={milestone.week}
                    className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border-l-4 border-rose-500"
                  >
                    <p className="font-semibold text-slate-900">
                      {milestone.title} (Week {milestone.week})
                    </p>
                    <p className="text-sm text-slate-600">
                      {milestone.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
