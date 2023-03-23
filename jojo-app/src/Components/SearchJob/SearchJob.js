import "./SearchJob.less";
import { useState } from "react";

export default function SearchJob(props) {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [workType, setWorkType] = useState("");
  const [benefits, setBenefits] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    let url = "?";
    if (keywords !== "") {
      url += `keyword=${keywords}&`;
    }
    if (location !== "") {
      url += `Location=${location}&`;
    }
    if (category !== "") {
      url += `Category=${category}&`;
    }
    if (workTime !== "") {
      url += `workTime=${workTime}&`;
    }
    if (workType !== "") {
      url += `workType=${workType}&`;
    }

    let newSearch = { url: url, data: benefits };
    props.onSearchChange(newSearch);
  };

  const onSearchChange = (e) => {
    if (e.target.id === "keywordSearch") {
      setKeywords(e.target.value);
    } else if (e.target.id === "locationSearch") {
      setLocation(e.target.value);
    } else if (e.target.id === "categoriesSearch") {
      setCategory(e.target.value);
    } else if (e.target.id === "workTimeSearch") {
      setWorkTime(e.target.value);
    } else if (e.target.id === "workTypeSearch") {
      setWorkType(e.target.value);
    }
  };

  const onCheckChange = (e) => {
    if (e.target.checked) {
      setBenefits([...benefits, e.target.name]);
    } else {
      setBenefits(benefits.filter((benefit) => benefit !== e.target.name));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="jobPostsSearch">
        <label htmlFor="keywordSearch" className="label-search">
          Search by Keywords
        </label>
        <input
          id="keywordSearch"
          className="searchBar"
          placeholder="Search.."
          onChange={onSearchChange}
        ></input>
        <label htmlFor="locationSearch" className="label-search">
          Location
        </label>
        <input
          id="locationSearch"
          className="searchBar"
          placeholder="Search.."
          onChange={onSearchChange}
        ></input>

        <label htmlFor="categoriesSearch" className="label-search">
          Category
        </label>
        <select
          name="categoriesSearch"
          id="categoriesSearch"
          onChange={onSearchChange}
          defaultValue=""
        >
          <option value="">Select Category..</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Database Design">Database Design</option>
        </select>

        <label htmlFor="workTimeSearch" className="label-search">
          Work Hours
        </label>
        <select
          name="workTimeSearch"
          id="workTimeSearch"
          onChange={onSearchChange}
          defaultValue=""
        >
          <option value="">Select Work Hours..</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <label htmlFor="workTypeSearch" className="label-search">
          Work Type
        </label>
        <select
          name="workTypeSearch"
          id="workTypeSearch"
          onChange={onSearchChange}
          defaultValue=""
        >
          <option value="">Select Work Type..</option>
          <option value="Remote">Remote</option>
          <option value="InPerson">In Person</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label className="label-search">Benefits</label>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            name="Dental Care"
            onChange={onCheckChange}
            id="dentalCare"
          ></input>
          <label htmlFor="dentalCare">Dental Care</label>
        </div>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            name="Insurance"
            onChange={onCheckChange}
            id="insurance"
          ></input>
          <label htmlFor="insurance">Insurance</label>
        </div>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            name="Paid Time Off"
            onChange={onCheckChange}
            id="paidTimeOff"
          ></input>
          <label htmlFor="paidTimeOff">Paid Time Off</label>
        </div>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            name="Pension"
            onChange={onCheckChange}
            id="pension"
          ></input>
          <label htmlFor="pension">Pension</label>
        </div>
        <button className="submit-button" type="submit">
          Find The Job
        </button>
      </div>
    </form>
  );
}
