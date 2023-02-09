import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const HeroImage = ({
  data: {
    height,
    width,
    title,
    description,
    gatsbyImageData
  }
}) => {
  return (
    <figure className="featured-image">
      <GatsbyImage
        image={gatsbyImageData}
        alt={title}
        height={height}
        width={width}
        layout="fullWidth"
      />

      <figcaption className="screen-reader-text">{description}</figcaption>
    </figure>
  )
}

export default HeroImage
