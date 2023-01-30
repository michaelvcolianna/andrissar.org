import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import Pagination from '@components/pagination'

const adventureLink = (adventure) => {
  let parts = [
    'adventures',
    adventure.year,
    adventure.month,
    adventure.day,
    adventure.slug
  ]

  return `/${parts.join('/')}`
}

const AdventuresPage = ({
  data: {
    contentfulPage: {
      title,
      description: {
        description
      },
      hero
    },
    allContentfulAdventure
  }
}) => {
  const groupedAdventures = allContentfulAdventure.nodes.reduce((r, a) => {
    r[a.year] = r[a.year] || []
    r[a.year].push(a)
    return r
  }, Object.create(null))

  const adventuresByYear = Object.keys(groupedAdventures).reverse().map((key) => {
    return [+key, groupedAdventures[key]]
  })

  return (
    <Layout>
      <HeroImage data={hero} />

      <article id="content">
        <h1>{title}</h1>

        <p>{description}</p>
      </article>

      {adventuresByYear.map(year => (
        <section key={`year-${year[0]}`}>
          <h3>{year[0]}</h3>

          <ul>
            {year[1].map(adventure => (
              <li key={`adventure-${adventure.contentful_id}`}>
                <Link to={adventureLink(adventure)}>
                  <span>{adventure.title}</span>
                  <time dateTime={adventure.date}>
                    {adventure.niceDay} {adventure.niceMonth}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {allContentfulAdventure.pageInfo.pageCount > 1 && (
        <Pagination paginator={allContentfulAdventure.pageInfo} />
      )}
    </Layout>
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
        niceMonth: date(formatString: "MMM")
        niceDay: date(formatString: "D")
        date
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
