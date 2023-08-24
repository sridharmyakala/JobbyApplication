import {Link} from 'react-router-dom'

import {BsFillStarFill, BsFillBagFill} from 'react-icons/bs'

import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const JobsListCard = props => {
  const {jobList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobList

  return (
    <Link to={`/jobs/${id}`} className="link-jobs">
      <li className="job-list-item-container">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h3 className="description-heading">Description</h3>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsListCard
