// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RoomProvider } from "./context/RoomContext";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import RoomDetail from "./pages/RoomDetail";
import Support from "./pages/Support";
import Profile from "./pages/Profile";

// Styles
import "./styles/index.css";
import "./styles/components.css";
import "./styles/background.css";
import "./styles/animation.css";

// Layout wrapper component
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            
            <Route
              path="/create-room"
              element={
                <Layout>
                  <CreateRoom />
                </Layout>
              }
            />
            
            <Route
              path="/room/:id"
              element={
                <Layout>
                  <RoomDetail />
                </Layout>
              }
            />
            
            <Route
              path="/support"
              element={
                <Layout>
                  <Support />
                </Layout>
              }
            />
            
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <Layout>
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-[#E0C3A4] mb-4">
                        404
                      </h1>
                      <p className="text-gray-400 mb-6">Page not found</p>
                      <a href="/" className="btn-primary">
                        Go Home
                      </a>
                    </div>
                  </div>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </RoomProvider>
    </AuthProvider>
  </React.StrictMode>
);