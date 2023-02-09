import React from 'react'
import { Link } from 'gatsby'

const SkipLink = () => {
  return (
    <Link className="skip-link button" to="#site-content">
      <span>Skip to the content</span>
    </Link>
  )
}

export default SkipLink
