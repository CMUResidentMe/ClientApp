import React, { useState } from "react";
import { gql, request } from "graphql-request";
import ResidentMeLogo from "../ResidentMeLogo.PNG";
import { Link, useNavigate } from "react-router-dom";
import staticInitObject from "../config/AllStaticConfig.js";
//connect sock io after login sucess
import { socketManager } from "../notification/socketManager.js";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      username
      privilege
    }
  }
`;

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

const LoginPage = () => {
  const history = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await request(graphqlAPI, LOGIN_MUTATION, {
        username: loginData.username,
        password: loginData.password,
      });
      localStorage.setItem("token", data.login.token); // Save the token
      localStorage.setItem("username", data.login.username);
      localStorage.setItem("privilege", data.login.privilege);
      socketManager.connect(localStorage.getItem("token"));

      if (data.login.privilege == "resident") {
        history("/home");
      } else if (data.login.privilege == "manager") {
        history("/manager-home");
      } else if (data.login.privilege == "staff") {
        console.log("I AM STAFF");
        history("/staff-work-order");
      }
    } catch (error) {
      // Log the full error
      const errorMessage =
        error?.response?.errors?.[0]?.message ||
        "An error occurred while trying to log in.";
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={ResidentMeLogo} style={styles.logo} alt="ResidentMe Logo" />
      </div>
      <form style={styles.form} onSubmit={handleLoginSubmit}>
        <h1 style={styles.heading}>ResidentMe</h1>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={loginData.username}
            onChange={handleLoginChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleLoginChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.loginButton}>
          Log In
        </button>
        <p style={styles.registerPrompt}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Register here
          </Link>
        </p>
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
  logoContainer: {
    marginBottom: "2rem",
  },
  logo: {
    width: "100px",
    marginBottom: "1rem",
  },
  form: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    padding: "2rem",
    borderRadius: "5px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: ".5rem",
    color: "#333",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "3px",
    border: "1px solid #ddd", // Light grey border
    width: "100%", // Full-width inputs
  },
  loginButton: {
    backgroundColor: "#746352",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  registerPrompt: {
    marginTop: "1rem",
    textAlign: "center",
  },
  registerLink: {
    color: "#526473",
    textDecoration: "none",
  },
  error: {
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
};

export default LoginPage;
