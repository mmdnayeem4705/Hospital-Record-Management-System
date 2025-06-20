// src/components/RecordsList.js
import React from "react";
import { useSelector } from "react-redux";

function RecordsList() {
  // Get the records from Redux store (or use local state if applicable)
  const records = useSelector((state) => state.records?.data || []);

  // Optional: You can also load static data from medicalrecord.json
  // import medicalData from '../data/medicalrecord.json'; and combine here

  function decorateOrder(record) {
    if (!record || !record.recordId) return null; // Skip invalid records

    return {
      ...record,
      timestamp: new Date(record.timestamp * 1000).toLocaleString(),
    };
  }

  return (
    <div>
      <h2>Medical Records</h2>
      {records.map((record) => {
        const decorated = decorateOrder(record);
        if (!decorated) return null;

        return (
          <div key={decorated.recordId} className="record-card">
            <h4>{decorated.name}</h4>
            <p><strong>Diagnosis:</strong> {decorated.diagnosis}</p>
            <p><strong>Timestamp:</strong> {decorated.timestamp}</p>
          </div>
        );
      })}
    </div>
  );
}

export default RecordsList;
