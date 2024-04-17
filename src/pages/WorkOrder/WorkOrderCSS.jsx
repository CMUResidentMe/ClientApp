const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // This centers the children vertically
      alignItems: "center",
      minHeight: "calc(100vh - <height_of_header>)", // Adjust the height of the header
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
      display: "flex",
      flexDirection: "row", // Align child divs in a row
      flexWrap: "wrap", // Allow wrapping if the form gets too wide
      justifyContent: "space-between", // Distribute space between columns
      width: "100%", // Use 100% if you want it to be responsive or set a max-width
      maxWidth: "800px",
      marginTop: "-15rem",
    },
    formColumn: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "calc(50% - 10px)", // 50% of the form width minus the gap
      marginBottom: "1rem",
    },    
    heading: {
      textAlign: "center",
      color: "#333",
    },
    tableGroup: {
      marginTop: "1rem",
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
      width: "auto", // Let them naturally take up the needed space
      flexGrow: 1, // Allow them to grow if there is space in the flex container
    },
    inputArea: {
      padding: "0.5rem",
      borderRadius: "3px",
      border: "1px solid #ddd", // Light grey border
      width: "100%", // Full-width inputs
      height: "100px",
    },
    ActionButton: {
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

  export default styles;