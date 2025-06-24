
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import ThemeWrapper from "./components/ThemeWrapper";
import HomeScreen from "./pages/HomeScreen";
import ResultScreen from "./pages/ResultScreen";
import LibraryScreen from "./pages/LibraryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ScoreViewScreen from "./pages/ScoreViewScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <ThemeWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/result" element={<ResultScreen />} />
              <Route path="/library" element={<LibraryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/score" element={<ScoreViewScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeWrapper>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
