import React from 'react'
import { Link } from 'gatsby'

import SkipLink from '@components/skip-link'

import '@styles/main.scss'

let startYear = new Date('01/01/2023').getFullYear()
let currentYear = new Date().getFullYear()
let yearPreface = parseInt(startYear) !== parseInt(currentYear)
  ? `${startYear}-`
  : ''

const copyrightYear = `${yearPreface}${currentYear}`

const Layout = ({
  children
}) => {
  return (
    <>
      <SkipLink />

      <header>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/background">background</Link></li>
          <li><Link to="/house-rules">house rules</Link></li>
          <li><Link to="/characters">characters</Link></li>
          <li><Link to="/adventures">adventures</Link></li>
          <li><Link to="/maps">maps</Link></li>
        </ul>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <span id="copyright">© {copyrightYear} Andrissar.org</span>
      </footer>

      <div hidden>
        <span id="label-external">Opens an external site</span>
      </div>
    </>
  )
}

export default Layout
