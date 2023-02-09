import React from 'react'
import { graphql } from 'gatsby'

import Seo from '@components/seo'
import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import RichText from '@components/rich-text'

const SimplePage = ({
  location,
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
    <Layout location={location}>
      <article id="content">
        <HeroImage data={hero} />

        <header className="entry-header section-inner">
          <h1 className="entry-title">{title}</h1>

          <p className="excerpt">{description}</p>
        </header>

        <div className="entry-content section-inner">
          <RichText content={content} />
        </div>
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
        gatsbyImageData(
          layout: FULL_WIDTH,
          placeholder: BLURRED
        )
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
