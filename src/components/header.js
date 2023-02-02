import React from 'react'

import LinkResolver from '@components/link-resolver'

import * as style from './header.module.scss'

const Header = () => {
  return (
    <header className={style.siteHeader}>
      <span>Andrissar 719</span>

      <nav aria-label="Site pages">
        <ul>
          <li><LinkResolver href="/">Home</LinkResolver></li>
          <li><LinkResolver href="/background">Background</LinkResolver></li>
          <li><LinkResolver href="/house-rules">House Rules</LinkResolver></li>
          <li><LinkResolver href="/maps">Maps</LinkResolver></li>
          <li><LinkResolver href="/characters">Characters</LinkResolver></li>
          <li><LinkResolver href="/adventures">Adventures</LinkResolver></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
