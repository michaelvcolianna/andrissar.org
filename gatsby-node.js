const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    }
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const settings = await graphql(`
    {
      site {
        siteMetadata {
          perPage
        }
      }
    }
  `)

  if(settings.error) {
    reporter.panicOnBuild(`Error in 'settings' query`)
    return
  }

  const perPage = settings.data.site.siteMetadata.perPage || 10

  const pagination = await graphql(`
    {
      allContentfulAdventure(sort: { date: DESC }) {
        totalCount
        edges {
          node {
            contentful_id
            title
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
          previous {
            contentful_id
            title
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
          next {
            contentful_id
            title
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
        }
      }
    }
  `)

  if(pagination.error) {
    reporter.panicOnBuild(`Error in 'pagination' query`)
    return
  }

  const numPages = Math.ceil(pagination.data.allContentfulAdventure.totalCount / perPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    const currentPage = i + 1

    actions.createPage({
      path: i === 0 ? '/adventures/' : `/adventures/page/${currentPage}`,
      component: path.resolve('./src/templates/adventures.js'),
      context: {
        limit: perPage,
        skip: i * perPage,
        numPages,
        currentPage: currentPage
      }
    })
  })

  const adventures = await graphql(`
    {
      allContentfulAdventure(sort: { date: DESC }) {
        edges {
          node {
            contentful_id
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
          previous {
            contentful_id
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
          next {
            contentful_id
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
        }
      }
    }
  `)

  if(adventures.error) {
    reporter.panicOnBuild(`Error in 'adventures' query`)
    return
  }

  adventures.data.allContentfulAdventure.edges.forEach(edge => {
    actions.createPage({
      path: `/adventures/${edge.node.year}/${edge.node.month}/${edge.node.day}/${edge.node.slug}`,
      component: path.resolve('./src/templates/adventure.js'),
      context: {
        slug: edge.node.slug,
        previous: edge.previous?.slug,
        next: edge.next?.slug
      }
    })
  })

  actions.createPage({
    path: `/`,
    component: path.resolve('./src/templates/page.js'),
    context: {
      slug: 'home'
    }
  })

  const pages = await graphql(`
    {
      allContentfulPage(filter: {
        isHome: { eq: false },
        isAdventures: { eq: false }
      }) {
        nodes {
          contentful_id
          slug
        }
      }
    }
  `)

  if(pages.error) {
    reporter.panicOnBuild(`Error in 'pages' query`)
    return
  }

  pages.data.allContentfulPage.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.slug}`,
      component: path.resolve('./src/templates/page.js'),
      context: {
        slug: node.slug
      }
    })
  })
}
