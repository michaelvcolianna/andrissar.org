import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/layout'

const NotFoundPage = ({ data }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
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
