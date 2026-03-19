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

// Admin
import AdminLayout from "./src/components/admin/AdminLayout";
import LoginPage from "./src/pages/admin/LoginPage";
import AdminDashboard from "./src/pages/admin/AdminDashboard";
import AdminInventory from "./src/pages/admin/AdminInventory";
import AdminSellRequests from "./src/pages/admin/AdminSellRequests";
import AdminSettings from "./src/pages/admin/AdminSettings";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
    <Header />
    {children}
    <Footer />
    <ChatBot />
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="requests" element={<AdminSellRequests />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consoles" element={<Consoles />} />
              <Route path="/games" element={<Games />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/sell" element={<Sell />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
