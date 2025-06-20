import React, { useState } from "react";
import "./form.css";
import { submitRecord } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await submitRecord(
        name,
        age,
        gender,
        bloodType,
        allergies,
        diagnosis,
        treatment,
        provider,
        medical,
        dispatch
      );
      alert("✅ Data recorded successfully!");
      setName("");
      setAge("");
      setGender("");
      setBloodType("");
      setAllergies("");
      setDiagnosis("");
      setTreatment("");
    } catch (error) {
      alert("❌ Failed to record data. Check console for details.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      {account ? (
        <form onSubmit={submitHandler}>
          <h1>Patient Details</h1>

          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            required
            placeholder="Aman Dhattarwal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            required
            placeholder="29"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="bloodType">Blood Type:</label>
          <input
            type="text"
            id="bloodType"
            required
            placeholder="B positive"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          />

          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            id="allergies"
            required
            placeholder="Pollen allergy"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />

          <label htmlFor="diagnosis">Diagnosis:</label>
          <input
            type="text"
            id="diagnosis"
            required
            placeholder="Osteoporosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />

          <label htmlFor="treatment">Treatment:</label>
          <input
            type="text"
            id="treatment"
            required
            placeholder="Surgery"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />

          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>Please connect your wallet to continue</h1>
      )}
    </div>
  );
};

export default Form;
