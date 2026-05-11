import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePregnancy } from "@/hooks/usePregnancy";
import { DateUtils, PREGNANCY_MILESTONES, getPregnancyAdvice } from "@/lib/utils";
import { Calendar, Plus, Trash2 } from "lucide-react";

export default function PregnancyTracker() {
  const { t } = useLanguage();
  const { pregnancy, loading, createPregnancy, addAppointment, deleteAppointment } = usePregnancy();
  const [showForm, setShowForm] = useState(false);
  const [lmp, setLmp] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentType, setAppointmentType] = useState("checkup");
  const [appointmentNotes, setAppointmentNotes] = useState("");

  const handleCreatePregnancy = async () => {
    if (!lmp) return;
    try {
      await createPregnancy(new Date(lmp));
      setLmp("");
    } catch (error) {
      console.error("Failed to create pregnancy:", error);
    }
  };

  const handleAddAppointment = async () => {
    if (!pregnancy || !appointmentDate) return;
    try {
      await addAppointment({
        date: new Date(appointmentDate),
        type: appointmentType,
        notes: appointmentNotes,
        completed: false,
      });
      setAppointmentDate("");
      setAppointmentType("checkup");
      setAppointmentNotes("");
    } catch (error) {
      console.error("Failed to add appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!pregnancy ? (
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">
              {t("pregnancy.title")}
            </h1>
            <p className="text-slate-600 mb-6">
              {t("pregnancy.startDate")}
            </p>
            <div className="space-y-4">
              <input
                type="date"
                value={lmp}
                onChange={(e) => setLmp(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Button
                onClick={handleCreatePregnancy}
                className="w-full bg-rose-500 hover:bg-rose-600"
              >
                {t("pregnancy.calculateDueDate")}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
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

            {/* Pregnancy Advice */}
            <Card className="p-6 bg-amber-50 border-amber-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                {t("pregnancy.education")}
              </h2>
              <p className="text-slate-700">
                {getPregnancyAdvice(pregnancy.currentWeek)}
              </p>
            </Card>

            {/* Appointments Section */}
            <Card className="p-6">
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

              {pregnancy.appointments.length === 0 ? (
                <p className="text-slate-600 text-center py-8">
                  {t("message.noData")}
                </p>
              ) : (
                <div className="space-y-3">
                  {pregnancy.appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 bg-slate-50 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-rose-600" />
                          <p className="font-semibold text-slate-900">
                            {DateUtils.formatDate(apt.date)}
                          </p>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          Type: {apt.type}
                        </p>
                        {apt.notes && (
                          <p className="text-sm text-slate-600">{apt.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Milestones */}
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
          </div>
        )}
      </div>
    </div>
  );
}
