import React from "react";
import ResidentMeLogo from "../ResidentMeLogo.PNG";
import { Link } from "react-router-dom";

const LoginPage = () => (
  <div style={styles.container}>
    <div style={styles.logoContainer}>
      <img src={ResidentMeLogo} style={styles.logo} alt="ResidentMe Logo" />
    </div>
    <form style={styles.form}>
      <h1 style={styles.heading}>ResidentMe</h1>
      <div style={styles.inputGroup}>
        <label htmlFor="username" style={styles.label}>
          Username
        </label>
        <input id="username" type="text" style={styles.input} />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input id="password" type="password" style={styles.input} />
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
};

export default LoginPage;
