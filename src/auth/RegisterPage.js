import React, { useState } from "react";
import ResidentMeLogo from "../ResidentMeLogo.PNG";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    roomNumber: "",
    email: "",
  });

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value from the event target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Use the name to update the correct state
    }));
  };

  // Handle form submission!!!
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data submitted:", formData);
    // For send the form data to your server via an API call!!!
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={ResidentMeLogo} style={styles.logo} alt="ResidentMe Logo" />
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.heading}>ResidentMe</h1>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          style={styles.input}
        />
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <button type="submit" style={styles.registerButton}>
          Register
        </button>
        <div style={styles.backToLoginContainer}>
          <Link to="/" style={styles.backToLoginLink}>
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    padding: "2rem",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "3px",
    border: "1px solid #ddd",
  },
  registerButton: {
    backgroundColor: "#746352",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
  },
  logo: {
    width: "120px",
    height: "auto",
  },
  backToLoginContainer: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  backToLoginLink: {
    color: "#005f73",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

export default RegisterPage;
