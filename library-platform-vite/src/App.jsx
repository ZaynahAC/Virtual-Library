// import "./App.css";
import Home from "./pages/Home"
// import Profile from "./pages/profile"
// import Favourites from "./pages/Favourites"
import Journal from "./pages/Journal"
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/favourites" element={<Favourites />} /> */}
            <Route path="/journal" element={<Journal />} />
        </Routes>
    </BrowserRouter>

  )};

  export default App;
