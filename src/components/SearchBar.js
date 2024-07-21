"use client";
import React from "react";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.item.value;
    console.log(`You searched for: ${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="item">Search...</label>
      <input
        type="text"
        id="item"
        name="item"
        placeholder="Search for info..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
