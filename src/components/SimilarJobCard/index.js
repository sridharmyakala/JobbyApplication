import {BsFillStarFill, BsFillBagFill} from 'react-icons/bs'

import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobCard = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob

  return (
    <li className="similar-job-list-container">
      <div className="logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <h3 className="description-heading">Description</h3>
      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobCard
