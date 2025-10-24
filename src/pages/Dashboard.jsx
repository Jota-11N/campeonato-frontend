import React from "react";

export default function Dashboard() {
  const features = [
    {
      title: "Torneos",
      desc: "Crea, programa y visualiza llaves y fases de tu campeonato.",
      img: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Equipos",
      desc: "Registra equipos, uniformes y delegados. Mantén sus plantillas al día.",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Jugadores",
      desc: "Ficha jugadores, controla carnés y sanciones en tiempo real.",
      img: "https://images.unsplash.com/photo-1521417531039-6949f3f9f2b5?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Partidos",
      desc: "Agenda canchas, árbitros y resultados con estadísticas.",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="dash-root">
      {/* Estilos en el mismo archivo */}
      <style>{css}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="badge">v1.0 · MVP</span>
          <h1>
            Panel Principal
            <span className="sparkle" aria-hidden> ✦</span>
          </h1>
          <p className="subtitle">
            Bienvenido al sistema de organización de campeonatos deportivos.
            Administra torneos, equipos, jugadores y partidos desde un solo lugar.
          </p>
          <div className="cta-row">
            <a href="/torneos" className="btn btn-primary">Crear torneo</a>
            <a href="/partidos" className="btn btn-ghost">Ver próximos partidos</a>
          </div>
          <div className="hero-stats" role="list">
            <div className="stat" role="listitem">
              <div className="stat-number">12</div>
              <div className="stat-label">Torneos activos</div>
            </div>
            <div className="stat" role="listitem">
              <div className="stat-number">48</div>
              <div className="stat-label">Equipos</div>
            </div>
            <div className="stat" role="listitem">
              <div className="stat-number">326</div>
              <div className="stat-label">Jugadores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de features */}
      <section className="grid">
        {features.map((f) => (
          <article key={f.title} className="card">
            <div className="card-media">
              <img src={f.img} alt={f.title} loading="lazy" />
              <div className="card-gradient" />
              <h3 className="card-title">{f.title}</h3>
            </div>
            <div className="card-body">
              <p>{f.desc}</p>
              <div className="card-actions">
                <a href={`/${f.title.toLowerCase()}`} className="link">
                  Administrar {arrowIcon}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Sección rápida */}
      <section className="quick">
        <h2>Acciones rápidas</h2>
        <div className="quick-row">
          <a href="/equipos/nuevo" className="quick-item">
            {plusIcon}
            <span>Nuevo equipo</span>
          </a>
          <a href="/jugadores/nuevo" className="quick-item">
            {plusIcon}
            <span>Nuevo jugador</span>
          </a>
          <a href="/partidos/programar" className="quick-item">
            {calendarIcon}
            <span>Programar partido</span>
          </a>
          <a href="/reportes" className="quick-item">
            {chartIcon}
            <span>Ver reportes</span>
          </a>
        </div>
      </section>

      <footer className="foot">
        <small>© {new Date().getFullYear()} Campeonatos · Hecho con pasión por el deporte.</small>
      </footer>
    </div>
  );
}

/* ---------- SVG ICONS (inline) ---------- */
const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M13 5l7 7-7 7M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const plusIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const calendarIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const chartIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M3 3v18h18" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 15v3M11 11v7M15 7v11M19 9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* ---------- CSS EN EL MISMO ARCHIVO ---------- */
const css = `
:root{
  --bg:#0b1220;
  --card:#0f172a;
  --muted:#94a3b8;
  --text:#e6edf6;
  --brand:#6ee7ff;
  --brand-2:#7c3aed;
  --glow: 0 10px 35px rgba(124, 58, 237, .25);
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:radial-gradient(1200px 500px at 20% -10%, #16233e 0%, #0b1220 60%, #0b1220 100%) fixed;color:var(--text);font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial}
a{color:inherit;text-decoration:none}
.dash-root{display:flex;flex-direction:column;gap:42px}

/* Hero */
.hero{position:relative;isolation:isolate;min-height:56vh;border-bottom:1px solid rgba(148,163,184,.12);background:url('https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat}
.hero-overlay{position:absolute;inset:0;background:
  radial-gradient(800px 220px at 20% 10%, rgba(124,58,237,.35), transparent 60%),
  linear-gradient(180deg, rgba(11,18,32,.50), rgba(11,18,32,.85) 50%, rgba(11,18,32,.95))}
.hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:72px 24px 40px}
.badge{display:inline-block;letter-spacing:.2px;background:rgba(148,163,184,.16);border:1px solid rgba(148,163,184,.25);padding:6px 10px;border-radius:999px;font-size:12px;color:#cbd5e1;backdrop-filter:blur(4px)}
.hero h1{font-size:clamp(28px, 4vw, 44px);margin:14px 0 10px;line-height:1.1;
  background:linear-gradient(90deg, #fff, #a5b4fc 35%, #6ee7ff 70%, #f0abfc);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  text-shadow:0 0 30px rgba(126, 34, 206, .15)}
.sparkle{filter:drop-shadow(0 0 10px rgba(110,231,255,.5))}
.subtitle{max-width:820px;color:var(--muted);font-size:clamp(14px, 1.6vw, 18px);line-height:1.6}
.cta-row{display:flex;gap:12px;margin:20px 0 6px;flex-wrap:wrap}
.btn{display:inline-flex;gap:8px;align-items:center;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.1);transition:.2s transform, .2s box-shadow, .2s background}
.btn:active{transform:translateY(1px)}
.btn-primary{background:linear-gradient(135deg, var(--brand-2), #2dd4bf); box-shadow:var(--glow)}
.btn-primary:hover{filter:saturate(1.1) brightness(1.05)}
.btn-ghost{background:rgba(148,163,184,.12)}
.btn-ghost:hover{background:rgba(148,163,184,.18)}

.hero-stats{display:flex;gap:18px;margin-top:24px;flex-wrap:wrap}
.stat{background:rgba(15,23,42,.65);border:1px solid rgba(148,163,184,.18);backdrop-filter:blur(6px);padding:14px 16px;border-radius:14px;min-width:150px}
.stat-number{font-weight:700;font-size:22px}
.stat-label{font-size:12px;color:var(--muted)}

/* Grid de features */
.grid{max-width:1100px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(12, 1fr);gap:18px}
.card{grid-column:span 12;background:var(--card);border:1px solid rgba(148,163,184,.16);border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(2,6,23,.4);transition:.25s transform,.25s box-shadow}
.card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(2,6,23,.6)}
.card-media{position:relative;height:180px;overflow:hidden}
.card-media img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform .4s ease}
.card:hover .card-media img{transform:scale(1.07)}
.card-gradient{position:absolute;inset:auto 0 0; height:60%; background:linear-gradient(180deg, transparent, rgba(15,23,42,.92))}
.card-title{position:absolute;left:14px;bottom:12px;font-size:20px;font-weight:700;text-shadow:0 6px 24px rgba(0,0,0,.45)}
.card-body{padding:14px}
.card-body p{margin:0 0 8px;color:#cbd5e1}
.card-actions{display:flex;justify-content:flex-end}
.link{display:inline-flex;gap:8px;align-items:center;padding:8px 10px;border-radius:10px;color:#dbeafe;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);transition:.2s background}
.link:hover{background:rgba(59,130,246,.18)}

/* Quick actions */
.quick{max-width:1100px;margin:0 auto;padding:0 24px}
.quick h2{font-size:clamp(20px, 2.6vw, 28px);margin:0 0 10px}
.quick-row{display:flex;gap:12px;flex-wrap:wrap}
.quick-item{display:flex;gap:8px;align-items:center;background:rgba(148,163,184,.12);border:1px solid rgba(148,163,184,.18);padding:10px 12px;border-radius:12px;transition:.2s transform, .2s background}
.quick-item:hover{transform:translateY(-2px);background:rgba(148,163,184,.16)}

/* Footer */
.foot{padding:8px 24px 24px;color:var(--muted);text-align:center}

/* Responsive */
@media (min-width: 720px){
  .card{grid-column:span 6}
}
@media (min-width: 1024px){
  .card{grid-column:span 3}
  .card-media{height:160px}
}
`;
