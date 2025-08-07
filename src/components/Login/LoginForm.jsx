import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../stylesheet/formStyle.css";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const showToast = (message, type = "success") => {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");

    msg.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&* ]{8,}$/;

    if (!emailPattern.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!passwordPattern.test(form.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one number and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);

    try {
      const result = await fetch(`http://localhost:80/WaveAura/Backend/login.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const response = await result.text();
      if (response.includes("✅ Login successful")) {
        showToast(response, "success");
        
        

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        showToast(response, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong!", "error");
    }
  };

  return (
    <div className="main-container">
      <div id="toast" className="toast">
        <span id="toast-message"></span>
      </div>
      <div className="form-container">
        <div className="form-left">
          <div>
            <h2 className="heading">Login</h2>
            <p className="required-message">
              All Fields are Required (<span className="error-class">*</span>)
            </p>
            <form onSubmit={handleSubmit} id="basicForm">
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="suman@co.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <br />
              <span className="error-class" id="error-message-email">{errors.email}</span>
              <br />

              <input
                className="input-field"
                placeholder="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <br />
              <span className="error-class" id="error-message-password">{errors.password}</span>
              <br />

              <div className="submit-box">
                <input type="submit" id="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>

        <div className="form-right">
          <div className="right-content">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Glad to see you!
            </h3>
            <p style={{ textAlign: "center", marginBottom: "30px" }}>
              Please Enter your valid details for smooth Register Experience
            </p>
            {/* <p style={{ alignItems: "center" }}>
              Don't have an Account{" "}
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="/"
              >
                Sign Up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
