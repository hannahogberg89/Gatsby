// SearchComponent.js
import React, { useState } from 'react';
import { navigate } from 'gatsby';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);

    // Perform your search logic here
    // You can use Gatsby's navigate to direct the user to the search results page
    navigate(`/search/?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search here..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
