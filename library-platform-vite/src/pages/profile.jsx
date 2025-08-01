import React from "react";
import { BookMarked, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../images/brandLogo.jpeg";
import profileAvatar from "../images/profileAvatar.jpg";

const Profile = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/");
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
            onClick={handleTitleClick}
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

      
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          fontFamily: "Nunito Sans",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", color: "#FAF9F6" }}>Zaynah's Profile</h2>
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#444",
            padding: "30px",
            borderRadius: "12px",
            display: "inline-block",
            minWidth: "300px",
          }}
        >
            <img
              src={profileAvatar}
              alt="logo"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          <p style={{ fontSize: "18px" }}><strong>Name:</strong> Zaynah A Chaudhry</p>
          <p style={{ fontSize: "18px" }}><strong>Email:</strong> zaynahac01@gmail.com</p>
          <p style={{ fontSize: "18px" }}><strong>Saved Books:</strong> 6</p>
        </div>
      </div>

     
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

export default Profile;
