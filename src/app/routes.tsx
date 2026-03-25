import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Reports } from "./pages/Reports";
import { Insights } from "./pages/Insights";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "reports", Component: Reports },
      { path: "insights", Component: Insights },
      { path: "settings", Component: Settings },
    ],
  },
]);
