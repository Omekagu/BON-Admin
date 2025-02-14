import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const propertiesData = [
  {
    name: "BON Hotel Abuja",
    stars: 4,
    id: "2336690",
    location: "Abuja NGA",
    contentScore: "93%",
    status: "Bookable",
  },
  {
    name: "BON Hotel Asokoro Residence",
    stars: 3.5,
    id: "95841895",
    location: "Abuja NGA",
    contentScore: "69%",
    status: "Not bookable",
  },
  {
    name: "BON Hotel Elvis",
    stars: 4,
    id: "32939370",
    location: "Abuja NGA",
    contentScore: "100%",
    status: "Bookable",
  },
  {
    name: "BON Hotel Hyatt Warri",
    stars: 3,
    id: "96173016",
    location: "Warri, Delta NGA",
    contentScore: "72%",
    status: "Bookable",
  },
  {
    name: "BON Hotel Ikeja Residence",
    stars: 3.5,
    id: "44223163",
    location: "Lagos, Lagos NGA",
    contentScore: "81%",
    status: "Not bookable",
  },
  {
    name: "BON Hotel Imperial Wuse Abuja",
    stars: 4,
    id: "45678912",
    location: "Abuja NGA",
    contentScore: "85%",
    status: "Bookable",
  },
];

const PropertyList = () => {
  const [search, setSearch] = useState("");

  // Filter properties based on search input
  const filteredProperties = propertiesData.filter(
    (property) =>
      property.name.toLowerCase().includes(search.toLowerCase()) ||
      property.id.includes(search)
  );

  return (
    <div className="property-list">
         <div className="property-header">
      <div className="property-create" onClick={() => Navigate("/create-property")}>
        <h3>Create property</h3>
      </div>

      <h2 className="property-all">All properties</h2>
    </div>


      

      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Property name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Desktop View: Table */}
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Content Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((property, index) => (
            <tr key={index}>
              <td>
                <div className="property-info">
                  <div className="property-name">{property.name}</div>
                  <div className="stars">
                    {"★".repeat(Math.floor(property.stars))}
                    {property.stars % 1 !== 0 ? "½" : ""}
                  </div>
                  <div className="property-details">
                    ID: {property.id} <br />
                    {property.location}
                  </div>
                </div>
              </td>
              <td className="content-score">{property.contentScore}</td>
              <td className={`status ${property.status === "Bookable" ? "bookable" : "not-bookable"}`}>
                {property.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View: Cards */}
      {/* {filteredProperties.map((property, index) => (
        <div key={index} className="property-card">
          <div className="property-info">
            <div className="property-name">{property.name}</div>
            <div className="stars">
              {"★".repeat(Math.floor(property.stars))}
              {property.stars % 1 !== 0 ? "½" : ""}
            </div>
            <div className="property-details">
              ID: {property.id} <br />
              {property.location}
            </div>
          </div>
          <div className="content-score">{property.contentScore}</div>
          <div className={`status ${property.status === "Bookable" ? "bookable" : "not-bookable"}`}>
            {property.status}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default PropertyList;
