import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isTrue: false,
    errorMsgData: '',
    isCheckboxActive: true,
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  requestSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  requestfailure = errorMsg => {
    this.setState({isTrue: true, errorMsgData: errorMsg})
  }

  onClickedCheckbox = () => {
    this.setState(prevState => ({
      isCheckboxActive: !prevState.isCheckboxActive,
    }))
  }

  submitEventTriggered = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdata = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const requestmethod = {
      method: 'POST',
      body: JSON.stringify(userdata),
    }
    const response = await fetch(apiUrl, requestmethod)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.requestSuccess(jsonData.jwt_token)
    } else if (response.status === 400) {
      this.requestfailure(jsonData.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      isTrue,
      errorMsgData,
      isCheckboxActive,
    } = this.state

    const cookiesgetdata = Cookies.get('jwt_token')

    if (cookiesgetdata !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="background-details-one">
        <div className="white-container-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="lighthemeimageone"
          />
          <form onSubmit={this.submitEventTriggered}>
            <div className="mb-3 mt-3">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                onChange={this.onchangeUsername}
                value={username}
                type="text"
                id="username"
                placeholder="Username"
                className="form-control"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                onChange={this.onchangePassword}
                value={password}
                type={isCheckboxActive ? 'password' : 'text'}
                id="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="checkboxshowpassword">
              <input
                type="checkbox"
                className="checkboxstyling"
                onChange={this.onClickedCheckbox}
                id="checkbox"
              />
              <label className="show-password-paragraph" htmlFor="checkbox">
                Show Password
              </label>
            </div>

            <button type="submit" className="loginbuttonstyling">
              Login
            </button>
            {isTrue && <p className="erromsg-data-styling">*{errorMsgData}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
