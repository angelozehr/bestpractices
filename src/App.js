import React, { Component } from 'react'
import { css } from 'glamor'
import Example from './components/Example/Example'
import Lightbox from 'react-images'
import { theme } from './react-image-theme.js'
import data from './data/bestpractices.json'

const appStyle = css({
  width: '90%',
  maxWidth: 1800,
  margin: '0 auto'
})

const mainStyle = css({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 20,
  gridTemplateColumns: 'repeat(1, 1fr)',
  '@media (min-width: 415px)': {
    gridTemplateColumns: 'repeat(1, 1fr)'
  },
  '@media (min-width: 812px)': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  '@media (min-width: 1240px)': {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  '@media (min-width: 1600px)': {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      images: [],
      currentImage: 0
    }
    this.openInLightbox = this.openInLightbox.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
  }

  openInLightbox (array) {
    this.setState({
      images: array.map(url => { return { src: url } }),
      lightboxIsOpen: true,
      currentImage: 0
    })
  }

  closeLightbox () {
    this.setState({
      lightboxIsOpen: false
    })
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  gotoNext () {
    if (this.state.currentImage + 1 === this.state.images.length) return
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  render () {
    return (
      <div className={appStyle}>
        <header className='App-header'>
          <h1 className='App-title'>Data Journalism Best Practices</h1>
        </header>
        <main className={mainStyle}>
          {data.map((entry, index) => (
            <Example data={entry} key={`entry-${index}`} openInLightbox={this.openInLightbox} />
          ))}
        </main>
        <Lightbox
          images={this.state.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickImage={this.gotoNext}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          theme={theme}
        />
      </div>
    )
  }
}

export default App
