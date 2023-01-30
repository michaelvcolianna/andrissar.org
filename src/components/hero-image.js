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
    <figure>
      <GatsbyImage
        image={gatsbyImageData}
        alt={title}
        height={height}
        width={width}
      />

      <figcaption>{description}</figcaption>
    </figure>
  )
}

export default HeroImage
