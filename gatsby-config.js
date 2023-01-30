require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const siteUrl = process.env.APP_URL || 'https://andrissar.org'

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

const { spaceId, accessToken } = contentfulConfig

if(!spaceId || !accessToken) {
  throw new Error('Contentful "spaceId" and "accessToken" must both be provided.')
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    perPage: parseInt(process.env.PER_PAGE) || 10,
    siteDescription: 'Dungeons & Dragons campaign website for Andrissar 719.',
    siteImage: 'https://images.ctfassets.net/dcyhd6p2bsl4/2GbPMKPyfYwvMcJhA9vybh/f8f6483bd9cd5c11339637163cd1e394/island_by_ryky_d9qkwm9-min-card.jpg',
    siteUrl: siteUrl
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'icon': 'static/dnd-logo.jpg'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }
  ]
}