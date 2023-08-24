import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {apiStatus: apiStatusConstant.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstant.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    console.log(profileDetails)
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-url" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileView()
  }
}

export default ProfileCard
