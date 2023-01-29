import React from 'react'
import { graphql } from 'gatsby'

const AdventuresPage = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulPage(slug: {eq: "adventures"}) {
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
    allContentfulAdventure(
      sort: { date: DESC },
      skip: $skip,
      limit: $limit
    ) {
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
      nodes {
        contentful_id
        title
        slug
        year: date(formatString: "YYYY")
        month: date(formatString: "MM")
        day: date(formatString: "DD")
      }
    }
  }
`

export default AdventuresPage

export const Head = ({
  data: {
    allContentfulAdventure: {
      pageInfo
    }
  }
}) => {
  const pageNumber = pageInfo.currentPage > 1
    ? ` - page ${pageInfo.currentPage}`
    : ''

  return (
    <title>adventures{pageNumber}</title>
  )
}
