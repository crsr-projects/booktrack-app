// src/components/Header.js
import React from 'react';
import PropTypes from 'prop-types';

function Header({ onAddNewBookClick }) {
  return (
    <header className="app-header">
      <h1>BookTrack</h1>
      <button
        className="add-book-btn"
        onClick={onAddNewBookClick} // ✅ App.js’ten gelen fonksiyon
      >
        Add New Book
      </button>
    </header>
  );
}

Header.propTypes = {
  onAddNewBookClick: PropTypes.func.isRequired, // ✅ prop kontrolü
};

export default Header;
