// src/components/BookCard.js
import React from 'react';
import ProgressBar from './ProgressBar';
import PropTypes from 'prop-types';
import { STATUSES } from '../data/constants'; // ✅ statü sabitleri

function BookCard({ book, onStatusUpdate }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Genre: {book.genre}</p>

      <div className="book-card-status">
        <label htmlFor={`status-${book.id}`} className="status-label">Status:</label>{' '}
        <select
          id={`status-${book.id}`}
          className="status-select"
          value={book.status}
          onChange={(e) => onStatusUpdate(book.id, e.target.value)} // ✅ değişikliği bildir
        >
          {Object.values(STATUSES).map((statusInfo) => (
            <option key={statusInfo.id} value={statusInfo.id}>
              {statusInfo.label}
            </option>
          ))}
        </select>
      </div>

      <ProgressBar progress={book.progress} totalPages={book.totalPages} />
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number,
    genre: PropTypes.string,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number,
    totalPages: PropTypes.number,
  }).isRequired,
  onStatusUpdate: PropTypes.func.isRequired, // ✅ eklendi
};

export default BookCard;
