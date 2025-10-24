import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

console.log("🧩 TeamDetail se montó correctamente");

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    position: "",
  });

  // 🔹 Cargar equipo con jugadores
  const loadTeam = async () => {
    try {
      const { data } = await api.get(`/teams/${id}/players`);
      console.log("✅ Equipo cargado:", data);
      setTeam(data);
      setPlayers(data.players || []);
    } catch (error) {
      console.error("❌ Error cargando equipo:", error);
    }
  };

  // 🔹 Agregar jugador al equipo
  const addPlayer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/players", { ...form, teamId: id });
      setForm({ firstName: "", lastName: "", number: "", position: "" });
      loadTeam(); // recargar jugadores
    } catch (error) {
      console.error("❌ Error agregando jugador:", error);
    }
  };

  useEffect(() => {
    loadTeam();
  }, [id]);

  // 🔹 Mostrar mensaje de carga
  if (!team) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando equipo...</p>
      </div>
    );
  }

  // 🔹 Render principal
  return (
    <div className="container py-4">
      <button
        className="btn btn-link text-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <h2 className="mb-1">{team.name}</h2>
      <p className="text-muted mb-4">Abreviatura: {team.shortName || "N/A"}</p>

      <h4 className="mb-3">Jugadores</h4>

      <form onSubmit={addPlayer} className="row g-2 mb-4">
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
            className="form-control"
            placeholder="N°"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Posición"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100">+</button>
        </div>
      </form>

      {players.length === 0 ? (
        <div className="alert alert-secondary">No hay jugadores registrados.</div>
      ) : (
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
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
                <td>{p.number || "-"}</td>
                <td>{p.position || "-"}</td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
