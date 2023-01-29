require('dotenv').config({
  path: `.env`
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
    description: 'Dungeons & Dragons campaign website for Andrissar 719.',
    siteUrl: siteUrl,
    title: `Andrissar 719 - A 5E D&D Campaign`,
    url: siteUrl
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