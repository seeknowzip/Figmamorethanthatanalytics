import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Watchtower } from "./pages/Watchtower";
import { Games } from "./pages/Games";
import { Reports } from "./pages/Reports";
import { Insights } from "./pages/Insights";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "watchtower", Component: Watchtower },
      { path: "games", Component: Games },
      { path: "reports", Component: Reports },
      { path: "insights", Component: Insights },
      { path: "settings", Component: Settings },
    ],
  },
]);
