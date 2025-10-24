import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top"
      style={{ background: "#1e3a8a" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white d-flex align-items-center" to="/">
          <img
            src="logo-campeonato.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2 rounded"
          />
          Campeonatos UNAJMA
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/tournaments">
                Torneos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Equipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/players">
                Jugadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/matches">
                Partidos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/standings">
                Tabla
              </NavLink>
            </li>
          </ul>
          <button onClick={logout} className="btn btn-outline-light">
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
