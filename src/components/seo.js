import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Seo = ({
  title = null,
  description = null,
  url = null,
  image = null
}) => {
  const {
    site: {
      siteMetadata: {
        siteDescription,
        siteImage,
        siteUrl
      }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteDescription
          siteImage
          siteUrl
        }
      }
    }
  `)

  const seoDescription = description ?? siteDescription
  const seoImage = image ?? siteImage
  const seoTitle = title
    ? `${title} - Andrissar 719`
    : 'Andrissar 719 - A 5E D&D Campaign'
  const seoUrl = url
    ? `${siteUrl}${url}`
    : siteUrl

  return (
    <>
      <html lang="en" />
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta property="og:title" content={seoTitle} />
      <meta name="twitter:title" content={seoTitle} />
      <link rel="canonical" href={seoUrl} />
      <meta property="og:url" content={seoUrl} />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="description" content={seoDescription} />
      <meta property="og:description" content={seoDescription} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="image" content={seoImage} />
      <meta property="og:image" content={seoImage} />
      <meta name="twitter:image" content={seoImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

export default Seo
