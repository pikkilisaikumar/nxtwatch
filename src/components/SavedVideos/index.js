import {Component} from 'react'

import {Link} from 'react-router-dom'

import 'reactjs-popup/dist/index.css'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import TrendingListData from '../TrendingListData'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import SavedVideoContainer from './styledComponent'

import './index.css'

class SavedVideos extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme, savedItem} = value

          let savedata

          if (savedItem.length === 0) {
            savedata = (
              <div className="failure-container-one">
                <img
                  src={
                    isTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
                  }
                  alt="no saved videos"
                  className="failure-view-image-one"
                />
                <h1 className={isTheme ? 'wentwrong' : 'wentwrong1'}>
                  No saved videos found
                </h1>
                <p
                  className={
                    isTheme ? 'wentwrongparagraph' : 'wentwrongparagraph1'
                  }
                >
                  You can save your videos while watching them
                </p>
              </div>
            )
          } else {
            savedata = (
              <div className="mt-3">
                <ul className="unorderlist-itemsavedone">
                  {savedItem.map(each => (
                    <TrendingListData key={each.id} each={each} />
                  ))}
                </ul>
              </div>
            )
          }

          return (
            <div data-testid="savedVideos" className="banner-one">
              <Header />
              <div className="home-container-one">
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
                      Enjoy! Now to see your channels and recommendations!
                    </p>
                  </div>
                </div>

                <SavedVideoContainer
                  data-testid="savedVideos"
                  bgColorstyled={isTheme ? '#f9f9f9' : '#181818'}
                >
                  <div
                    className={
                      isTheme ? 'trending-container' : 'trending-container1'
                    }
                  >
                    <BiListPlus className="fafire-styling" />
                    <h1
                      className={
                        isTheme
                          ? 'Trendingheading pl-2 pt-2'
                          : 'Trendingheading1 pl-2 pt-2'
                      }
                    >
                      Saved Videos
                    </h1>
                  </div>
                  {savedata}
                </SavedVideoContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
