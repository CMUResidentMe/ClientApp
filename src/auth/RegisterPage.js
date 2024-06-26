import React, { useState } from "react";
import { gql, request } from "graphql-request";
import ResidentMeLogo from "../ResidentMeLogo.PNG";
import { Link, useNavigate } from "react-router-dom";
import staticInitObject from '../config/AllStaticConfig.js';
import { PrivilegeType } from '../data/userData.js';

const REGISTER_MUTATION = gql`
  mutation Register(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $roomNumber: Int
    $privilege: PrivilegeType
  ) {
    register(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      roomNumber: $roomNumber
      privilege: $privilege
    )
  }
`;

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

const RegisterPage = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    roomNumber: 0,
  });
  const [error, setError] = useState("");
  let title = "ResidentMe";
  let isResident = true;
  let isStaff = false;
  if(props.privilege === PrivilegeType.manager){
    title = "Manager";
    isResident = false;
  } else if(props.privilege === PrivilegeType.staff){
    title = "Staff";
    isResident = false;
    isStaff = true;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "username" && value === "admin"){
      alert("cannot register admin");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: "",
      }));
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const variables = {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      roomNumber: parseInt(formData.roomNumber, 10),
      privilege: PrivilegeType.resident,
    };
    if(!isResident){
      variables.privilege = PrivilegeType.staff;
    }
    try {
      const data = await request(graphqlAPI, REGISTER_MUTATION, variables);
      // If the registration is successful, data should contain the success message
      if (props.privilege === PrivilegeType.manager) {
        navigate("/manager-home");  // Redirect admin to the ManagerHome after registering a staff
      } else {
        navigate("/");  // Redirect residents to the main page after registering themselves
      }
    } catch (error) {
      // Extract the specific error message from the GraphQL error response
      const errorMessage =
        error?.response?.errors?.[0]?.message ||
        "An unexpected error occurred during registration.";
      setError(errorMessage);
    }
  };

  let backLink = "/";
  let backLinkText = "Back to Login";
  if (props.privilege === PrivilegeType.manager) {
    backLink = "/manager-home";  // Assuming this is the correct route for the Manager Home
    backLinkText = "Back to Homepage";
  }

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={ResidentMeLogo} style={styles.logo} alt="ResidentMe Logo" />
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.heading}>{title}</h1>
        {error && <div style={styles.errorContainer}>{error}</div>}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
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
        {isResident && 
        <input
          type="number"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          style={styles.input}
        />}
        {/* <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        /> */}
        <button type="submit" style={styles.registerButton}>
          Register
        </button>
        <div style={styles.backToLoginContainer}>
          <Link to={backLink} style={styles.backToLoginLink}>
            {backLinkText}
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
  errorContainer: {
    color: "#ff3860",
    backgroundColor: "#ffe5e7",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
    border: "1px solid #ff3860",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
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
