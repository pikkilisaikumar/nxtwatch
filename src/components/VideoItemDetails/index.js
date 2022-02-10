import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import {formatDistanceToNow} from 'date-fns'

import Loader from 'react-loader-spinner'

import 'reactjs-popup/dist/index.css'

import {BsDot} from 'react-icons/bs'

import {FaFire} from 'react-icons/fa'

import {BiListPlus} from 'react-icons/bi'
import {AiOutlineHome, AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import VideoItemDetailsContainer from './styledComponent'

import ThemeContext from '../../context/NxtWatch'

import Header from '../Header'

import './index.css'

const apiStatusChange3 = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class VideoItemDetails extends Component {
  state = {
    particularVideo: {},
    apiStatus3: apiStatusChange3.intial,
    isActiveLike: true,
    isDisLike: true,
  }

  componentDidMount() {
    this.getVideosData3()
  }

  onLikeHandleClick = () => {
    const {isActiveLike, isDisLike} = this.state

    if (isActiveLike === true && isDisLike === true) {
      this.setState({isActiveLike: false, isDisLike: true})
    } else if (isActiveLike === false && isDisLike === true) {
      this.setState({isActiveLike: true, isDisLike: true})
    } else if (isActiveLike === true && isDisLike === false) {
      this.setState({isActiveLike: false, isDisLike: true})
    }
  }

  onDisLikeHandleClick = () => {
    const {isActiveLike, isDisLike} = this.state
    if (isDisLike === true && isActiveLike === true) {
      this.setState({isDisLike: false, isActiveLike: true})
    } else if (isDisLike === false && isActiveLike === true) {
      this.setState({isDisLike: true, isActiveLike: true})
    } else if (isActiveLike === false && isDisLike === true) {
      this.setState({isActiveLike: true, isDisLike: false})
    }
  }

  handleretryButton = () => {
    this.getVideosData3()
  }

  getVideosData3 = async () => {
    this.setState({apiStatus3: apiStatusChange3.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response3 = await fetch(apiUrl, options)
    if (response3.ok === true) {
      const videoDetails = await response3.json()

      const videosdata = {
        videosOne: videoDetails.video_details,
      }
      const {videosOne} = videosdata
      const particularVideo = {
        channel: videosOne.channel,
        description: videosOne.description,
        id: videosOne.id,
        publishedAt: videosOne.published_at,
        thumbnailUrl: videosOne.thumbnail_url,
        title: videosOne.title,
        videoUrl: videosOne.video_url,
        viewCount: videosOne.view_count,
      }

      const {channel} = particularVideo
      const channeldataone = {
        name: channel.name,
        profileImageUrl: channel.profile_image_url,
        subscriberCount: channel.subscriber_count,
      }
      const overallvideodata = {
        ...particularVideo,
        channel: channeldataone,
        isTrue: true,
      }
      //   console.log(overallvideodata)
      this.setState({
        particularVideo: overallvideodata,
        apiStatus3: apiStatusChange3.success,
      })
    } else {
      this.setState({
        apiStatus3: apiStatusChange3.failure,
      })
    }
  }

  render() {
    const {apiStatus3, isActiveLike, isDisLike} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isTheme, addSavedItem, isSaved} = value

          let videosData3

          if (apiStatus3 === apiStatusChange3.success) {
            const {particularVideo} = this.state
            const saveButtonone = () => {
              addSavedItem({...particularVideo})
            }
            const {
              publishedAt,
              viewCount,
              videoUrl,
              title,
              description,
              channel,
            } = particularVideo

            const {profileImageUrl, name, subscriberCount} = channel

            const publishedAtone1 = formatDistanceToNow(new Date(publishedAt))

            videosData3 = (
              <div className="mt-3 ml-2 video-relaed-container-one">
                <div className="responsive-container">
                  <ReactPlayer url={videoUrl} height="420px" width="90%" />
                </div>
                <div>
                  <p
                    className={
                      isTheme
                        ? 'title-paragraph-one pt-2 pb-2'
                        : 'title-paragraph-one1 pt-2 pb-2'
                    }
                  >
                    {title}
                  </p>
                  <div className="view-year-likedislike-container">
                    <div className="view-year-related-container">
                      <p
                        className={
                          isTheme
                            ? 'title-paragraph-one'
                            : 'title-paragraph-one1'
                        }
                      >
                        {viewCount} views
                      </p>
                      <BsDot
                        className={
                          isTheme
                            ? 'title-paragraph-one'
                            : 'title-paragraph-one1'
                        }
                      />
                      <p
                        className={
                          isTheme
                            ? 'title-paragraph-one'
                            : 'title-paragraph-one1'
                        }
                      >
                        {publishedAtone1}
                      </p>
                    </div>
                    <div className="like-dislike-save-container-one mr-3">
                      <div className="mr-3 icons-container-one">
                        <AiOutlineLike
                          className={
                            isActiveLike ? 'Likebtn mt-1' : 'Likebtn1 mt-1'
                          }
                        />
                        <button
                          type="button"
                          className={isActiveLike ? 'Likebtn' : 'Likebtn1'}
                          onClick={this.onLikeHandleClick}
                        >
                          Like
                        </button>
                      </div>
                      <div className="mr-3 icons-container-one">
                        <AiOutlineDislike
                          className={
                            isDisLike ? 'Likebtn mt-1' : 'Likebtn1 mt-1'
                          }
                        />
                        <button
                          type="button"
                          onClick={this.onDisLikeHandleClick}
                          className={isDisLike ? 'Likebtn' : 'Likebtn1'}
                        >
                          Dislike
                        </button>
                      </div>
                      <div className="mr-3 icons-container-one">
                        {isSaved ? (
                          <BiListPlus className="mt-1 saveicon" />
                        ) : (
                          <BiListPlus className="mt-1 saveicon1" />
                        )}
                        {isSaved ? (
                          <button
                            type="button"
                            className="save-button"
                            onClick={saveButtonone}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="save-button1"
                            onClick={saveButtonone}
                          >
                            Saved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className={isTheme ? 'hrline' : 'hrline1'} />
                  <div className="container-image-url mb-3">
                    <img
                      src={profileImageUrl}
                      alt="channel logo"
                      className="profile-imageurl-one"
                    />
                    <div className="ml-2">
                      <p
                        className={
                          isTheme
                            ? 'title-paragraph-one'
                            : 'title-paragraph-one1'
                        }
                      >
                        {name}
                      </p>
                      <p
                        className={
                          isTheme
                            ? 'title-paragraph-one'
                            : 'title-paragraph-one1'
                        }
                      >
                        {subscriberCount} subscribers
                      </p>
                      <p
                        className={
                          isTheme
                            ? 'title-paragraph-one pt-3'
                            : 'title-paragraph-one1 pt-3'
                        }
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else if (apiStatus3 === apiStatusChange3.failure) {
            videosData3 = (
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
                  We are having some trouble to complete your request. Please
                  try again.
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
          } else if (apiStatus3 === apiStatusChange3.loading) {
            videosData3 = (
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
            videosData3 = null
          }

          return (
            <div data-testid="videoItemDetails" className="banner-one">
              <Header />

              <div className="home-container-one" data-testid="trending">
                <div
                  className={
                    isTheme ? 'left-side-container' : 'left-side-container1'
                  }
                >
                  <ul>
                    <Link to="/">
                      <li
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
                      </li>
                    </Link>
                    <Link to="/trending">
                      <li
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
                      </li>
                    </Link>
                    <Link to="/gaming">
                      <li
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
                      </li>
                    </Link>
                    <Link to="/saved-videos">
                      <li
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
                      </li>
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

                <VideoItemDetailsContainer
                  data-testid="videoItemDetails"
                  bgColorvideoItem={isTheme ? '#f9f9f9' : '#181818'}
                >
                  {videosData3}
                </VideoItemDetailsContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
