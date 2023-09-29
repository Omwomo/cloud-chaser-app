import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiSearch } from 'react-icons/hi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery(''); // Clear input value after search
    }
  };

  return (
    <div className="search-area">
      <input
        className="search-input"
        placeholder="type location"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="search-button"
        type="button"
        onClick={handleSearch}
      >
        <HiSearch />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
