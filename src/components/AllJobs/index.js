import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import JobsListCard from '../JobsListCard'
import FilterCard from '../FilterCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,

    search: '',
    activeSalaryRangeId: [],
    activeEmploymentTypeId: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })

    const {search, activeEmploymentTypeId, activeSalaryRangeId} = this.state

    const employmentType = activeEmploymentTypeId.join()

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activeSalaryRangeId}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state

    const isTrue = jobsList.length > 0

    return isTrue ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobsListCard key={eachJob.id} jobList={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="empty-list-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
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

  renderJobsView = () => {
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

  changeEmploymentType = id => {
    const {activeEmploymentTypeId} = this.state
    const inputNotInList = activeEmploymentTypeId.filter(
      eachItem => eachItem === id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          activeEmploymentTypeId: [...prevState.activeEmploymentTypeId, id],
        }),
        this.getJobsList,
      )
    } else {
      const filterData = activeEmploymentTypeId.filter(
        eachItem => eachItem !== id,
      )
      this.setState({activeEmploymentTypeId: filterData}, this.getJobsList)
    }
  }

  changeSalaryRange = id => {
    this.setState({activeSalaryRangeId: id}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  render() {
    return (
      <div className="all-jobs-tab-container">
        <div className="filter-profile-card-container">
          <FilterCard
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            changeSalaryRange={this.changeSalaryRange}
            changeEmploymentType={this.changeEmploymentType}
          />
        </div>
        <div className="all-jobs-container">
          <div className="input-search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderJobsView()}
        </div>
      </div>
    )
  }
}

export default AllJobs
