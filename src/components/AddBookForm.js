// src/components/AddBookForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddBookForm({ onAddBook, onCloseForm }) {
  // ✅ Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: '',
  });

  // ✅ Input değişimlerini işle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basit doğrulama
    if (!formData.title.trim() || !formData.author.trim() || !formData.totalPages) {
      alert('Please fill in Title, Author, and Total Pages.');
      return;
    }

    const pagesInt = parseInt(formData.totalPages, 10);
    if (Number.isNaN(pagesInt) || pagesInt <= 0) {
      alert('Total Pages must be a positive number.');
      return;
    }

    const now = new Date();
    const newBook = {
      id: Date.now().toString(),       // json-server otomatik de atar; yönerge id istiyor
      title: formData.title.trim(),
      author: formData.author.trim(),
      totalPages: pagesInt,
      year: now.getFullYear(),
      genre: 'Unknown',
      status: 'wantToRead',
      progress: 0,
    };

    onAddBook(newBook);        // App.js tarafına gönder
    setFormData({ title: '', author: '', totalPages: '' }); // formu sıfırla
    onCloseForm();             // formu kapat
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-book-form">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="totalPages">Total Pages:</label>
            <input
              type="number"
              id="totalPages"
              name="totalPages"
              value={formData.totalPages}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Book</button>
            <button type="button" className="btn-secondary" onClick={onCloseForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddBookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

export default AddBookForm;
