import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'reactjs-popup/dist/index.css'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import GamingContainer from './styledComponent'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import GamingListData from '../GamingListData'

import './index.css'

const apiStatusChange2 = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Gaming extends Component {
  state = {videosListOnedata: [], apiStatus2: apiStatusChange2.intial}

  componentDidMount() {
    this.getVideosData2()
  }

  handleretryButton = () => {
    this.getVideosData2()
  }

  getVideosData2 = async () => {
    this.setState({apiStatus2: apiStatusChange2.loading})
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response2 = await fetch(apiUrl, options)
    if (response2.ok === true) {
      const dataone1 = await response2.json()

      const {videos} = dataone1
      const videosdata2 = videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        videosListOnedata: videosdata2,
        apiStatus2: apiStatusChange2.success,
      })
    } else {
      this.setState({
        apiStatus2: apiStatusChange2.failure,
      })
    }
  }

  render() {
    const {videosListOnedata, apiStatus2} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme} = value

          let videosData2

          if (apiStatus2 === apiStatusChange2.success) {
            videosData2 = (
              <div className="mt-3">
                <ul className="unorderlist-item2">
                  {videosListOnedata.map(eachone => (
                    <GamingListData key={eachone.id} eachone={eachone} />
                  ))}
                </ul>
              </div>
            )
          } else if (apiStatus2 === apiStatusChange2.failure) {
            videosData2 = (
              <div className="failure-container-one">
                <img
                  src={
                    isTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  }
                  alt="failure view"
                  className="failure-view-image-one"
                />
                <h1 className={isTheme ? 'wentwrong' : 'wentwrong1'}>
                  Oops! Something Went Wrong
                </h1>
                <p
                  className={
                    isTheme ? 'wentwrongparagraph' : 'wentwrongparagraph1'
                  }
                >
                  We are having some trouble to complete your request.Please try
                  again.
                </p>
                <button
                  type="button"
                  className="retrybtn"
                  onClick={this.handleretryButton}
                >
                  Retry
                </button>
              </div>
            )
          } else if (apiStatus2 === apiStatusChange2.loading) {
            videosData2 = (
              <div className="failure-container-one">
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#4f46e5"
                    height="50"
                    width="50"
                  />
                </div>
              </div>
            )
          } else {
            videosData2 = null
          }

          return (
            <div data-testid="gaming" className="banner-one">
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
                      Enjoy! Now to see your channels and recommendations!
                    </p>
                  </div>
                </div>

                <GamingContainer data-testid="gaming" bgColorGaming={isTheme}>
                  <div
                    className={
                      isTheme ? 'trending-container' : 'trending-container1'
                    }
                  >
                    <SiYoutubegaming className="fafire-styling" />
                    <h1
                      className={
                        isTheme
                          ? 'Trendingheading pl-2 pt-2'
                          : 'Trendingheading1 pl-2 pt-2'
                      }
                    >
                      Gaming
                    </h1>
                  </div>
                  {videosData2}
                </GamingContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
