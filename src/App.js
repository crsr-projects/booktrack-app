// src/App.js
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AddBookForm from './components/AddBookForm';

import './App.css';
import './components.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // ✅ Statü güncelleme
  const handleStatusUpdate = (bookId, newStatus) => {
    return fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((updatedBook) => {
        setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status. Please try again.');
      });
  };

  // Arama filtresi
  const q = searchTerm.trim().toLowerCase();
  const filteredBooks =
    q === ''
      ? books
      : books.filter((b) => {
          const title = (b.title || '').toLowerCase();
          const author = (b.author || '').toLowerCase();
          return title.includes(q) || author.includes(q);
        });

  return (
    <div className="app-container">
      <Header onAddNewBookClick={() => setIsFormVisible(true)} />
      <main>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {isFormVisible && (
          <AddBookForm
            onAddBook={(newBookData) =>
              fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBookData),
              })
                .then((res) => {
                  if (!res.ok) throw new Error(`HTTP ${res.status}`);
                  return res.json();
                })
                .then((addedBook) => {
                  setBooks((prev) => [...prev, addedBook]);
                  setIsFormVisible(false);
                })
                .catch((err) => {
                  console.error('Error adding book:', err);
                  alert('Failed to add the book. Please try again.');
                })
            }
            onCloseForm={() => setIsFormVisible(false)}
          />
        )}

        {/* ✅ handleStatusUpdate’ı BookList’e geçir */}
        
        <BookList books={filteredBooks} onStatusUpdate={handleStatusUpdate} />
      </main>
    </div>
  );
}

export default App;
