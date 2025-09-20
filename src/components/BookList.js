import React from 'react';
function BookList({ books }) {
    return (
        <div className="book-list">
          {books.map(book => (
            <div key={book.id}>
              {book.title}
            </div>
          ))}
        </div>
      );
}
export default BookList;