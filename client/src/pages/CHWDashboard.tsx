import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { getCommunityData } from "@/data/chwSeedData";
import { DateUtils } from "@/lib/utils";
import { AlertCircle, CheckCircle, Users, Baby, Calendar, Zap, TrendingUp } from "lucide-react";

export default function CHWDashboard() {
  const { t } = useLanguage();
  const { mothers, children, metrics } = getCommunityData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case "moderate-risk":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "high-risk":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800";
      case "moderate-risk":
        return "bg-yellow-100 text-yellow-800";
      case "high-risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "stable":
        return <CheckCircle className="w-4 h-4" />;
      case "moderate-risk":
        return <AlertCircle className="w-4 h-4" />;
      case "high-risk":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "stable":
        return "Stable";
      case "moderate-risk":
        return "Moderate Risk";
      case "high-risk":
        return "High Risk";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t("chw.title")}
        </h1>
        <p className="text-slate-600 mb-8">
          Community health overview - {metrics.totalMothers} mothers, {metrics.totalChildren} children
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Mothers</p>
                <p className="text-3xl font-bold text-blue-600">
                  {metrics.totalMothers}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {metrics.prenatalCoverage}% prenatal coverage
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Children</p>
                <p className="text-3xl font-bold text-pink-600">
                  {metrics.totalChildren}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {metrics.vaccinationCompletion}% vaccinated
                </p>
              </div>
              <Baby className="w-8 h-8 text-pink-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Overdue Appointments</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {metrics.overdueAppointments}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Avg {metrics.averageMissedVisits.toFixed(1)} missed/mother
                </p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Missed Vaccinations</p>
                <p className="text-3xl font-bold text-red-600">
                  {metrics.missedVaccinations}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Requires follow-up
                </p>
              </div>
              <Zap className="w-8 h-8 text-red-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Health Status Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Health Status Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-slate-600 mb-2">Stable</p>
              <p className="text-3xl font-bold text-green-600 mb-1">
                {metrics.stableCases}
              </p>
              <p className="text-xs text-slate-600">
                {Math.round((metrics.stableCases / (metrics.stableCases + metrics.moderateRiskCases + metrics.highRiskCases)) * 100)}% of population
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-slate-600 mb-2">Moderate Risk</p>
              <p className="text-3xl font-bold text-yellow-600 mb-1">
                {metrics.moderateRiskCases}
              </p>
              <p className="text-xs text-slate-600">
                {Math.round((metrics.moderateRiskCases / (metrics.stableCases + metrics.moderateRiskCases + metrics.highRiskCases)) * 100)}% of population
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-slate-600 mb-2">High Risk</p>
              <p className="text-3xl font-bold text-red-600 mb-1">
                {metrics.highRiskCases}
              </p>
              <p className="text-xs text-slate-600">
                Requires immediate attention
              </p>
            </div>
          </div>
        </Card>

        {/* Mothers List */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pregnant Mothers ({mothers.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {mothers.map((mother) => (
              <div
                key={mother.id}
                className={`p-4 rounded-lg ${getStatusColor(mother.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{mother.name}</p>
                    <p className="text-sm text-slate-700">
                      Age {mother.age} | Week {mother.pregnancyWeek} | {mother.location}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      mother.status
                    )}`}
                  >
                    {getStatusIcon(mother.status)}
                    {getStatusLabel(mother.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-2">
                  <p>Last Visit: {DateUtils.formatDateShort(mother.lastVisit)}</p>
                  <p>Next Visit: {DateUtils.formatDateShort(mother.nextVisit)}</p>
                </div>
                {mother.riskFactors.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mother.riskFactors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                )}
                {mother.notes && (
                  <p className="text-xs italic text-slate-700 mt-2">{mother.notes}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Children List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Children ({children.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {children.map((child) => (
              <div
                key={child.id}
                className={`p-4 rounded-lg ${getStatusColor(child.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{child.name}</p>
                    <p className="text-sm text-slate-700">
                      Mother: {child.motherName} | Age: {child.ageInMonths} months
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      child.status
                    )}`}
                  >
                    {getStatusIcon(child.status)}
                    {getStatusLabel(child.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-2">
                  <p>Vaccination: {child.vaccinationStatus}</p>
                  <p>Last Checkup: {DateUtils.formatDateShort(child.lastCheckup)}</p>
                </div>
                {child.missedVaccines.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {child.missedVaccines.map((vaccine, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded"
                      >
                        {vaccine}
                      </span>
                    ))}
                  </div>
                )}
                {child.riskFactors.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {child.riskFactors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
