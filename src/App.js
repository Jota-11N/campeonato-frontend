import React from "react";
import Navbar from "./components/Navbar";
import RoutesApp from "./routes";
import "./custom.css";

export default function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/fondo-cancha.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main className="bg-light bg-opacity-75 py-3">
        <RoutesApp />
      </main>
    </div>
  );
}
