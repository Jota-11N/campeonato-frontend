import { useState, useEffect } from "react";
import api from "../services/api";

export default function Standings() {
  const [tournaments, setTournaments] = useState([]);
  const [selected, setSelected] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/tournaments");
      setTournaments(data);
    })();
  }, []);

  const loadStandings = async (id) => {
    const { data } = await api.get(`/tournaments/${id}/standings`);
    setRows(data);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Tabla de posiciones</h2>

      <select
        className="form-select mb-3"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          loadStandings(e.target.value);
        }}
      >
        <option value="">Selecciona un torneo...</option>
        {tournaments.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      {rows.length > 0 && (
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.teamId}>
                <td className="fw-semibold">{r.teamName}</td>
                <td>{r.pj}</td>
                <td>{r.pg}</td>
                <td>{r.pe}</td>
                <td>{r.pp}</td>
                <td>{r.gf}</td>
                <td>{r.gc}</td>
                <td>{r.dg}</td>
                <td className="fw-bold text-primary">{r.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
