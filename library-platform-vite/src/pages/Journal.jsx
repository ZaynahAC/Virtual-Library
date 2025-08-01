import React, { useState, useEffect } from "react";
import { BookMarked, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../images/brandLogo.jpeg";

const Journal = () => {
  const navigate = useNavigate();

  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (entryText.trim() === "") return;

    const newEntry = {
      text: entryText,
      timestamp: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setEntryText("");
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

      {/* Journal Content */}
      <div style={{ padding: "30px 20px", fontFamily: "Nunito Sans" }}>
        <h2 style={{ fontSize: "2.5rem", color: "#FAF9F6", textAlign: "center" }}>
          My Book Journal
        </h2>

        <div
          style={{
            margin: "20px auto",
            maxWidth: "700px",
            backgroundColor: "#444",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <textarea
            placeholder="Write your book thoughts, reviews, or journal entry..."
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              resize: "vertical",
            }}
          />
          <button
            onClick={handleAddEntry}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              border: "none",
              backgroundColor: "#C5C6D0",
              color: "#333",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Entry
          </button>
        </div>

        {/* Past Entries */}
        {entries.length > 0 && (
          <div
            style={{
              marginTop: "40px",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3 style={{ color: "#FAF9F6" }}>Previous Entries</h3>
            {entries.map((entry, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#2a2a3b",
                  marginBottom: "20px",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
                  {entry.text}
                </p>
                <p style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
                  {entry.timestamp}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#C5C6D0",
          color: "#787276",
          padding: "10px 20px",
          fontFamily: "Nunito Sans",
        }}
      >
        <p style={{ margin: 0 }}>Z.A.C & Co 2025</p>
      </footer>
    </div>
  );
};

export default Journal;
