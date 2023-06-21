import React, { useState, useEffect } from "react";
import Header from "../utils/Header";

function Api() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(50);
  const [filterCriteria, setFilterCriteria] = useState({
    areaSmallerThanLithuania: false,
    region: "",
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filterCriteria]);

  async function getData() {
    const apiUrl = "https://restcountries.com/v2/all?fields=name,region,area";
    const result = await fetch(apiUrl);
    const data = await result.json();
    setData(data);
    setFilteredData(data);
  }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredData.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredData.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = () => {
    let newData = [...data];

    if (filterCriteria.areaSmallerThanLithuania) {
      const lithuaniaCountry = newData.find(
        (country) => country.name === "Lithuania"
      );
      const lithuaniaArea = lithuaniaCountry ? lithuaniaCountry.area : 0;
      newData = newData.filter((country) => country.area < lithuaniaArea);
    }

    if (filterCriteria.region !== "") {
      newData = newData.filter(
        (country) => country.region === filterCriteria.region
      );
    }

    setFilteredData(newData);
    setCurrentPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedFilterCriteria = { ...filterCriteria };

    if (type === "checkbox") {
      updatedFilterCriteria[name] = checked;
    } else {
      updatedFilterCriteria[name] = value;
    }

    setFilterCriteria(updatedFilterCriteria);
  };

  return (
    <>
      <div className="filter-container">
        <Header />
        <div className="region-container">
          <label htmlFor="filterRegion">Region:</label>
          <select
            id="filterRegion"
            name="region"
            value={filterCriteria.region}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Europe">Europe</option>
          </select>
        </div>

        <div className="toggle-container">
          <label htmlFor="filterArea">Filter area smaller than Lithuania</label>
          <input
            className="toggle-input"
            id="filterArea"
            name="areaSmallerThanLithuania"
            type="checkbox"
            checked={filterCriteria.areaSmallerThanLithuania}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Area size</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country, idx) => (
              <tr className="country-item" key={idx}>
                <td>{country.name}</td>
                <td className="region-cell">{country.region}</td>
                <td>{country.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div className="page-container">
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          &laquo;
        </button>
        <div>
          {pageNumbers.map((pageNumber) => (
            <button
              className={`${
                pageNumber === currentPage ? "pages-highlighted" : ""
              }`}
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextClick}
          disabled={currentPage === pageNumbers.length}
        >
          &raquo;
        </button>
      </div>
    </>
  );
}

export default Api;
