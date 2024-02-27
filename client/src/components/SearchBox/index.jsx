import React, { Component } from 'react';

const SearchBox = () => {
  const handleSearch = () => {};

  return (
    <input
      placeholder="Search entire app..."
      onChange={handleSearch}
      className="w-3/4 h-14 rounded-lg"
    />
  );
};

export default SearchBox;
