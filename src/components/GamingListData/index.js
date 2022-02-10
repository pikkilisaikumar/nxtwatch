import {Link} from 'react-router-dom'

import './index.css'

import ThemeContext from '../../context/NxtWatch'

const GamingListData = props => {
  const {eachone} = props

  const {id, thumbnailUrl, title, viewCount} = eachone

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isTheme} = value
        return (
          <li className="m-3">
            <Link
              to={`/videos/${id}`}
              className={
                isTheme ? 'list-items-onegaming' : 'list-items-onegaming1'
              }
            >
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumnail-video-url"
              />
              <p
                className={
                  isTheme
                    ? 'titleparagraphgaming pt-2'
                    : 'titleparagraphgaming1 pt-2'
                }
              >
                {title}
              </p>
              <p
                className={
                  isTheme ? 'titleparagraphgaming' : 'titleparagraphgaming1'
                }
              >
                {viewCount} Watching Worldwide
              </p>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingListData
