export default function About() {
  return (
    <section className="about" id="за-нас">
      <div className="section-head">
        <span className="section-num">03</span>
        <h2 className="section-title">
          Занаят, предаван<br /><em>с поколения</em>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            Основано от двама братя с дългогодишен опит в стъкларството,
            O&N Glass е семеен бизнес, изграден върху едно просто убеждение:
            всяко парче стъкло заслужава прецизна обработка.
          </p>
          <p>
            Работим с частни клиенти, интериорни дизайнери, архитекти и
            строителни фирми. Всеки проект е уникален — измерваме на място,
            изработваме по размер и монтираме сами.
          </p>
          <p>
            Не правим дограма. Правим стъкло — и го правим добре.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-num">15<em>+</em></div>
            <div className="stat-label">Години опит</div>
          </div>
          <div className="stat">
            <div className="stat-num">1<em>к</em></div>
            <div className="stat-label">Завършени проекти</div>
          </div>
          <div className="stat">
            <div className="stat-num">48<em>ч</em></div>
            <div className="stat-label">Срок за доставка</div>
          </div>
        </div>
      </div>
    </section>
  )
}
