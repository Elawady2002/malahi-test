import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Lamby from "./pages/Lamby";
import Doss from "./pages/Doss";
import Noos from "./pages/Noos";
import Fizzia from "./pages/Fizzia";
import Partners from "./pages/Partners";
import Branches from "./pages/Branches";
import BookTicket from "./pages/BookTicket";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lamby" element={<Lamby />} />
          <Route path="/doss" element={<Doss />} />
          <Route path="/noos" element={<Noos />} />
          <Route path="/fizzia" element={<Fizzia />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/book" element={<BookTicket />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
