import React from 'react'

import LinkResolver from '@components/link-resolver'

const Footer = () => {
  let startYear = new Date('01/01/2020').getFullYear()
  let currentYear = new Date().getFullYear()
  let yearPreface = parseInt(startYear) !== parseInt(currentYear)
    ? `${startYear}-`
    : ''

  const copyrightYear = `${yearPreface}${currentYear}`

  return (
    <footer className="site-footer section-inner">
      <p className="copyright">© {copyrightYear} <LinkResolver href="https://github.com/michaelvcolianna">MVC</LinkResolver>.</p>
      <p className="theme-by">Theme by <LinkResolver href="https://andersnoren.se">Anders Noren</LinkResolver>. Powered by <LinkResolver href="https://www.contentful.com/">Contentful</LinkResolver> and <LinkResolver href="https://www.gatsbyjs.com/">Gatsby</LinkResolver>. (<LinkResolver href="https://github.com/michaelvcolianna/andrissar.org">Source Code</LinkResolver>)</p>
    </footer>
  )
}

export default Footer
