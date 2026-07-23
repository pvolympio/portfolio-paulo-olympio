import ParticleBackground from '@/components/ParticleBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects locale={locale} />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
