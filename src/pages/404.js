import React from 'react'

import Seo from '@components/seo'
import Layout from '@components/layout'

const NotFoundPage = ({ location }) => {
  return (
    <Layout>
      <h1>Not found</h1>

      <p>There doesn't seem to be anything at "{location.pathname}"</p>
    </Layout>
  )
}

export default NotFoundPage

export const Head = ({ location }) => {
  return <Seo
    title="Not found"
    description="Unable to locate the requested page"
    url={location.pathname}
  />
}
