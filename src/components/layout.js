import React from 'react'

import Header from '@components/header'
import Footer from '@components/footer'

import SkipLink from '@components/skip-link'

import '@styles/main.scss'

const Layout = ({ location, children }) => {
  return (
    <>
      <SkipLink />

      <Header location={location} />

      <main className="site-content" id="site-content">
        {children}
      </main>

      <Footer />

      <div hidden>
        <span id="label-external">Opens an external site</span>
        <span id="label-image">Opens an image in a new window/tab</span>
      </div>
    </>
  )
}

export default Layout
