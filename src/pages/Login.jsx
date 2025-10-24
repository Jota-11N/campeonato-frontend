import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setErr(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h2 className="text-center text-primary mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Entrar
              </button>
              {err && <div className="alert alert-danger mt-3">{err}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
