import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import RegisterForm from "./screens/RegisterForm";
import ZakazList from "./screens/ZakazList";
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setAuthenticated(true)} />}
        />
        <Route
          path="/"
          element={authenticated ? <Home setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/zakazlist" element={<ZakazList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;