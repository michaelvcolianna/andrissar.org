import React from 'react'
import { Link, graphql } from 'gatsby'

import Seo from '@components/seo'
import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import RichText from '@components/rich-text'

import adventureLink from '@utils/adventure-link'

const AdventurePage = ({
  data: {
    node: {
      title,
      niceDate,
      date,
      description: {
        description
      },
      hero,
      characters,
      content
    },
    previous,
    next
  }
}) => {
  return (
    <Layout>
      <HeroImage data={hero} />

      <Link to="/adventures">Back to Adventures</Link>

      <article id="content">
        <h1>{title}</h1>

        <p>{description}</p>

        <time dateTime={date}>{niceDate}</time>

        <aside>
          <h3>Characters:</h3>

          <ul>
            {characters.map((character, i) => (
              <li key={`character-${i}`}>
                {character}
              </li>
            ))}
          </ul>
        </aside>

        <RichText content={content} />
      </article>

      <nav id="adventure-nav" aria-label="Adjacent posts">
        <ul>
          {next && (
            <li>
              <Link to={adventureLink(next)}>{next.title}</Link>
            </li>
          )}

          {previous && (
            <li>
              <Link to={adventureLink(previous)}>{previous.title}</Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $previous: String, $next: String) {
    node: contentfulAdventure(slug: {eq: $slug}) {
      contentful_id
      slug
      title
      year: date(formatString: "YYYY")
      month: date(formatString: "MM")
      day: date(formatString: "DD")
      niceDate: date(formatString: "MMMM Do, YYYY")
      date
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
            __typename
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

export const Head = ({
  data: {
    node: {
      slug,
      title,
      description: {
        description
      },
      card: {
        url
      },
      year,
      month,
      day
    }
  }
}) => {
  return <Seo
    title={title}
    description={description}
    url={`/adventures/${year}/${month}/${day}/${slug}`}
    image={url}
  />
}
