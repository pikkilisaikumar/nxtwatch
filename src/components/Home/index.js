import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'reactjs-popup/dist/index.css'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdSearch} from 'react-icons/io'
import {MdClose} from 'react-icons/md'

import HomeListData from '../HomeListData'

import {HomeContainer, BannerCardContainer} from './styledComponent'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import './index.css'

const apiStatusChange = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    searchData: '',
    videosList: [],
    apiStatus: apiStatusChange.intial,
    isClosed: true,
  }

  componentDidMount() {
    this.getVideosData()
  }

  onCloseHandleOne = () => {
    this.setState({isClosed: false})
  }

  handleSearchData = event => {
    this.setState({searchData: event.target.value})
  }

  onHandleSearch = () => {
    const {searchData} = this.state
    this.setState({searchData}, this.getVideosData)
  }

  handleretryButton = () => {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({apiStatus: apiStatusChange.loading})
    const {searchData} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchData}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const {videos} = data
      const videosdata = videos.map(each => {
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
        videosList: videosdata,
        apiStatus: apiStatusChange.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusChange.failure,
      })
    }
  }

  render() {
    const {searchData, videosList, apiStatus, isClosed} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme} = value

          let videosData

          if (apiStatus === apiStatusChange.success) {
            if (videosList.length === 0) {
              videosData = (
                <div className="failure-container-one">
                  <img
                    src={
                      isTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
                    }
                    alt="no videos"
                    className="failure-view-image-one"
                  />
                  <h1
                    className={isTheme ? 'wentwrong pt-2' : 'wentwrong1 pt-2'}
                  >
                    No Search results found
                  </h1>
                  <p
                    className={
                      isTheme
                        ? 'wentwrongparagraph pt-2'
                        : 'wentwrongparagraph1 pt-2'
                    }
                  >
                    Try different key words or remove search filter
                  </p>
                  <button
                    type="button"
                    className="retrybtn mt-2"
                    onClick={this.handleretryButton}
                  >
                    Retry
                  </button>
                </div>
              )
            } else {
              videosData = (
                <div className="mt-3">
                  <ul className="unorderlist-item">
                    {videosList.map(each => (
                      <HomeListData key={each.id} each={each} />
                    ))}
                  </ul>
                </div>
              )
            }
          } else if (apiStatus === apiStatusChange.failure) {
            videosData = (
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
          } else if (apiStatus === apiStatusChange.loading) {
            videosData = (
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
            videosData = null
          }

          return (
            <div data-testid="banner" className="banner-one">
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

                <HomeContainer
                  data-testid="home"
                  bgColor={isTheme ? '#f9f9f9' : '#181818'}
                >
                  <div
                    className={
                      isTheme
                        ? 'pop-up-details-container'
                        : 'pop-up-details-container1'
                    }
                  >
                    {isClosed && (
                      <BannerCardContainer data-testid="banner">
                        <div>
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                          />
                          <p>
                            Buy Nxt Watch Premium prepaid plans with <br />
                            UPI
                          </p>
                          <button type="button">GET IT NOW</button>
                        </div>
                        <button
                          type="button"
                          data-testid="close"
                          className="close-button-one mr-2"
                          onClick={this.onCloseHandleOne}
                        >
                          <MdClose />
                        </button>
                      </BannerCardContainer>
                    )}
                  </div>
                  <div>
                    <div className="search-container-one ml-3 mt-3">
                      <input
                        type="search"
                        placeholder="Search"
                        className="form-control inputelementsearch"
                        value={searchData}
                        onChange={this.handleSearchData}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="searchbuttonone ml-2"
                        onClick={this.onHandleSearch}
                      >
                        <IoMdSearch />
                      </button>
                    </div>
                    {videosData}
                  </div>
                </HomeContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
