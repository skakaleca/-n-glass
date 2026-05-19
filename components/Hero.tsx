export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-text">
        <span className="eyebrow">От 2008 — Прецизна обработка на стъкло</span>
        <h1>
          Стъкло, изработено<br />
          по <em>точна</em> мярка.
        </h1>
        <p className="hero-sub">
          Душ кабини, огледала, паравани, аквариуми, стъкла за мебели и интериор —
          всичко, направено от лист стъкло, обработено в нашето ателие.
        </p>
        <div className="hero-actions">
          <a href="#calculator" className="btn-primary">
            Изчисли цена
            <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#services" className="btn-secondary">Виж услугите</a>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="glass-pane pane-1" />
        <div className="glass-pane pane-2" />
        <div className="glass-pane pane-3" />
      </div>
    </header>
  )
}
