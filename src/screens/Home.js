import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function Home({ setAuthenticated }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/hello")
      .then(res => {
     console.log("Ответ от бэкенда:", res.data);  
        setMessage(res.data)
        setLoading(false)
        })
      
.catch(err => {
        console.error("Ошибка в Home:", err);  
        setMessage("Не авторизован");
        localStorage.removeItem("token");
        setAuthenticated(false);
        navigate("/login");
        setLoading(false);
      });
  }, [navigate, setAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  if(loading){
    return(
        <div className="container">
        <h2>Загрузка...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <a href="/zakazlist" className="link">спсок закзов</a>
      <h2>Home</h2>
      <p>{message || "Welcome!"}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}