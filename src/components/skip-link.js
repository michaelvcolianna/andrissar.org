import React from 'react'
import { Link } from 'gatsby'

import * as style from './skip-link.module.scss'

const SkipLink = () => {
  return (
    <Link className={style.anchor} to="#content">
      <span>Skip to content</span>
    </Link>
  )
}

export default SkipLink
