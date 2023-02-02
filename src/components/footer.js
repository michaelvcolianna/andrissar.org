import React from 'react'

import LinkResolver from '@components/link-resolver'

const Footer = () => {
  let startYear = new Date('01/01/2023').getFullYear()
  let currentYear = new Date().getFullYear()
  let yearPreface = parseInt(startYear) !== parseInt(currentYear)
    ? `${startYear}-`
    : ''

  const copyrightYear = `${yearPreface}${currentYear}`

  return (
    <footer>
      <div>
        © {copyrightYear} Andrissar.org and <LinkResolver href="https://github.com/michaelvcolianna">MVC</LinkResolver>.
      </div>

      <div>
        Powered by <LinkResolver href="https://www.contentful.com/">Contentful</LinkResolver> and <LinkResolver href="https://www.gatsbyjs.com/">Gatsby</LinkResolver>. (<LinkResolver href="https://github.com/michaelvcolianna/andrissar.org">Source Code</LinkResolver>)
      </div>
    </footer>
  )
}

export default Footer
