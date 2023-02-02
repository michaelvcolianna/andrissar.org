import React from 'react'

import Header from '@components/header'
import Footer from '@components/footer'

import SkipLink from '@components/skip-link'

import '@styles/main.scss'

const Layout = ({
  children
}) => {
  return (
    <>
      <SkipLink />

      <Header />

      <main>
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
