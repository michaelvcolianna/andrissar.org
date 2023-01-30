import React from 'react'
import { graphql } from 'gatsby'

import Seo from '@components/seo'
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
    contentfulPage(slug: {eq: $slug}) {
      contentful_id
      isHome
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

export const Head = ({
  data: {
    contentfulPage: {
      isHome,
      slug,
      title,
      description: {
        description
      },
      card: {
        url
      }
    }
  }
}) => {
  return <Seo
    title={isHome ? null : title}
    description={description}
    url={isHome ? null : `/${slug}`}
    image={url}
  />
}
