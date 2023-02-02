import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import LinkResolver from '@components/link-resolver'

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>
  },
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node, children) => <a href={node.data.target.url} target="_blank" rel="noreferrer" aria-labelledby="label-image">{children}</a>,
    [INLINES.HYPERLINK]: (node, children) => <LinkResolver href={node.data.uri}>{children}</LinkResolver>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const {
        height,
        width,
        title,
        description,
        gatsbyImageData,
      } = node.data.target

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
  }
}

const RichText = ({ content }) => {
  return <div>{renderRichText(content, options)}</div>
}

export default RichText
