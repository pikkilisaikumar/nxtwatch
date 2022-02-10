import {Link} from 'react-router-dom'

import './index.css'

import {BsDot} from 'react-icons/bs'

import {formatDistanceToNow} from 'date-fns'

import ThemeContext from '../../context/NxtWatch'

const HomeListData = props => {
  const {each} = props

  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = each
  const {name, profileImageUrl} = channel

  const publishedAtone = formatDistanceToNow(new Date(publishedAt))
  //   console.log(publishedAt)
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isTheme} = value
        return (
          <li className="m-3  videoscontainer-one">
            <Link to={`/videos/${id}`} className="link-item-home-data">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumnail-image-url mb-2"
              />
              <div className="channel-details-container-content">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="channellogo-profile mr-2"
                />
                <div>
                  <p
                    className={!isTheme ? 'titleparagraph' : 'titleparagraph1'}
                  >
                    {title}
                  </p>
                  <p
                    className={!isTheme ? 'titleparagraph' : 'titleparagraph1'}
                  >
                    {name}
                  </p>
                  <div className="view-publishedcontainer">
                    <p
                      className={
                        isTheme ? 'titleparagraph1 pr-2' : 'titleparagraph pr-2'
                      }
                    >
                      {viewCount} views
                    </p>
                    <BsDot
                      className={
                        isTheme ? 'titleparagraph1 mt-2' : 'titleparagraph mt-2'
                      }
                    />
                    <p
                      className={
                        !isTheme ? 'titleparagraph' : 'titleparagraph1'
                      }
                    >
                      {publishedAtone}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeListData
