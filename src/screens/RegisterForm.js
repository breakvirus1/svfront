import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roles: ["user"]
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/register",
        {
          username: formData.username,
          password: formData.password,
          roles: formData.roles
        }
      );
      setServerError(""); // Clear any previous errors
      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.message ?? 'Registration failed:     '+err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {serverError && <div className="error">{serverError}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <div className="error">{errors.username}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <select
          name="roles"
          value={formData.roles[0]}
          onChange={e =>
            setFormData(prev => ({ ...prev, roles: [e.target.value] }))}
          required
        >
          <option value="operator">Operator</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
};

export default RegisterForm;