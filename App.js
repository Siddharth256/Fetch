import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
//Fetching data from api 
  const fetchData = () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log(d);
      });
  };
//useEffect will render only once 
  useEffect(() => {
    fetchData();
  }, []);
//search will search box if name, username or email is entered 
  const search_properties = ["name", "username", "email"];
//both lowercase or uppercase will result in same result 
  function search(data) {
    return data.filter((dataObj) =>
      search_properties.some((property) =>
        dataObj[property]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  return (
    <div className="container">
      <h1>Fetch & Search</h1>

      <div className="input-box">
        <TextField
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user"
        />
      </div>

      <div className="box-container">
        {search(data).map((dataObj) => (
          <Box component="div" className="box" key={dataObj.id}>
            <Box className="card">
              <Box component="div" className="category"><span>USERNAME:</span>  @{dataObj.username}</Box>
              <Box component="div" className="heading">
                NAME: {dataObj.name}
                <Box component="div" className="author">EMAIL: {dataObj.email}</Box>

              </Box>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default App;
