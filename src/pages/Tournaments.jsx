import { useEffect, useState } from "react";
import api from "../services/api";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", season: "", location: "" });

  // 🔄 Cargar torneos
  const loadTournaments = async () => {
    const res = await api.get("/tournaments");
    setTournaments(res.data);
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  // 📝 Guardar o editar torneo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("El nombre del torneo es obligatorio");

    if (editing) {
      await api.put(`/tournaments/${editing.id}`, form);
    } else {
      await api.post("/tournaments", form);
    }

    setForm({ name: "", season: "", location: "" });
    setEditing(null);
    setShowModal(false);
    loadTournaments();
  };

  // 🗑️ Eliminar torneo
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este torneo?")) {
      await api.delete(`/tournaments/${id}`);
      loadTournaments();
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* 🏟️ Hero Section */}
      <div
        className="position-relative text-center text-white"
        style={{
          height: "60vh",
          backgroundImage: "url('/fondo-cancha.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        ></div>

        <div className="position-relative">
          <img
            src="logo-campeonato.png"
            alt="Logo"
            width="120"
            className="mb-3"
          />
          <h1 className="fw-bold">Campeonatos Deportivos UNAJMA</h1>
          <p className="lead">
            Organiza torneos, equipos y jugadores en un solo lugar
          </p>
          <a
            href="#resumen"
            className="btn btn-warning btn-lg fw-semibold mt-2"
          >
            🏆 Comenzar Campeonato
          </a>
        </div>
      </div>

      {/* 📊 Resumen */}
      <div id="resumen" className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Torneos Activos</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing(null);
              setForm({ name: "", season: "", location: "" });
              setShowModal(true);
            }}
          >
            ➕ Nuevo Torneo
          </button>
        </div>

        {tournaments.length === 0 ? (
          <div className="text-muted text-center">
            No hay torneos registrados.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Temporada</th>
                  <th>Ubicación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((t, i) => (
                  <tr key={t.id}>
                    <td>{i + 1}</td>
                    <td>{t.name}</td>
                    <td>{t.season || "N/A"}</td>
                    <td>{t.location || "Sin ubicación"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => {
                          setEditing(t);
                          setForm({
                            name: t.name,
                            season: t.season || "",
                            location: t.location || "",
                          });
                          setShowModal(true);
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(t.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🪟 Modal de Torneo */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editing ? "Editar Torneo" : "Nuevo Torneo"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Temporada</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.season}
                      onChange={(e) =>
                        setForm({ ...form, season: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ubicación</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
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
