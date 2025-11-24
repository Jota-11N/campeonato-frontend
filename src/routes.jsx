import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Dashboard />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournaments"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Tournaments />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Teams />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/players"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Players />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Matches />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/standings"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Standings />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
