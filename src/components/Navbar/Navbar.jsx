import React, { useEffect, useState } from 'react';
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ login }) => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [wishlistCount, setWishlistCount] = useState(0);

    function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        const msg = document.getElementById("toast-message");

        if (!toast || !msg) return;

        msg.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.className = "toast";
        }, 3000);
    }

    useEffect(() => {
        setIsLogin(login);
    }, [login]);

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const updateWishlistCount = () => {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistCount(wishlist.length);
        };

        updateWishlistCount();

        window.addEventListener('wishlistUpdated', updateWishlistCount);
        const handleStorage = (e) => {
            if (e.key === 'wishlist') {
                updateWishlistCount();
            }
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener('wishlistUpdated', updateWishlistCount);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const menuToggle = () => {
        const menu = document.querySelector('.responsive-menu');
        menu.classList.toggle('active');
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:80/WaveAura/Pages/logout.php", {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();
            console.log("Logout response:", data);

            if (data.success) {
                showToast(data.message, "success");
                setIsLogin(false);
                localStorage.removeItem("token");
                navigate("/login"); // go to login page
            } else {
                showToast("❌ Logout failed", "error");
            }
        } catch (err) {
            console.error("Logout error:", err);
            showToast("❌ Logout error!", "error");
        }
    };

    return (
        <header className="head-section">
            <div id="toast" className="toast"><span id="toast-message"></span></div>
            <div className="head-left">
                <h2>WaveAura</h2>
            </div>

            <nav className="head-right">
                <Link to="/" className="navlink">Home</Link>
                <Link to="/plp" className="navlink" id="store">Store</Link>
                <Link to="/contact" className="navlink">Contact</Link>
                <Link to="/" className="navlink">Hey, There!</Link>

                {isLogin ? (
                    <button className="navlink" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                ) : (
                    <Link to="/login" className="navlink">Login</Link>
                )}

                <Link to="/" className="navlink" style={{ display: "flex", alignItems: "center" }}>
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>
                        shopping_cart
                    </span>
                </Link>

                <div className="navmenu">
                    <div className="navmenu-container">
                        {["Professional", "Gaming", "Production"].map(type => (
                            <div className="navmenu-column" key={type}>
                                <h5 className="heading-menu">{type} Headset</h5>
                                <Link to="/plp">Sony Headset</Link>
                                <Link to="/plp">Samsung Headset</Link>
                                <Link to="/plp">Apple Headset</Link>
                                <Link to="/plp">Headset Under 40000/-</Link>
                                <Link to="/plp">Headset Under 30000/-</Link>
                                <Link to="/plp">Headset Under 20000/-</Link>
                                <Link to="/plp">Headset Under 10000/-</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            <div className='toggler'>
                <Link className="navlink" id="menu-icon" onClick={menuToggle}>
                    <i className="fa-solid fa-bars fa-2xl"></i>
                </Link>

                <Link to='/wishlist' className="navlink" style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer', fontSize: "27px", display: "flex", alignItems: "center" }}>
                        favorite
                    </span>
                    {wishlistCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: "10px",
                            left: "12px",
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '12px',
                            width: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {wishlistCount}
                        </span>
                    )}
                </Link>

                <Link className='navlink' style={{ display: 'flex', alignItems: 'center' }}>
                    <Classic toggled={theme === 'light'} onToggle={toggleTheme} duration={750} style={{ transform: 'scale(2)', color: "#fff" }} />
                </Link>
            </div>

            <div className="responsive-menu">
                <Link to="/" className="responsive-menu-icon" onClick={menuToggle}>Home</Link>
                <Link to="/plp" className="responsive-menu-icon" onClick={menuToggle}>Store</Link>
                <Link to="/contact" className="responsive-menu-icon" onClick={menuToggle}>Contact</Link>
                <Link to="/login" className="responsive-menu-icon" onClick={menuToggle}>Login</Link>
            </div>
        </header>
    );
};

export default Navbar;
