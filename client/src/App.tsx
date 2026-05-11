import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import PregnancyTracker from "./pages/PregnancyTracker";
import VaccinationTracker from "./pages/VaccinationTracker";
import NutritionTracker from "./pages/NutritionTracker";
import Timeline from "./pages/Timeline";
import CHWDashboard from "./pages/CHWDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pregnancy" component={PregnancyTracker} />
      <Route path="/vaccination" component={VaccinationTracker} />
      <Route path="/nutrition" component={NutritionTracker} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/chw" component={CHWDashboard} />
      <Route path="/settings" component={Settings} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
