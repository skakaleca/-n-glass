import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Calculator from '@/components/Calculator'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />

        <section id="калкулатор">
          <div className="section-head">
            <span className="section-num">02</span>
            <h2 className="section-title">
              Изчислете<br /><em>цената</em>
            </h2>
          </div>
          <Calculator />
          <div className="calc-disclaimer">
            Това е ориентировъчна цена само за материала. Крайната оферта може да се различава
            в зависимост от достъп, монтаж и специфики на проекта. Свържете се с нас за точна сметка.
          </div>
        </section>

        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
