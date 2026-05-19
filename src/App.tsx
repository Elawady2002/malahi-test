import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Lamby from "./pages/Lamby";
import Doss from "./pages/Doss";
import Noos from "./pages/Noos";
import Fizzia from "./pages/Fizzia";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lamby" element={<Lamby />} />
        <Route path="/doss" element={<Doss />} />
        <Route path="/noos" element={<Noos />} />
        <Route path="/fizzia" element={<Fizzia />} />
      </Routes>
    </BrowserRouter>
  );
}
