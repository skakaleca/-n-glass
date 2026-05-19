export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-head">
        <div className="section-num">— 01 / Услуги</div>
        <h2 className="section-title">
          Какво <em>правим</em><br />от лист стъкло.
        </h2>
      </div>

      <div className="services-grid">
        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><rect x="10" y="6" width="36" height="44" rx="2" /><line x1="10" y1="14" x2="46" y2="14" /><circle cx="40" cy="22" r="2" /></svg>
          </div>
          <div>
            <h3>Душ кабини</h3>
            <p>По индивидуален проект — закалено стъкло 8 или 10 мм, прецизно изрязани отвори за панти и брави, обработени ръбове.</p>
          </div>
        </article>

        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><rect x="8" y="8" width="40" height="40" rx="1" /><path d="M14 14 L42 42 M42 14 L14 42" opacity="0.3" /></svg>
          </div>
          <div>
            <h3>Огледала</h3>
            <p>На размер, с фасет или без, с просветление по периферия, лепене към основа, монтаж за бани и дрешници.</p>
          </div>
        </article>

        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><line x1="14" y1="6" x2="14" y2="50" /><line x1="28" y1="6" x2="28" y2="50" /><line x1="42" y1="6" x2="42" y2="50" /><line x1="6" y1="6" x2="50" y2="6" /><line x1="6" y1="50" x2="50" y2="50" /></svg>
          </div>
          <div>
            <h3>Паравани</h3>
            <p>Стъклени паравани за тераси, офис пространства и стълбища — с минимални профили или изцяло безпрофилни решения.</p>
          </div>
        </article>

        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><rect x="8" y="14" width="40" height="32" rx="1" /><path d="M14 22 Q20 18 28 22 T42 22" opacity="0.5" /><path d="M14 30 Q20 26 28 30 T42 30" opacity="0.4" /></svg>
          </div>
          <div>
            <h3>Аквариуми</h3>
            <p>Залепени с аквариумен силикон, по индивидуален размер — за дома, офис или специализирани приложения.</p>
          </div>
        </article>

        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><rect x="6" y="22" width="44" height="6" rx="1" /><line x1="14" y1="28" x2="14" y2="46" /><line x1="42" y1="28" x2="42" y2="46" /></svg>
          </div>
          <div>
            <h3>Стъклени маси</h3>
            <p>Плотове и трапезарии — ясно, бронзово или сиво стъкло, с фасет или скосени ръбове, дебелина 8–19 мм.</p>
          </div>
        </article>

        <article className="service">
          <div className="service-icon">
            <svg viewBox="0 0 56 56"><rect x="8" y="10" width="22" height="36" rx="1" /><rect x="32" y="18" width="16" height="28" rx="1" /></svg>
          </div>
          <div>
            <h3>Стъкла по размер — B2B</h3>
            <p>За мебелисти, обзаведители, архитекти и строители — рязане, шлайфане и закаляване по предоставени размери, с кратки срокове.</p>
          </div>
        </article>
      </div>
    </section>
  )
}
