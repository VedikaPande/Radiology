import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import BrowseCases from "@/pages/BrowseCases";
import ImageAnalysis from "@/pages/ImageAnalysis";
import RadiologyQuestions from "@/pages/RadiologyQuestions";
import Flashcards from "@/pages/Flashcards";
import Notes from "@/pages/Notes";
import Analytics from "@/pages/Analytics";
import Notifications from "@/pages/Notifications";
import SettingsPage from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "browse-cases",
        element: <BrowseCases />,
      },
      {
        path: "image-analysis",
        element: <ImageAnalysis />,
      },
      {
        path: "radiology-questions",
        element: <RadiologyQuestions />,
      },
      {
        path: "flashcards",
        element: <Flashcards />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
