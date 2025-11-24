import { useEffect, useState } from "react";
import api from "../services/api";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    position: "",
    teamId: "",
  });

  const loadData = async () => {
    const [playerRes, teamRes] = await Promise.all([
      api.get("/players"),
      api.get("/teams"),
    ]);
    setPlayers(playerRes.data);
    setTeams(teamRes.data);
  };

  const createPlayer = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.teamId) return;
    await api.post("/players", form);
    setForm({
      firstName: "",
      lastName: "",
      number: "",
      position: "",
      teamId: "",
    });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Jugadores</h2>

      <form onSubmit={createPlayer} className="row g-2 mb-4">
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Nombre"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Apellido"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="N°"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Posición"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.teamId}
            onChange={(e) => setForm({ ...form, teamId: e.target.value })}
          >
            <option value="">Equipo...</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100">+</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead className="table-primary">
          <tr>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>N°</th>
            <th>Posición</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>
                {p.firstName} {p.lastName}
              </td>
              <td>{p.team?.name || "-"}</td>
              <td>{p.number || "-"}</td>
              <td>{p.position || "-"}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
