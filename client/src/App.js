import React, { useState } from "react";
import "./App.css";

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  const APIResponses = {
    userInfo: {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false },
      ],
    },
    AddressInfo: {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        {
          name: "state",
          type: "dropdown",
          label: "State",
          options: ["California", "Texas", "New York"],
          required: true,
        },
        { name: "zipCode", type: "text", label: "Zip Code", required: false },
      ],
    },
    paymentInfo: {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
      ],
    },
  };

  const handleFormTypeChange = (e) => {
    const selectedFormType = e.target.value;
    setFormType(selectedFormType);
    setFormFields(APIResponses[selectedFormType]?.fields || []);
    setFormData({});
  };

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };
 
  // To calculate progress of form 
  const calculateProgress = () => {
    if (formFields.length === 0) return 0;
    const requiredFields = formFields.filter((field) => field.required);
    const filledFields = requiredFields.filter((field) => formData[field.name]);
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({});
    alert("Form submitted successfully!");
  };

  return ( 
    // Handling form nature
    <div className="form-container">
      <h1>Dynamic Form</h1>
      <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>

        
      <select value={formType} onChange={handleFormTypeChange}>
        
        <option value="">Select Form Type</option>
        
        <option value="userInfo">User Information</option>
        <option value="addressInfo">Address Information</option>
        <option value="paymentInfo">Payment Information</option>
        
      </select>

      {formFields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} className="form-field">
              <label>{field.label}</label>
              {field.type === "dropdown" ? (
                <select
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(e, field.name)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(e, field.name)}
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}

      {submittedData.length > 0 && (
        <div className="data-table">
          <h2>Submitted Data</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(submittedData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
