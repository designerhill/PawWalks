import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Walkers from "./pages/Walkers";
import Dogs from "./pages/Dogs";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import BecomeWalker from "./pages/BecomeWalker";
import SafetyStandards from "./pages/SafetyStandards";
import Insurance from "./pages/Insurance";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/walkers" element={<Walkers />} />
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/become-walker" element={<BecomeWalker />} />
            <Route path="/safety" element={<SafetyStandards />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/services" element={<Services />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
