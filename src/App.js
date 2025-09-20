import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';

import './App.css';

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Error fetching data:", error));
        }, []);
        return (
            <div className="App">
                <BookList books={books} />
            </div>
          );     

}
export default App;
