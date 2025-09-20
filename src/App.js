import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';

import './App.css';
import './components.css';
import Header from './components/Header';


function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Error fetching data:", error));
        }, []);
        return (
              <div className="app-container"> {/* Update className for App.css styles */}
                <Header />
                <main> {/* Add a main tag for content organization */}
                  <BookList books={books} />
                </main>
              </div>
          );     

}
export default App;
