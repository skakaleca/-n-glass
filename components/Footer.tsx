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
            Glass
          </a>
          <p className="footer-tagline">
            Стъкло, което издържа —<br />естетика, която остава.
          </p>
        </div>

        <div className="footer-col">
          <h4>Услуги</h4>
          <ul>
            <li><a href="#услуги">Душ кабини</a></li>
            <li><a href="#услуги">Огледала</a></li>
            <li><a href="#услуги">Паравани</a></li>
            <li><a href="#услуги">Аквариуми</a></li>
            <li><a href="#услуги">Стъкло по размер</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Контакти</h4>
          <ul>
            <li><a href="tel:+359XXXXXXXXX">+359 XX XXX XXXX</a></li>
            <li><a href="mailto:info@onglass.bg">info@onglass.bg</a></li>
            <li><a href="#контакти">Пловдив, България</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} O&N Glass. Всички права запазени.</span>
        <span>Пловдив, България</span>
      </div>
    </footer>
  )
}
