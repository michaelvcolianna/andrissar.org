import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ paginator }) => {
  const nextUrl = () => `/adventures/page/${paginator.currentPage + 1}`
  const previousUrl = () => paginator.currentPage === 2
    ? '/adventures'
    : `/adventures/page/${paginator.currentPage - 1}`

  return (
    <div className="archive-pagination section-inner group">
      {paginator.hasPreviousPage && (
        <div className="previous-posts-link">
          <h4 className="title">
            <Link to={previousUrl()}>Newer</Link>
          </h4>
        </div>
      )}

      {paginator.hasNextPage && (
        <div className="next-posts-link">
          <h4 className="title">
            <Link to={nextUrl()}>Older</Link>
          </h4>
        </div>
      )}
    </div>
  )
}

export default Pagination
