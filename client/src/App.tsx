import { RouterProvider } from "react-router-dom";
import { AppProviders } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { router } from "@/router";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProviders>
  );
}

export default App;
