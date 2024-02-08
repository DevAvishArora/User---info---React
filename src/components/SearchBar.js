// src/components/SearchBar.js

import React, { useState, useEffect } from "react";
import { TextField, Grid, List, ListItem, ListItemText } from "@mui/material";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    const storedSearchTerms =
      JSON.parse(localStorage.getItem("pastSearchTerms")) || [];
    setPastSearchTerms(...pastSearchTerms,storedSearchTerms);
  }, []);

  const handleSearchChange = (term) => {
    onSearchChange(term);
    if (term.trim() !== "") {
      localStorage.setItem("pastSearchTerms", JSON.stringify([term]));
      setPastSearchTerms([...pastSearchTerms,term]);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginBottom: "20px" }}
    >
      <Grid item xs={6} style={{ position: "relative" }}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by name"
          InputProps={{
            onFocus: () =>
              setPastSearchTerms(
                JSON.parse(localStorage.getItem("pastSearchTerms")) || []
              ),
          }}
        />
        {pastSearchTerms.length > 0 && (
          <List
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "white",
              marginTop: "8px",
              width: "100%",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {pastSearchTerms.map((term, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSearchChange(term)}
              >
                <ListItemText primary={term} />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchBar;
