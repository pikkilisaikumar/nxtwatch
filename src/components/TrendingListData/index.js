import {Link} from 'react-router-dom'

import './index.css'

import {BsDot} from 'react-icons/bs'

import {formatDistanceToNow} from 'date-fns'

import ThemeContext from '../../context/NxtWatch'

const TrendingListData = props => {
  const {each} = props

  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = each
  const {name} = channel

  const publishedAtone1 = formatDistanceToNow(new Date(publishedAt))

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isTheme} = value
        return (
          <li className="m-3">
            <Link
              to={`/videos/${id}`}
              className={isTheme ? 'linkitem-one' : 'linkitem-one1'}
            >
              <div className="thumnail-trending-videos-container-list">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumnailstyling"
                />
                <div className="ml-2">
                  <p className={!isTheme && 'title-paragraph'}>{title}</p>
                  <p className={!isTheme && 'title-paragraph'}>{name}</p>
                  <div className="views-publishedcontainer">
                    <p className={!isTheme && 'title-paragraph'}>
                      {viewCount} views
                    </p>
                    <BsDot className={!isTheme && 'title-paragraph'} />
                    <p className={!isTheme && 'title-paragraph'}>
                      {publishedAtone1}
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

export default TrendingListData
