import ProfileCard from '../ProfileCard'

import './index.css'

const FilterCard = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const onChangeCheckBox = event => {
    changeEmploymentType(event.target.value)
  }

  const onChangeRadio = event => {
    changeSalaryRange(event.target.value)
  }

  return (
    <div className="filter-card-container">
      <ProfileCard />

      <hr className="separator" />
      <h1 className="title-filter">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="list-item-container">
            <input
              type="checkbox"
              value={each.employmentTypeId}
              className="check-box"
              onChange={onChangeCheckBox}
            />
            <label className="label">{each.label}</label>
          </li>
        ))}
      </ul>

      <hr className="separator" />
      <h1 className="title-filter">Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="list-item-container">
            <input
              type="radio"
              name="radio"
              className="radio"
              value={each.salaryRangeId}
              onChange={onChangeRadio}
            />
            <label className="label">{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterCard
