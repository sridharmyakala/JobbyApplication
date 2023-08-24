import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccessfully = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccessfully(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="responsive-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="input"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
