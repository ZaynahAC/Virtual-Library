import React, { useState, useEffect } from "react";
import { BookMarked, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../images/brandLogo.jpeg";

const Favourites = () => {
  const navigate = useNavigate();

  const [favoriteInput, setFavoriteInput] = useState("");
  const [tbrInput, setTbrInput] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteBooks");
    return saved ? JSON.parse(saved) : [];
  });
  const [tbrList, setTbrList] = useState(() => {
    const saved = localStorage.getItem("tbrBooks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
    localStorage.setItem("tbrBooks", JSON.stringify(tbrList));
  }, [favorites, tbrList]);

  const addFavorite = () => {
    if (favoriteInput.trim() === "") return;
    setFavorites([{ title: favoriteInput }, ...favorites]);
    setFavoriteInput("");
  };

  const addTbr = () => {
    if (tbrInput.trim() === "") return;
    setTbrList([{ title: tbrInput }, ...tbrList]);
    setTbrInput("");
  };

  const removeFavorite = (index) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
  };

  const removeTbr = (index) => {
    const updated = [...tbrList];
    updated.splice(index, 1);
    setTbrList(updated);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img
              src={brandLogo}
              alt="logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <h1
              style={{
                fontWeight: 400,
                fontFamily: "Grenze Gotisch",
                fontSize: "3rem",
                color: "#000",
                margin: 0,
              }}
            >
              Book's Emporium
            </h1>
          </div>
        </nav>
      </div>

      {/* Icon Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          padding: "20px 0",
        }}
      >
        <button
          onClick={() => navigate("/journal")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "24px",
          }}
          title="Bookmarks"
        >
          <BookMarked />
        </button>
        <button
          onClick={() => navigate("/user")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "24px",
          }}
          title="Profile"
        >
          <User />
        </button>
        <button
          onClick={() => navigate("/favourites")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "24px",
          }}
          title="Favorites"
        >
          <Heart />
        </button>
      </div>

      {/* Tracker Content */}
      <div style={{ padding: "30px 20px", fontFamily: "Nunito Sans" }}>
        <h2 style={{ fontSize: "2.5rem", textAlign: "center" }}>
          Favorites & TBR Tracker
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {/* Favorites Section */}
          <div
            style={{
              backgroundColor: "#444",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ color: "#FAF9F6" }}>📖 Favorite Books</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Enter book title"
                value={favoriteInput}
                onChange={(e) => setFavoriteInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <button
                onClick={addFavorite}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#C5C6D0",
                  color: "#333",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {favorites.map((book, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2a2a3b",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span>{book.title}</span>
                  <button
                    onClick={() => removeFavorite(index)}
                    style={{
                      background: "none",
                      color: "#aaa",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* TBR Section */}
          <div
            style={{
              backgroundColor: "#444",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ color: "#FAF9F6" }}>📚 To Be Read (TBR)</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Enter book title"
                value={tbrInput}
                onChange={(e) => setTbrInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <button
                onClick={addTbr}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#C5C6D0",
                  color: "#333",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {tbrList.map((book, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2a2a3b",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span>{book.title}</span>
                  <button
                    onClick={() => removeTbr(index)}
                    style={{
                      background: "none",
                      color: "#aaa",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#C5C6D0",
          color: "#787276",
          padding: "10px 20px",
          fontFamily: "Nunito Sans",
          marginTop: "40px",
        }}
      >
        <p style={{ margin: 0 }}>Z.A.C & Co 2025</p>
      </footer>
    </div>
  );
};

export default Favourites;
