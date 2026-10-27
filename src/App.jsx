import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import BookScene from './components/BookScene'
import BookSection1 from './components/Booksection1'
import BookSection2 from './components/Booksection2'

const ROUTE_TARGETS = {
  '/': 'opening',
  '/rules': 'rules',
  '/consequences': 'consequences',
  '/ending': 'ending',
}

// #book-scroll-root drives the book's scroll progress.
// BookScene renders a position:sticky canvas that pins at the top of this
// root and floats OVER the section content (it has pointer-events:none and
// takes no horizontal layout space). BookSection1 / BookSection2 are normal
// full-width (100vw) page-flow sections that scroll underneath the book.
export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const target = document.getElementById(ROUTE_TARGETS[pathname] || 'opening')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pathname])

  return (
    <div style={{ background: '#0a0a0a' }}>
      <Hero />
      <div id="book-scroll-root" style={{ position: 'relative' }}>
        <BookScene />
        {/* Pull the sections up so they sit UNDER the sticky book canvas
            (which occupies the first 100vh of this root). The book then
            floats over the section content as you scroll. */}
        <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 1 }}>
          <BookSection1 />
          <BookSection2 />
        </div>
      </div>
    </div>
  )
}
