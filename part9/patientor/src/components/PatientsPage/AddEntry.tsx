/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { EntryType, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry, Entries } from "../../types";
import patientsService from '../../services/patients';

interface prop {
    id: string | undefined
}

const EntryForm = (props: prop) => {
    const [entryType, setEntryType] = useState<EntryType>("OccupationalHealthcare");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: "",
      type: entryType,
    });
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleEntryTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newType = e.target.value as EntryType;
      setEntryType(newType);
      setFormData((prev: any) => ({
        ...prev,
        type: newType,
      }));
    };
  
    const toggleExpand = () => {
      setIsExpanded((prev) => !prev);
    };
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const diagnosisCodes = formData.diagnosisCodes
        ? formData.diagnosisCodes.split(",").map((code: string) => code.trim())
        : undefined;
  
      let entry: Entries;
  
      if (entryType === "OccupationalHealthcare") {
        entry = {
          description: formData.description,
          date: formData.date,
          specialist: formData.specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare",
          ...(formData.employerName && { employerName: formData.employerName }),
          ...(formData.sickLeaveStart &&
            formData.sickLeaveEnd && {
              sickLeave: {
                startDate: formData.sickLeaveStart,
                endDate: formData.sickLeaveEnd,
              },
            }),
        } as OccupationalHealthcareEntry;
      } else if (entryType === "Hospital") {
        entry = {
          description: formData.description,
          date: formData.date,
          specialist: formData.specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: {
            date: formData.dischargeDate,
            criteria: formData.dischargeCriteria,
          },
        } as HospitalEntry;
      } else {
        entry = {
          description: formData.description,
          date: formData.date,
          specialist: formData.specialist,
          diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating: Number(formData.healthCheckRating),
        } as HealthCheckEntry;
      }
  
      await patientsService.addPatientEntry(entry, props.id);
      setFormData({
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: "",
            type: entryType,
          });
    setIsExpanded(false);
    };
  
    // Simple inline styles for the form and elements
    const formContainerStyle: React.CSSProperties = {
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "5px",
      margin: "1rem 0",
      backgroundColor: "#f9f9f9",
    };
  
    const labelStyle: React.CSSProperties = {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    };
  
    const inputStyle: React.CSSProperties = {
      width: "100%",
      padding: "0.5rem",
      marginBottom: "1rem",
      borderRadius: "3px",
      border: "1px solid #ccc",
    };
  
    const buttonStyle: React.CSSProperties = {
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "3px",
      backgroundColor: "#007BFF",
      color: "#fff",
      cursor: "pointer",
      marginRight: "0.5rem",
    };
  
    const toggleButtonStyle: React.CSSProperties = {
      ...buttonStyle,
      backgroundColor: "#28a745",
    };
  
    return (
      <div>
        <button style={toggleButtonStyle} onClick={toggleExpand}>
          {isExpanded ? "Close Form" : "Add New Entry"}
        </button>
        {isExpanded && (
          <form onSubmit={handleSubmit} style={formContainerStyle}>
            <h2>Add New Entry</h2>
            <div>
              <label htmlFor="type" style={labelStyle}>Entry Type:</label>
              <select
                name="type"
                id="type"
                value={entryType}
                onChange={handleEntryTypeChange}
                style={inputStyle}
              >
                <option value="OccupationalHealthcare">Occupational Healthcare</option>
                <option value="Hospital">Hospital</option>
                <option value="HealthCheck">Health Check</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" style={labelStyle}>Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="date" style={labelStyle}>Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="specialist" style={labelStyle}>Specialist:</label>
              <input
                type="text"
                name="specialist"
                id="specialist"
                value={formData.specialist}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="diagnosisCodes" style={labelStyle}>
                Diagnosis Codes (comma separated):
              </label>
              <input
                type="text"
                name="diagnosisCodes"
                id="diagnosisCodes"
                value={formData.diagnosisCodes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            {entryType === "OccupationalHealthcare" && (
              <>
                <div>
                  <label htmlFor="employerName" style={labelStyle}>Employer Name:</label>
                  <input
                    type="text"
                    name="employerName"
                    id="employerName"
                    value={formData.employerName || ""}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sickLeaveStart" style={labelStyle}>Sick Leave Start Date:</label>
                  <input
                    type="date"
                    name="sickLeaveStart"
                    id="sickLeaveStart"
                    value={formData.sickLeaveStart || ""}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sickLeaveEnd" style={labelStyle}>Sick Leave End Date:</label>
                  <input
                    type="date"
                    name="sickLeaveEnd"
                    id="sickLeaveEnd"
                    value={formData.sickLeaveEnd || ""}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </>
            )}
            {entryType === "Hospital" && (
              <>
                <div>
                  <label htmlFor="dischargeDate" style={labelStyle}>Discharge Date:</label>
                  <input
                    type="date"
                    name="dischargeDate"
                    id="dischargeDate"
                    value={formData.dischargeDate || ""}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dischargeCriteria" style={labelStyle}>Discharge Criteria:</label>
                  <input
                    type="text"
                    name="dischargeCriteria"
                    id="dischargeCriteria"
                    value={formData.dischargeCriteria || ""}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </>
            )}
            {entryType === "HealthCheck" && (
              <div>
                <label htmlFor="healthCheckRating" style={labelStyle}>Health Check Rating (0-3):</label>
                <input
                  type="number"
                  name="healthCheckRating"
                  id="healthCheckRating"
                  value={formData.healthCheckRating || 0}
                  onChange={handleChange}
                  min={0}
                  max={3}
                  style={inputStyle}
                  required
                />
              </div>
            )}
            <button type="submit" style={buttonStyle}>Add Entry</button>
          </form>
        )}
      </div>
    );
  };
  
  export default EntryForm;