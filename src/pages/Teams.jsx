import { useEffect, useState } from "react";
import api from "../services/api";
import "../custom.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    logo: "",
    tournamentId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const [teamsRes, tournamentsRes] = await Promise.all([
      api.get("/teams"),
      api.get("/tournaments"),
    ]);
    setTeams(teamsRes.data);
    setTournaments(tournamentsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tournamentId: form.tournamentId ? Number(form.tournamentId) : null,
    };
    try {
      if (editing) await api.put(`/teams/${editing.id}`, payload);
      else await api.post("/teams", payload);
      setShowModal(false);
      setEditing(null);
      setForm({ name: "", shortName: "", logo: "", tournamentId: "" });
      loadData();
    } catch (err) {
      alert("❌ Error al guardar el equipo");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este equipo?")) {
      await api.delete(`/teams/${id}`);
      loadData();
    }
  };

  return (
    <div className="teams-page">
      <div className="overlay">
        <div className="container py-5 text-white">
          <h1 className="fw-bold mb-4 text-center text-shadow">
            ⚽ Gestión de Equipos
          </h1>

          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-warning fw-bold"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", shortName: "", logo: "", tournamentId: "" });
                setShowModal(true);
              }}
            >
              ➕ Agregar Equipo
            </button>
          </div>

          <div className="table-responsive bg-dark bg-opacity-75 p-4 rounded-4 shadow-lg">
            <table className="table table-dark table-striped align-middle text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Nombre</th>
                  <th>Alias</th>
                  <th>Torneo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr key={t.id}>
                    <td>{i + 1}</td>
                    <td>
                      {t.logo ? (
                        <img
                          src={t.logo}
                          alt="logo"
                          width="50"
                          height="50"
                          className="rounded-circle border border-light"
                        />
                      ) : (
                        <span className="text-secondary">Sin logo</span>
                      )}
                    </td>
                    <td>{t.name}</td>
                    <td>{t.shortName || "—"}</td>
                    <td>{t.tournaments[0]?.tournament?.name || "—"}</td>
                    <td>
                      <button
                        className="btn btn-outline-info btn-sm me-2"
                        onClick={() => {
                          setEditing(t);
                          setForm({
                            name: t.name,
                            shortName: t.shortName || "",
                            logo: t.logo || "",
                            tournamentId:
                              t.tournaments[0]?.tournament?.id || "",
                          });
                          setShowModal(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(t.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {teams.length === 0 && (
              <div className="text-center text-muted mt-3">
                No hay equipos registrados.
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white border-warning">
              <div className="modal-header border-warning">
                <h5 className="modal-title">
                  {editing ? "Editar Equipo" : "Nuevo Equipo"}
                </h5>
                <button
                  type="button"
                  className="btn-close bg-light"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Alias</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.shortName}
                      onChange={(e) =>
                        setForm({ ...form, shortName: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Logo (URL)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.logo}
                      onChange={(e) => setForm({ ...form, logo: e.target.value })}
                      placeholder="https://ejemplo.com/logo.png"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Torneo</label>
                    <select
                      className="form-select"
                      value={form.tournamentId}
                      onChange={(e) =>
                        setForm({ ...form, tournamentId: e.target.value })
                      }
                    >
                      <option value="">— Sin torneo —</option>
                      {tournaments.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-warning">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning fw-bold">
                    💾 Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
