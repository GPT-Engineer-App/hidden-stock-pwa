import { Home, BarChart } from "lucide-react";
import Index from "./pages/Index.jsx";
import Results from "./pages/Results.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Results",
    to: "/results/:stockName",
    icon: <BarChart className="h-4 w-4" />,
    page: <Results />,
  },
];