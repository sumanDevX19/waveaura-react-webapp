import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  function showToast(message, type = "success") {
      const toast = document.getElementById("toast");
      const msg = document.getElementById("toast-message");

      msg.textContent = message;

      toast.className = `toast show ${type}`;

      setTimeout(() => {
        toast.className = "toast"; // hide after 3 sec
      }, 3000);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);

    try {
      const res = await fetch('http://localhost:80/WaveAura/Backend/newsletter.php', {
        method: 'POST',
        body: formData,
      });

      const result = await res.text();

      if (result.includes('Email Saved Successfully')) {
        showToast('✅ Email Saved Successfully', 'success');
        setEmail('');
      } else {
        console.log('Email Not Saved: ' + result);
        showToast('❌ Email Not Saved', 'error');
      }
    } catch (err) {
      console.error(err.message);
      showToast('❌ Something went wrong', 'error');
    }
  };

  return (
    <>
      <section className="newletter-section">
        <div className="newletter-section-container">
          <h2 className="newletter-section-text">
            Want New Product News and Updates? <br />
            Sign up for our Newsletter
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="newletter-input"
              placeholder="Email"
              required
              id="email-news"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <input type="submit" value="Subscribe" className="newletter-submit" />
            {emailError && (
              <span id="emailError" style={{ display: 'block', color: 'red', marginTop:'5px' }}>{emailError}</span>
            )}
            
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;
