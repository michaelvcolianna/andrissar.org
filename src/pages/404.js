import React from 'react'
import { graphql } from 'gatsby'

const NotFoundPage = ({ data }) => {
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
  }
`

export default NotFoundPage

export const Head = () => {
  return (
    <title>Not found</title>
  )
}
