export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <a href="#" className="logo">
            <span className="logo-mark">
              O<em>&</em>N
            </span>
            <span className="logo-divider" />
            <span>Glass</span>
          </a>
          <p className="footer-tagline">
            Стъкло, изработено по точна мярка — за дома, офиса и обекта.
          </p>
        </div>

        <div className="footer-col">
          <h4>Услуги</h4>
          <ul>
            <li><a href="#services">Душ кабини</a></li>
            <li><a href="#services">Огледала</a></li>
            <li><a href="#services">Паравани</a></li>
            <li><a href="#services">Аквариуми</a></li>
            <li><a href="#services">Маси</a></li>
            <li><a href="#services">B2B стъкло</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Контакт</h4>
          <ul>
            <li><a href="tel:+359000000000">+359 __ ___ ____</a></li>
            <li><a href="mailto:office@onglass.bg">office@onglass.bg</a></li>
            <li><a href="#contact">Пловдив</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} O&N Glass. Всички права запазени.</span>
        <span>
          <a href="/v2" style={{ color: 'inherit', opacity: 0.6 }}>Опитай v2 →</a>
        </span>
      </div>
    </footer>
  )
}
