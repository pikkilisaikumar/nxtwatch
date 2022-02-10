import {Component} from 'react'
import {Link} from 'react-router-dom'
import 'reactjs-popup/dist/index.css'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme} = value

          const videosData2 = (
            <div className="failure-container-one">
              <img
                src={
                  isTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                }
                alt="not found"
                className="failure-view-image-one"
              />
              <h1 className={isTheme ? 'wentwrong' : 'wentwrong1'}>
                Page Not Found
              </h1>
              <p
                className={
                  isTheme ? 'wentwrongparagraph' : 'wentwrongparagraph1'
                }
              >
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          )

          return (
            <div data-testid="banner" className="banner-one">
              <Header />
              <div className="home-container-one" data-testid="trending">
                <div
                  className={
                    isTheme ? 'left-side-container' : 'left-side-container1'
                  }
                >
                  <ul>
                    <Link to="/">
                      <div
                        className={
                          isTheme
                            ? 'icon-content-container'
                            : 'icon-content-container1'
                        }
                      >
                        <AiOutlineHome className="mr-2 mt-1" />
                        <p
                          className={
                            isTheme
                              ? 'homeparagraph mt-3'
                              : 'homeparagraph1 mt-3'
                          }
                        >
                          Home
                        </p>
                      </div>
                    </Link>
                    <Link to="/trending">
                      <div
                        className={
                          isTheme
                            ? 'icon-content-container'
                            : 'icon-content-container1'
                        }
                      >
                        <FaFire className="mr-2 mt-1" />
                        <p
                          className={
                            isTheme
                              ? 'homeparagraph mt-3'
                              : 'homeparagraph1 mt-3'
                          }
                        >
                          Trending
                        </p>
                      </div>
                    </Link>
                    <Link to="/gaming">
                      <div
                        className={
                          isTheme
                            ? 'icon-content-container'
                            : 'icon-content-container1'
                        }
                      >
                        <SiYoutubegaming className="mr-2 mt-1" />
                        <p
                          className={
                            isTheme
                              ? 'homeparagraph mt-3'
                              : 'homeparagraph1 mt-3'
                          }
                        >
                          Gaming
                        </p>
                      </div>
                    </Link>
                    <Link to="/saved-videos">
                      <div
                        className={
                          isTheme
                            ? 'icon-content-container'
                            : 'icon-content-container1'
                        }
                      >
                        <BiListPlus className="mr-2 mt-1" />
                        <p
                          className={
                            isTheme
                              ? 'homeparagraph mt-3'
                              : 'homeparagraph1 mt-3'
                          }
                        >
                          Saved videos
                        </p>
                      </div>
                    </Link>
                  </ul>
                  <div>
                    <p className={!isTheme && 'contactus-paragraph'}>
                      CONTACT US
                    </p>
                    <div className="social-media-images-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt=" facebook logo"
                        className="social-media-images mr-1"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                        className="social-media-images mr-1"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                        className="social-media-images"
                      />
                    </div>
                    <p
                      className={
                        isTheme
                          ? 'channel-recomedation-paragraph'
                          : 'channel-recomedation-paragraph1'
                      }
                    >
                      Enjoy!Now to see your channels and recommendation
                    </p>
                  </div>
                </div>

                <div
                  data-testid="notfound"
                  className={
                    isTheme
                      ? 'right-side-container-styling-not-found'
                      : 'right-side-container-styling-not-found1'
                  }
                >
                  {videosData2}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
