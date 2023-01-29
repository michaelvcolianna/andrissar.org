import React from 'react'
import { graphql } from 'gatsby'

const AdventurePage = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export const query = graphql`
  query ($slug: String!, $previous: String, $next: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    node: contentfulAdventure(slug: {eq: $slug}) {
      contentful_id
      slug
      title
      year: date(formatString: "YYYY")
      month: date(formatString: "MM")
      day: date(formatString: "DD")
      date(formatString: "MMMM Do, YYYY")
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
      characters
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
    previous: contentfulAdventure(slug: {eq: $previous}) {
      contentful_id
      slug
      title
      year: date(formatString: "YYYY")
      month: date(formatString: "MM")
      day: date(formatString: "DD")
    }
    next: contentfulAdventure(slug: {eq: $next}) {
      contentful_id
      slug
      title
      year: date(formatString: "YYYY")
      month: date(formatString: "MM")
      day: date(formatString: "DD")
    }
  }
`

export default AdventurePage

export const Head = ({ data }) => {
  return (
    <title>adventure name</title>
  )
}
