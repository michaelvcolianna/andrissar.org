import React from 'react'
import { graphql } from 'gatsby'

const HomePage = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulPage(slug: {eq: "home"}) {
      contentful_id
      isHome
      isAdventures
      slug
      title
      description {
        description
      }
      card {
        contentful_id
        url
      }
      hero {
        contentful_id
        height
        width
        title
        description
        gatsbyImageData(placeholder: BLURRED)
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            height
            width
            title
            description
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export default HomePage

export const Head = ({ data }) => {
  return (
    <title>home page</title>
  )
}
