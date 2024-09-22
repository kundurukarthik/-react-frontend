import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState(""); // To store JSON input
  const [responseData, setResponseData] = useState(null); // To store the response from Flask API
  const [error, setError] = useState(""); // To store error messages

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Parse the JSON input
      const parsedData = JSON.parse(jsonInput);

      // Make POST request to Flask backend
      const response = await axios.post("http://127.0.0.1:5000/bfhl", parsedData);
      
      // Store the response from the backend
      setResponseData(response.data);
    } catch (err) {
      // Handle any errors
      if (err.response) {
        // Server responded with a status other than 200 range
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        // Request was made but no response
        setError("Error: No response from the server. Check if the backend is running.");
      } else {
        // Something happened while setting up the request
        setError("Invalid JSON input or network error.");
      }
    }
  };

  return (
    <div className="App">
      <h1>Send JSON to Flask API</h1>

      {/* Input form to accept JSON */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">Enter JSON:</label>
        <textarea
          id="jsonInput"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="6"
          placeholder='{"data": ["A", "B", "C", "1"]}'
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Display any errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the API response */}
      {responseData && (
        <div>
          <h2>Response from Backend:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
