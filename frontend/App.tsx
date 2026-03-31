import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import CartDrawer from "./src/components/CartDrawer";
import { CartProvider } from "./src/context/CartContext";
import { AuthProvider } from "./src/context/AuthContext";

// Pages
import Home from "./src/pages/Home";
import Consoles from "./src/pages/Consoles";
import Games from "./src/pages/Games";
import Accessories from "./src/pages/Accessories";
import Sell from "./src/pages/Sell";
import AuthPage from "./src/pages/AuthPage";
import ProfilePage from "./src/pages/ProfilePage";

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
    <CartDrawer />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Auth pages — no header/footer */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="requests" element={<AdminSellRequests />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Main site */}
          <Route path="*" element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/consoles" element={<Consoles />} />
                <Route path="/games" element={<Games />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
