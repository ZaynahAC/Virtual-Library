// ... imports remain the same
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookMarked, User, Heart } from "lucide-react";
import { Link } from "react-router-dom"; // assuming you're using React Router

const genres = ["Fiction", "Fantasy", "Science", "History", "Romance"];

const fetchBooksByGenre = async (genre) => {
  const response = await axios.get(
    `https://openlibrary.org/subjects/${genre.toLowerCase()}.json?limit=10`
  );
  return response.data.works;
};

const BookCard = ({ book, onSave, onClick }) => {
  const isSaved = false; // optional future enhancement: check saved state

  return (
    <div
      onClick={onClick}
      style={{
        width: "160px",
        margin: "0 10px",
        textAlign: "center",
        flexShrink: 0,
        cursor: "pointer",
        border: "1px solid #444",
        padding: "12px",
        borderRadius: "10px",
        background: "linear-gradient(to bottom right, #2a2a3b, #3a3a4b)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.15)";
      }}
    >
      <img
        src={
          book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : "https://via.placeholder.com/100x150?text=No+Cover"
        }
        alt={book.title}
        style={{
          width: "100px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <p
        style={{
          fontSize: "15px",
          fontWeight: "600",
          marginTop: "10px",
          color: "#f0f0f0",
          fontFamily: "Nunito Sans",
        }}
      >
        {book.title}
      </p>

      {onSave && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(book);
          }}
          title="Save this book"
          style={{
            backgroundColor: "#808080",
            color: "#000",
            border: "none",
            borderRadius: "20px",
            padding: "6px 14px",
            marginTop: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#C5C6D0")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#808080")
          }
        >
          💾 
        </button>
      )}
    </div>
  );
};


const BookModal = ({ bookKey, onClose }) => {
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    if (bookKey) {
      axios
        .get(`https://openlibrary.org${bookKey}.json`)
        .then((res) => setBookDetails(res.data));
    }
  }, [bookKey]);

  if (!bookDetails) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>{bookDetails.title}</h2>
        <p>
          {bookDetails.description?.value ||
            bookDetails.description ||
            "No description available."}
        </p>
        <a
          href={`https://openlibrary.org${bookKey}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          View Book on OpenLibrary
        </a>
        <br />
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

const GenreSection = ({ genre, onSave, onClickBook }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooksByGenre(genre).then(setBooks);
  }, [genre]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{
          fontWeight: 50,
          fontFamily: "Grenze Gotisch",
          fontSize: "3rem",
          color: "#FAF9F6",
        }}
      >
        {genre}
      </h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "10px 0",
          gap: "10px",
        }}
      >
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onSave={onSave}
            onClick={() => onClickBook(book.key)}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState(
    JSON.parse(localStorage.getItem("savedBooks")) || []
  );
  const [selectedBookKey, setSelectedBookKey] = useState(null);

  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      const results = response.data.docs.slice(0, 10).map((doc) => ({
        title: doc.title,
        cover_id: doc.cover_i,
        key: doc.key.startsWith("/works/") ? doc.key : `/works/${doc.key}`,
      }));
      setSearchResults(results);
    }
  };

  const handleSaveBook = (book) => {
    if (!savedBooks.some((b) => b.key === book.key)) {
      setSavedBooks([...savedBooks, book]);
    }
  };

  const handleClearSavedBooks = () => {
    setSavedBooks([]);
    localStorage.removeItem("savedBooks");
  };

  const handleTitleClick = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#333",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
       <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h1
    onClick={handleTitleClick}
    style={{
      fontWeight: 400,
      fontFamily: "Grenze Gotisch",
      fontSize: "3rem",
      color: "#000",
      margin: 0,
      cursor: "pointer",
    }}
  >
    Book's Emporium
  </h1>

  {/* Right-side nav with search and icons */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <input
      type="text"
      placeholder="Search for books..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleSearch}
      style={{
        width: "300px",
        height: "40px",
        padding: "8px",
        fontSize: "16px",
      }}
    />

    {/* Nav Icons */}
    <Link to="/reading-list" title="Reading List">
      <BookMarked size={28} color="#333" />
    </Link>
    <Link to="/favourites" title="Favourites">
      <Heart size={28} color="#e63946" />
    </Link>
    <Link to="/profile" title="Profile">
      <User size={28} color="#333" />
    </Link>
  </div>
</nav>
      </div>

      {/* Modal */}
      {selectedBookKey && (
        <BookModal
          bookKey={selectedBookKey}
          onClose={() => setSelectedBookKey(null)}
        />
      )}

      {/* Main */}
      <div style={{ padding: "20px" }}>
        {searchResults.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: "Grenze Gotisch",
                fontSize: "3rem",
                color: "#FAF9F6",
              }}
            >
              Search Results
            </h2>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                padding: "10px 0",
                gap: "10px",
              }}
            >
              {searchResults.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onSave={handleSaveBook}
                  onClick={() => setSelectedBookKey(book.key)}
                />
              ))}
            </div>
          </div>
        )}

        {savedBooks.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: "Grenze Gotisch",
                fontSize: "3rem",
                color: "#FAF9F6",
              }}
            >
              Saved Books
            </h2>
            <button
              onClick={handleClearSavedBooks}
              style={{
                backgroundColor: "#fff",
                color: "#000",
                padding: "6px 12px",
                marginBottom: "10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear Saved Books
            </button>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                padding: "10px 0",
                gap: "10px",
              }}
            >
              {savedBooks.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onSave={null}
                  onClick={() => setSelectedBookKey(book.key)}
                />
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 &&
          genres.map((genre) => (
          <div key={genre}>
  <GenreSection
    genre={genre}
    onSave={handleSaveBook}
    onClickBook={setSelectedBookKey}
  />
  <hr
    style={{
      border: "none",
      height: "1px",
      backgroundColor: "#555",
      margin: "40px 0",
      width: "100%",
    }}
  />
</div>

          ))}
      </div>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "#fff", color: "#000", padding: "10px 20px" }}
      >
        <p style={{ margin: 0 }}>Z.A.C. 2025</p>
      </footer>
    </div>
  );
};

export default App;
