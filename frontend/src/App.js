
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ERegister from "./pages/emp_register";
import ELogin from "./pages/emp_login";
import ARegister from "./pages/admin_register";
import ALogin from "./pages/admin_login";
import React from "react";
import AProtectedRoutes from "./components/protected_routes";
import ProtectedRoutes from "./components/protected_routes";
import PublicRoutes from "./components/public_routes";
import CreateEntry from "./pages/add_entry";
import ViewS from "./pages/view_status";
import UpdateEntry from "./pages/update_entry";


function App() {
  return (
    <>
      <BrowserRouter>

      <Routes>

      <Route path="/" element={<PublicRoutes><ELogin /></PublicRoutes>} /> 

      <Route path="/login" element={<PublicRoutes><ELogin /></PublicRoutes>} /> 

      <Route path="/register" element={<PublicRoutes><ERegister /></PublicRoutes>} /> 
      
      <Route path="/admin/login" element={<PublicRoutes><ALogin /></PublicRoutes>} /> 
      
      <Route path="/admin/register" element={<PublicRoutes><ARegister /></PublicRoutes>} /> 
  
      <Route path="/AddEntry/:id" element={<ProtectedRoutes><CreateEntry /></ProtectedRoutes>}/> 

      <Route path="/ViewStatus/:id" element={<ProtectedRoutes><ViewS /></ProtectedRoutes>}/> 

      <Route path="/UpdateEntry/:id" element={<AProtectedRoutes><UpdateEntry /></AProtectedRoutes>}/>

      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
