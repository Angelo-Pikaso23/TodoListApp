// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css'; // Asegúrate de crear este archivo CSS

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default SearchBar;