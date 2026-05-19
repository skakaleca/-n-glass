export default function About() {
  return (
    <section className="about" id="about">
      <div className="section-head">
        <div className="section-num">— 03 / За нас</div>
        <h2 className="section-title">
          Занаят, направен с <em>прецизност</em>.
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>Стъкларско ателие с дългогодишен опит в обработката на стъкло — от индивидуални поръчки за дома до серийни доставки за мебелисти и строителни обекти.</p>
          <p>Работим само с лист стъкло — рязане, шлайфане, фасетиране, закаляване, лепене и монтаж. Не се занимаваме с дограма, защото сме съсредоточили цялото си внимание върху това, в което сме най-добри.</p>
          <p>Всеки проект минава през ръцете на майстор. Всеки ръб е проверен. Всеки размер е точен.</p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-num">15<em>+</em></div>
            <div className="stat-label">Години опит</div>
          </div>
          <div className="stat">
            <div className="stat-num">2000<em>+</em></div>
            <div className="stat-label">Завършени проекта</div>
          </div>
          <div className="stat">
            <div className="stat-num">48<em>ч</em></div>
            <div className="stat-label">Среден срок B2B</div>
          </div>
        </div>
      </div>
    </section>
  )
}
