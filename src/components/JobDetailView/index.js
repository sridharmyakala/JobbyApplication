import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill, BsFillBagFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobDetailView extends Component {
  state = {
    jobDetailList: [],
    similarJobs: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updateJobDetails = [fetchedData.job_details].map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
      }))

      const updateSimilarJobsList = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        similarJobs: updateSimilarJobsList,
        jobDetailList: updateJobDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetailList, similarJobs} = this.state
    if (jobDetailList.length >= 1) {
      const {
        companyLogoUrl,
        employmentType,
        jobDescription,
        location,
        packagePerAnnum,
        rating,
        title,
        skills,
        lifeAtCompany,
        companyWebsiteUrl,
      } = jobDetailList[0]

      const {description, imageUrl} = lifeAtCompany

      return (
        <div className="job-details-view-container">
          <div className="job-list-item-container">
            <div className="logo-title-rating-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <BsFillStarFill className="start-icon" />
                  <p className="job-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="location-employment-type-salary-container">
                <div className="location-employment-type-container">
                  <div className="location-container">
                    <IoLocationSharp className="location-icon" />
                    <p className="job-location">{location}</p>
                  </div>
                  <div className="employment-type-container">
                    <BsFillBagFill className="bag-icon" />
                    <p className="job-type">{employmentType}</p>
                  </div>
                </div>
                <p className="job-salary">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="separator" />
            <div className="description-anchor-container">
              <h3 className="description-heading">Description</h3>
              <div>
                <a href={companyWebsiteUrl} className="anchor">
                  Visit
                </a>
                <BsBoxArrowUpRight color="#6366f1" size={20} />
              </div>
            </div>

            <p className="job-description">{jobDescription}</p>

            <h3 className="skills">Skills</h3>
            <ul className="skills-container">
              {skills.map(each => (
                <li className="skill-image-name-container" key={each.id}>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skills-img"
                  />
                  <p className="skills-name">{each.name}</p>
                </li>
              ))}
            </ul>
            <h3 className="life-at-company">Life at Company</h3>
            <div className="life-at-company-container">
              <p className="description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
          <h3 className="similar-jobs">Similar Jobs</h3>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachSimilar => (
              <SimilarJobCard similarJob={eachSimilar} key={eachSimilar.id} />
            ))}
          </ul>
        </div>
      )
    }
    return null
  }

  onClickRetryButton = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailedView = () => {
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
    return (
      <div className="job-details-container">
        <Header />

        {this.renderJobDetailedView()}
      </div>
    )
  }
}

export default JobDetailView
