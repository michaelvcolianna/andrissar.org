import React from 'react'
import { Link } from 'gatsby'


const Header = ({ location }) => {
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

        <div className="nav-toggle">
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className="menu-wrapper">
          <ul className="main-menu desktop">
            <NavLinks />
          </ul>
        </div>
      </header>

      <div className="mobile-menu-wrapper">
        <ul className="main-menu mobile">
          <NavLinks />
        </ul>
      </div>
    </>
  )
}

export default Header
