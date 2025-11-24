import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Tournaments from "../pages/Tournaments";
import Teams from "../pages/Teams";
import TeamDetail from "../pages/TeamDetail";
import Players from "../pages/Players";
import Matches from "../pages/Matches";
import Standings from "../pages/Standings";

export default function RoutesApp() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Tournaments />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetail />} />
      <Route path="/players" element={<Players />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/standings" element={<Standings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
