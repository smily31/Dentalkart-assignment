// This component displays the dashboard of application which shows the list of students in a table
// It allows the user to import data from a CSV file, and export data as a JSON file

import React, { useState, useRef, useEffect } from "react";
import "../styles/MainScreen.css";
import csvtojson from "csvtojson";
import { saveAs } from "file-saver";
import { FaFileDownload } from "react-icons/fa";

const MainScreen = () => {
  // Declare state variable to store student data
  const [jsonData, setJsonData] = useState([]);
  // Declare reference to the file input element
  const fileInputRef = useRef();

  // Load student data from local storage when the component mounts
  useEffect(() => {
    const data = localStorage.getItem("StudentData");
    if (data) {
      setJsonData(JSON.parse(data));
    }
  }, []);

  // Handle file  upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      convertCsvToJson(csvData);
    };
    reader.readAsText(file);
  };

  // Convert CSV data to JSON and save to  state
  const convertCsvToJson = (csvData) => {
    csvtojson()
      .fromString(csvData)
      .then((data) => {
        saveJsonToLocalStorage(data);
        setJsonData(data);
      });
  };

  // Save JSON data to local Storage
  const saveJsonToLocalStorage = (data) => {
    localStorage.setItem("StudentData", JSON.stringify(data));
  };

  // Handle the click event for the import button and trigger the file input dialog
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle the export button click event and export data
  const handleExport = () => {
    const data = localStorage.getItem("StudentData");
    const jsonBlob = new Blob([data], { type: "application/json" });
    saveAs(jsonBlob, "studentData.json");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <span className="std">Students</span>
            <span className="para">
              List of all the students in the database
            </span>
          </div>
          <div className="col-2">
            <button className="btn imp-btn" onClick={handleButtonClick}>
              Import Students
            </button>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <button className="btn exp-btn" onClick={handleExport}>
              {" "}
              <FaFileDownload className="icon" /> Export as CSV
            </button>
          </div>
        </div>
        <table className="outer-box">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Address</th>
              <th>Institute</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map((student, index) => (
              <tr key={index}>
                <td>{student.Name}</td>
                <td>{student.Roll_No}</td>
                <td>{student.Address}</td>
                <td>{student.Institute}</td>
                <td>{student.Course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainScreen;
