import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../src/stylesheet/App.css'
import Category from './components/Category/Category'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import NewsletterSection from './components/Newsletter/NewsletterSection'
import Product from './components/Product/Product'
import EmbadedVideoSection from './components/VideoSection/EmbadedVideoSection'
import ContactPage from './components/Contact/ContactPage'
import Plppage from './components/PLP/Plppage'

import WishlistProducts from './components/Wishlist/WishlistProducts'
import Wishlist from './components/Wishlist/Wishlist'
import LoginForm from './components/Login/LoginForm'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import CartPage from './components/Cart/CartPage'




function App() {
  const [login, setLoging] = useState(false);

  useEffect(() => {
    fetch("http://localhost:80/WaveAura/Backend/protected.php",{
      method:"GET",
      credentials:'include'
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setLoging(true)
          localStorage.setItem("token", result.token);
          
          
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <Navbar login={login}/>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <Category/>
              <Product number={4}/>
              <Contact/>
              <EmbadedVideoSection/>
              <NewsletterSection/>
            </>
          } />
          <Route path="/plp" element={<Plppage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cart" element={<CartPage/>} />


          

        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App