import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import LinkResolver from '@components/link-resolver'

const slugify = string => string
  .toString()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>
  },
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node, children) => <a href={node.data.target.url} target="_blank" rel="noreferrer" aria-labelledby="label-image">{children}</a>,
    [INLINES.HYPERLINK]: (node, children) => <LinkResolver href={node.data.uri}>{children}</LinkResolver>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 id={slugify(children)}>{children}</h2>,
    [BLOCKS.TABLE]: (node, children) => {
      return (
        <div className="wp-block-table">
          <table>
            <tbody>{children}</tbody>
          </table>
        </div>
      )
    },
    [BLOCKS.QUOTE]: (node, children) => <blockquote className="wp-block-quote">{children}</blockquote>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const {
        height,
        width,
        title,
        description,
        gatsbyImageData,
      } = node.data.target

      return (
        <figure className="wp-block-image size-large">
          <GatsbyImage
            image={gatsbyImageData}
            alt={title}
            height={height}
            width={width}
          />

          <figcaption className="screen-reader-text">{description}</figcaption>
        </figure>
      )
    }
  }
}

const RichText = ({ content }) => {
  return <div>{renderRichText(content, options)}</div>
}

export default RichText
