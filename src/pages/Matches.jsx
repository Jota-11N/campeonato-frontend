import { useState, useEffect } from "react";
import api from "../services/api";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    tournamentId: "",
    date: "",
    venue: "",
    homeTeamId: "",
    awayTeamId: "",
  });

  const loadData = async () => {
    const [tRes, teamRes, mRes] = await Promise.all([
      api.get("/tournaments"),
      api.get("/teams"),
      api.get("/matches"),
    ]);
    setTournaments(tRes.data);
    setTeams(teamRes.data);
    setMatches(mRes.data);
  };

  const createMatch = async (e) => {
    e.preventDefault();
    if (!form.tournamentId || !form.homeTeamId || !form.awayTeamId) return;
    await api.post("/matches", form);
    setForm({ tournamentId: "", date: "", venue: "", homeTeamId: "", awayTeamId: "" });
    loadData();
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Partidos</h2>

      <form onSubmit={createMatch} className="row g-2 mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.tournamentId}
            onChange={(e) => setForm({ ...form, tournamentId: e.target.value })}
          >
            <option value="">Torneo...</option>
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Lugar"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={form.homeTeamId}
            onChange={(e) => setForm({ ...form, homeTeamId: e.target.value })}
          >
            <option value="">Local...</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={form.awayTeamId}
            onChange={(e) => setForm({ ...form, awayTeamId: e.target.value })}
          >
            <option value="">Visitante...</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100">+</button>
        </div>
      </form>

      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>Fecha</th>
            <th>Torneo</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Marcador</th>
            <th>Estado</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id}>
              <td>{new Date(m.date).toLocaleDateString()}</td>
              <td>{m.tournament?.name}</td>
              <td>{m.homeTeam?.name}</td>
              <td>{m.awayTeam?.name}</td>
              <td>{m.homeScore} - {m.awayScore}</td>
              <td>
                <span className={`badge badge-status ${m.status}`}>
                  {m.status}
                </span>
              </td>
              <td>{m.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
