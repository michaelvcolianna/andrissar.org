import React from 'react'
import { Link, graphql } from 'gatsby'

import Seo from '@components/seo'
import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import RichText from '@components/rich-text'

import adventureLink from '@utils/adventure-link'

const AdventurePage = ({
  location,
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
    <Layout location={location}>
      <article id="content" className="type-post">
        <HeroImage data={hero} />

        <header className="entry-header section-inner">
          <Link to="/adventures" className="post-list-return">
            Back to Adventures
          </Link>

          <h1 className="entry-title">{title}</h1>

          <p className="excerpt">{description}</p>

          <div className="meta">
            <time dateTime={date}>{niceDate}</time>
          </div>
        </header>

        <div className="entry-content section-inner">
          <aside>
            <p><strong>Characters:</strong></p>

            <ul>
              {characters.map((character, i) => (
                <li key={`character-${i}`}>
                  {character}
                </li>
              ))}
            </ul>
          </aside>

          <RichText content={content} />
        </div>

        <div className="post-pagination section-inner">
          <div className="previous-post">
            {previous && (
              <Link to={adventureLink(previous)}>
                <span>{previous.title}</span>
              </Link>
            )}
          </div>

          <div className="next-post">
            {next && (
              <Link to={adventureLink(next)}>
                <span>{next.title}</span>
              </Link>
            )}
          </div>
        </div>
      </article>
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
        gatsbyImageData(
          layout: FULL_WIDTH,
          placeholder: BLURRED
        )
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
    next: contentfulAdventure(slug: {eq: $previous}) {
      contentful_id
      slug
      title
      year: date(formatString: "YYYY")
      month: date(formatString: "MM")
      day: date(formatString: "DD")
    }
    previous: contentfulAdventure(slug: {eq: $next}) {
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
