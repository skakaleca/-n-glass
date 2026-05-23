import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Calculator from '@/components/Calculator'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="v1-page">
      <Nav />
      <Hero />
      <Services />

      <section id="calculator" className="calc-section">
        <div className="calc-bg-1" />
        <div className="calc-bg-2" />
        <div className="calc-inner">
          <div className="section-head">
            <div className="section-num">— 02 / Изчисли</div>
            <h2 className="section-title">
              Бърза <em>ориентировъчна</em><br />оценка на цената.
            </h2>
          </div>
          <Calculator />
          <div className="calc-disclaimer">
            Това е <strong>ориентировъчна</strong> оценка. Финална цена се определя след преглед
            на проекта и измерване на място. За точна оферта се свържете с нас.
          </div>
        </div>
      </section>

      <About />
      <Contact />
      <Footer />
    </div>
  )
}
