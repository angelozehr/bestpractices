import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import marked from 'marked'

const cardStyle = css({
  backgroundColor: '#FFF',
  borderRadius: 2,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)'
})

const infosStyle = css({
  padding: '0 10px 10px'
})

const imageStyle = css({
  width: '100%',
  paddingBottom: '60%',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  cursor: 'pointer'
})

const tagsStyle = css({
  display: 'inline-block',
  paddingLeft: 0,
  '& li': {
    display: 'inline-block',
    color: '#999',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    '&:after': {
      content: ', ',
      paddingRight: 4
    },
    '&:last-of-type::after': {
      content: ' '
    }
  }
})

const buttonStyle = css({
  display: 'inline-block',
  backgroundColor: '#444',
  padding: '5px 10px',
  borderWidth: 2,
  borderRadius: 3,
  color: '#FFF',
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontSize: 10,
  letterSpacing: 2,
  '&:hover': {
    backgroundColor: '#333'
  }
})

class Example extends PureComponent {
  gifsFirst (a, b) {
    if (!a || !b) return 1
    if (a.toLowerCase().match(/.*\.(gif)$/)) return -1
    return 1
  }

  render () {
    const {data} = this.props
    const images = data.images.sort(this.gifsFirst).map(image => encodeURIComponent(image))

    return (
      <div className={cardStyle}>
        <figure
          className={imageStyle}
          style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${images[0]})`}}
          onClick={() => { this.props.openInLightbox(images) }}
        />
        <section className={infosStyle}>
          <h3>{data.title}</h3>
          <article dangerouslySetInnerHTML={{__html: marked(data.description)}} />
          <ul className={tagsStyle}>
            {data.tags.map((tag, i) => (
              <li key={`li-${i}`}>{tag}</li>
            ))}
          </ul>
          <br />
          <a className={buttonStyle} href={data.url} target='_blank' title={data.title}>
            Zur Seite
          </a>
        </section>
      </div>
    )
  }
}

Example.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    class: PropTypes.oneOf(['do', 'dont'])
  }),
  openInLightbox: PropTypes.func.isRequired
}

export default Example
