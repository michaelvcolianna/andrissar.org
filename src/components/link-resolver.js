import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const LinkResolver = ({ href, children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const isExternal = !href.startsWith('/') && !href.startsWith('#') && !href.startsWith(data.site.siteMetadata.siteUrl)

  return (
    <>
      {isExternal
        ? <a href={href} aria-label="label-external">{children}</a>
        : <Link to={href}>{children}</Link>
      }
    </>
  )
}

export default LinkResolver
