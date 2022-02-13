import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'reactjs-popup/dist/index.css'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import {TrendingContainer, TrendingOne} from './styledComponent'

import TrendingListData from '../TrendingListData'

import './index.css'

const apiStatusChange1 = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {videosListOne: [], apiStatus1: apiStatusChange1.intial}

  componentDidMount() {
    this.getVideosData1()
  }

  handleretryButton = () => {
    this.getVideosData1()
  }

  getVideosData1 = async () => {
    this.setState({apiStatus1: apiStatusChange1.loading})
    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(apiUrl, options)
    if (response1.ok === true) {
      const dataone = await response1.json()

      const {videos} = dataone
      const videosdata1 = videos.map(each => {
        const {channel} = each
        const channeldata = {
          name: channel.name,
          profileImageUrl: channel.profile_image_url,
        }
        return {
          channel: channeldata,
          id: each.id,
          publishedAt: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          title: each.title,
          viewCount: each.view_count,
        }
      })
      this.setState({
        videosListOne: videosdata1,
        apiStatus1: apiStatusChange1.success,
      })
    } else {
      this.setState({
        apiStatus1: apiStatusChange1.failure,
      })
    }
  }

  render() {
    const {videosListOne, apiStatus1} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme} = value

          let videosData1

          if (apiStatus1 === apiStatusChange1.success) {
            videosData1 = (
              <div className="mt-3">
                <ul className="unorderlist-item1">
                  {videosListOne.map(each => (
                    <TrendingListData key={each.id} each={each} />
                  ))}
                </ul>
              </div>
            )
          } else if (apiStatus1 === apiStatusChange1.failure) {
            videosData1 = (
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
          } else if (apiStatus1 === apiStatusChange1.loading) {
            videosData1 = (
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
            videosData1 = null
          }

          return (
            <div data-testid="trending" className="banner-one">
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

                <TrendingContainer
                  data_testid="trending"
                  trendingvalue={isTheme}
                >
                  <TrendingOne trendingnumber={isTheme}>
                    <FaFire className="fafire-styling" />
                    <h1
                      className={
                        isTheme
                          ? 'Trendingheading pl-2 pt-2'
                          : 'Trendingheading1 pl-2 pt-2'
                      }
                    >
                      Trending
                    </h1>
                  </TrendingOne>
                  {videosData1}
                </TrendingContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
