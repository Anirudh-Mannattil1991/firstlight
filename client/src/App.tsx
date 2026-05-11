import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppDataProvider } from "./contexts/AppDataContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import PregnancyTracker from "./pages/PregnancyTracker";
import VaccinationTracker from "./pages/VaccinationTracker";
import NutritionTracker from "./pages/NutritionTracker";
import Timeline from "./pages/Timeline";
import CHWDashboard from "./pages/CHWDashboard";
import Settings from "./pages/Settings";

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
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AppDataProvider>
        <LanguageProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AppDataProvider>
    </ErrorBoundary>
  );
}

export default App;
