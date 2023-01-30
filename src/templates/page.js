import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import RichText from '@components/rich-text'

const SimplePage = ({
  data: {
    contentfulPage: {
      title,
      description: {
        description
      },
      hero,
      content
    }
  }
}) => {
  return (
    <Layout>
      <HeroImage data={hero} />

      <article id="content">
        <h1>{title}</h1>

        <p>{description}</p>

        <RichText content={content} />
      </article>
    </Layout>
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
            __typename
            contentful_id
            height
            width
            title
            description
            gatsbyImageData(placeholder: BLURRED)
            url
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
