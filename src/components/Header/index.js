import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'

import {WiDaySunny} from 'react-icons/wi'

import Popup from 'reactjs-popup'

import ThemeContext from '../../context/NxtWatch'

import 'reactjs-popup/dist/index.css'

import './index.css'

const Headers = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isTheme, changeTheme} = value

      const themeImageClicked = () => {
        changeTheme()
      }

      const clickConfirmBtn = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <>
          <div
            className={
              isTheme ? 'header-nav-container' : 'header-nav-container1'
            }
          >
            <nav>
              {isTheme ? (
                <Link to="/" className="watch-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="nxt-watch-styling-one"
                  />
                </Link>
              ) : (
                <Link to="/" className="watch-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="nxt-watch-styling-one"
                  />
                </Link>
              )}
            </nav>
            <div className="logout-container-one">
              {isTheme ? (
                <button
                  type="button"
                  data-testid="theme"
                  className="theme-button-one"
                  onClick={themeImageClicked}
                >
                  <FaMoon className="himoonstyling" />
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="theme"
                  className="theme-button-one"
                  onClick={themeImageClicked}
                >
                  <WiDaySunny className="himoonstyling1" />
                </button>
              )}
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-styling ml-3 mr-2"
              />
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className="close-container-react-popup">
                    <div>
                      <p className="logoutquestion-paragraph">
                        Are you sure, you want to logout
                      </p>
                    </div>
                    <div className="cancel-confirm-container-button">
                      <button
                        type="button"
                        className="trigger-button btn btn-danger mr-3"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={clickConfirmBtn}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Headers)
