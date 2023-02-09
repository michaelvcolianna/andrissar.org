import React from 'react'
import { Link, graphql } from 'gatsby'

import Seo from '@components/seo'
import Layout from '@components/layout'
import HeroImage from '@components/hero-image'
import Pagination from '@components/pagination'

import adventureLink from '@utils/adventure-link'

const AdventuresPage = ({
  location,
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
    <Layout location={location}>
      <HeroImage data={hero} />

      <div className="section-inner">
        <header className="page-header">
          <h1 className="entry-title">{title}</h1>
          <p className="excerpt">{description}</p>
        </header>

        <div className="posts" id="posts">
          {adventuresByYear.map(year => (
            <ul key={`year-${year[0]}`}>
              <li>
                <h3 className="list-title">{year[0]}</h3>
              </li>

              {year[1].map(adventure => (
                <li
                  className="post-preview type-post"
                  key={`adventure-${adventure.contentful_id}`}
                >
                  <Link to={adventureLink(adventure)}>
                    <h2 className="title">{adventure.title}</h2>

                    <time dateTime={adventure.date}>
                      {adventure.niceDay} {adventure.niceMonth}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {allContentfulAdventure.pageInfo.pageCount > 1 && <Pagination paginator={allContentfulAdventure.pageInfo} />}
    </Layout>
  )
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    contentfulPage(slug: {eq: "adventures"}) {
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
        gatsbyImageData(
          layout: FULL_WIDTH,
          placeholder: BLURRED
        )
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
    contentfulPage: {
      description: {
        description
      },
      card: {
        url
      }
    },
    allContentfulAdventure: {
      pageInfo
    }
  }
}) => {
  const pageNumber = pageInfo.pageCount > 1
    ? ` (Page ${pageInfo.currentPage} of ${pageInfo.pageCount})`
    : ''

  return (
    <Seo
      title={`Adventures${pageNumber}`}
      description={description}
      image={url}
    />
  )
}
