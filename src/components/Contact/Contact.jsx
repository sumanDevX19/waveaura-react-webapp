 import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  function showToast(message, type = "success") {
      const toast = document.getElementById("toast");
      const msg = document.getElementById("toast-message");

      msg.textContent = message;

      toast.className = `toast show ${type}`;

      setTimeout(() => {
        toast.className = "toast"; // hide after 3 sec
      }, 3000);
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Invalid email address.';
    }

    if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('message', form.message);

    try {
      const response = await fetch(`http://localhost:80/WaveAura/Backend/contact.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();

      if (result.includes('✅ User registered successfully')) {
        showToast('✅ Message Sent Successfully...', 'success');
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        showToast('❌ Message not sent or email already exists', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Something went wrong!', 'error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-heading">Contact Us</h2>

      <div id="toast" className="toast">
        <span id="toast-message"></span>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <figure className="image-container">
            <img src="./frontimage.png" alt="Apple Headphone" id="contact-image" />
          </figure>
        </div>

        <div className="contact-right">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="contact-field"
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <br />
            <span className="error">{errors.name}</span>
            <br />

            <input
              className="contact-field"
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <br />
            <span className="error">{errors.email}</span>
            <br />

            <textarea
              className="contact-textarea"
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <br />
            <span className="error">{errors.message}</span>
            <br />

            <input className="contact-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
