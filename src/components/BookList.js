// src/components/BookList.js
import React from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

function BookList({ books, onStatusUpdate }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onStatusUpdate={onStatusUpdate}  // ✅ aşağıya ilet
        />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onStatusUpdate: PropTypes.func.isRequired,   // ✅ zorunlu
};

export default BookList;
