import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'

const Header = ({ location }) => {
  // Handle the body classes
  function toggleBody() {
    document.body.classList.toggle('mobile-menu-visible')
    document.body.classList.toggle('lock-scroll')
  }

  // Up front vars & refs
  const [navOpen, setNavOpen] = useState(false)
  const menuNode = useRef()
  const menuToggle = useRef()

  // Handler for the menu button
  const toggleMenu = () => {
    setNavOpen(prev => !prev)
    toggleBody()
  }

  // Escape key handler
  useEffect(() => {
    const keyDownHandler = event => {
      if(event.key === 'Escape' && navOpen) {
        setNavOpen(false)
        toggleBody()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return() => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [navOpen])

  // Window resize handler
  useEffect(() => {
    const windowResizeHandler = () => {
      if(window.innerWidth > 100) {
        setNavOpen(false)
        toggleBody()
      }
    }

    window.addEventListener('resize', windowResizeHandler)

    return() => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [navOpen])

  const current = (path) => {
    let uri = '/'

    if(location && location.pathname !== '/') {
      uri = location.pathname.replace(/\/$/, '')
    }

    return path === uri || (path !== '/' && uri.startsWith(path))
      ? 'current-menu-item'
      : null
  }

  const NavLinks = () => {
    return (
      <>
        <li className={`menu-item ${current('/')}`}>
          <Link to="/">Home</Link>
        </li>

        <li className={`menu-item ${current('/background')}`}>
          <Link to="/background">Background</Link>

          <ul className="sub-menu">
            <li className={`menu-item ${current('/background')}`}>
              <Link to="/background#1145">1145</Link>
            </li>

            <li className={`menu-item ${current('/background')}`}>
              <Link to="/background#1468">1468</Link>
            </li>

            <li className={`menu-item ${current('/background')}`}>
              <Link to="/background#1824">1824</Link>
            </li>
          </ul>
        </li>

        <li className={`menu-item ${current('/house-rules')}`}>
          <Link to="/house-rules">House Rules</Link>
        </li>

        <li className={`menu-item ${current('/maps')}`}>
          <Link to="/maps">Maps</Link>

          <ul className="sub-menu">
            <li className={`menu-item ${current('/maps')}`}>
              <Link to="/maps#current">Current</Link>
            </li>

            <li className={`menu-item ${current('/maps')}`}>
              <Link to="/maps#older">Older</Link>
            </li>
          </ul>
        </li>

        <li className={`menu-item ${current('/characters')}`}>
          <Link to="/characters">Characters</Link>
        </li>

        <li className={`menu-item ${current('/adventures')}`}>
          <Link to="/adventures">Adventures</Link>
        </li>
      </>
    )
  }

  return (
    <>
      <header className="site-header group">
        <h1 className="site-title">
          <Link to="/" className="site-name">Andrissar 719</Link>
        </h1>

        <div className="site-description">
          A 5E D&amp;D Campaign
        </div>

        <button
          className={`nav-toggle ${navOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          ref={menuToggle}
        >
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <div className="menu-wrapper">
          <ul className="main-menu desktop">
            <NavLinks />
          </ul>
        </div>
      </header>

      <div
        className={`mobile-menu-wrapper ${navOpen ? 'visible' : ''}`}
        ref={menuNode}
      >
        <ul className="main-menu mobile">
          <NavLinks />
        </ul>
      </div>
    </>
  )
}

export default Header
