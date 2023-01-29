import React from 'react'
import { graphql } from 'gatsby'

const SimplePage = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export const query = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulPage(slug: {eq: $slug}) {
      contentful_id
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

export default SimplePage

export const Head = ({ data }) => {
  return (
    <title>page name</title>
  )
}
