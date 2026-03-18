import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

// Pages
import Home from "./src/pages/Home";
import Consoles from "./src/pages/Consoles";
import Games from "./src/pages/Games";
import Accessories from "./src/pages/Accessories";
import Sell from "./src/pages/Sell";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consoles" element={<Consoles />} />
        <Route path="/games" element={<Games />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
