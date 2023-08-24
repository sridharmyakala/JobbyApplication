import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiTwotoneHome} from 'react-icons/ai'

import {BsFillBagFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="nave-header">
      <nav className="nave-item">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </Link>

        <ul className="desktop-list-container">
          <li className="list-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="list-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
        <ul className="mobile-list-container">
          <li className="list-item">
            <Link to="/" className="nav-link">
              <AiTwotoneHome size={20} color="#fff" />
            </Link>
          </li>
          <li className="list-item">
            <Link to="/jobs" className="nav-link">
              <BsFillBagFill size={20} color="#fff" />
            </Link>
          </li>
          <li className="list-item">
            <button
              type="button"
              className="logout-log-button"
              onClick={onClickLogout}
            >
              <FiLogOut size={20} color="#fff" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
