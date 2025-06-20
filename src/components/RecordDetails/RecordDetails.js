// src/components/RecordDetails/RecordDetails.js
import React from "react";
import "./recordDetails.css"; // if you have CSS

const RecordDetails = ({ record }) => {
  if (!record) return <div>No record selected</div>;

  return (
    <div className="record-details">
      <h2>Record Details</h2>
      <p><strong>ID:</strong> {record.id}</p>
      <p><strong>Name:</strong> {record.name}</p>
      <p><strong>Age:</strong> {record.age}</p>
      <p><strong>Gender:</strong> {record.gender}</p>
      <p><strong>Blood Type:</strong> {record.bloodType}</p>
      <p><strong>Allergies:</strong> {record.allergies}</p>
      <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
      <p><strong>Treatment:</strong> {record.treatment}</p>
    </div>
  );
};

export default RecordDetails;
