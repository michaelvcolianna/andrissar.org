import React from 'react'

const Pagination = ({ paginator }) => {
  const nextUrl = () => `/adventures/page/${paginator.currentPage + 1}`
  const previousUrl = () => paginator.currentPage === 2
    ? '/adventures'
    : `/adventures/page/${paginator.currentPage - 1}`

  return (
    <nav id="adventures-nav" aria-label="Pages of adventures">
      <ul>
        {paginator.hasNextPage && (
          <li>
            <a href={nextUrl()}>View next {paginator.perPage}</a>
          </li>
        )}

        <li>
          <span>Page {paginator.currentPage} of {paginator.pageCount}</span>
        </li>

        {paginator.hasPreviousPage && (
          <li>
            <a href={previousUrl()}>View previous {paginator.perPage}</a>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
