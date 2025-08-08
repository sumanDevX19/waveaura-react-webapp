import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <section className="hero-section" id="home">
                <div className="left-hero">
                    <h2>Experience the Ultimate Range of Hearing.</h2>
                    <p>
                        Welcome to WaveAura. Get Exiting Deals on All range of Products!
                        Hurry Limited period Offer.
                    </p>

                    <Link to="/plp">Order Now</Link>
                </div>
                <div className="right-hero">
                    <figure>
                        <img
                            src="./Asset/image.png"
                            id="hero-image"
                            alt="Best Selling Headset Product" />
                    </figure>
                </div>
            </section>
        </>
    )
}

export default Hero