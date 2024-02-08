// src/App.js

import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import fetchUsers from './services/userService';
import { Button, Grid, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearchChange = term => {
    setSearchTerm(term);
  };

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
    setSorted(!sorted);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ color: '#3f51b5' }}>User Information</Typography>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <Button onClick={handleSort} endIcon={<ArrowUpward />} style={{ marginBottom: '20px' }}>
          {sorted ? 'Sort by Descending Name' : 'Sort by Ascending Name'}
        </Button>
      </Grid>
      <UserList users={filteredUsers} />
    </div>
  );
};

export default App;
