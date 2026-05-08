const services = [
  {
    title: 'Душ кабини',
    desc: 'Стъклени прегради и врати по мярка. Каленo стъкло 8–10 мм, матово или прозрачно, с алуминиева или безрамкова система.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="20" height="30" rx="1" />
        <path d="M28 14 L40 14 L40 40 L28 40" />
        <circle cx="37" cy="14" r="3" />
        <path d="M37 17 L37 21 M34 18 L33 22 M40 18 L41 22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Огледала',
    desc: 'Огледала по размер за баня, антре и интериор. Шлифовани ръбове, скосявания и гравюри по желание.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="6" width="28" height="36" rx="2" />
        <path d="M16 38 L16 44 M32 38 L32 44 M16 44 L32 44" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="24" cy="22" rx="8" ry="10" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'Паравани',
    desc: 'Стъклени прегради за офис, хол или тераса. Фиксирани и плъзгащи системи. Стъкло 6–10 мм.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="16" height="32" rx="1" />
        <rect x="26" y="8" width="16" height="32" rx="1" />
        <path d="M22 12 L26 12 M22 24 L26 24 M22 36 L26 36" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Аквариуми',
    desc: 'Аквариуми по индивидуален проект — риби, костенурки, терариуми. Стъкло 8–15 мм, силиконирани ъгли.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="36" height="26" rx="1" />
        <path d="M6 14 L24 8 L42 14" strokeLinejoin="round" />
        <path d="M12 28 Q18 22 24 28 Q30 34 36 28" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Стъкло по размер',
    desc: 'Рязане, шлифоване и доставка на стъкло по зададени размери. Прозрачно, матово, цветно, огнеупорно.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="1" />
        <path d="M8 8 L40 40 M14 8 L40 34 M8 14 L34 40" opacity="0.3" />
        <circle cx="38" cy="10" r="4" fill="none" />
        <path d="M36 12 L42 18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Монтаж и ремонт',
    desc: 'Подмяна на счупени стъкла, монтаж на дограма и прегради. Бърза реакция в рамките на 48 часа.',
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 38 L22 26 M30 10 L38 18 L26 30 L14 30 L14 18 Z" strokeLinejoin="round" />
        <path d="M34 8 L40 14 L38 18 L30 10 Z" strokeLinejoin="round" />
        <path d="M10 38 L8 42 L12 40 Z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section className="services" id="услуги">
      <div className="section-head">
        <span className="section-num">01</span>
        <h2 className="section-title">
          Всичко от<br /><em>едно място</em>
        </h2>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div className="service" key={s.title}>
            <div className="service-icon">{s.icon}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
