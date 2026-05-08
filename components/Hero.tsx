export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">Стъкларско ателие — Пловдив</p>
        <h1>
          Стъкло с<br />
          <em>прецизност</em><br />
          и характер
        </h1>
        <p className="hero-sub">
          Душ кабини, огледала, паравани, аквариуми и стъкла по размер.
          Изработка и монтаж от занаятчии с над 15 години опит.
        </p>
        <div className="hero-actions">
          <a href="#калкулатор" className="btn-primary">
            Изчисли цена
            <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#услуги" className="btn-secondary">
            Нашите услуги
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="glass-pane pane-1" />
        <div className="glass-pane pane-2" />
        <div className="glass-pane pane-3" />
      </div>

      <div className="hero-meta">
        <span>Пловдив, България</span>
        <span>От 2008 година</span>
      </div>
    </section>
  )
}
