import React, { useEffect, useState } from 'react';
import { addToWishlist } from '../../utils/wishlistUtils';
import { Link } from 'react-router-dom';

const Product = ({ number }) => {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    if (number > 0) {
      fetchProductData(number);
    }
  }, [number]);


  function showToast(message, type = "success") {
      const toast = document.getElementById("toast");
      const msg = document.getElementById("toast-message");

      msg.textContent = message;

      toast.className = `toast show ${type}`;

      setTimeout(() => {
        toast.className = "toast"; // hide after 3 sec
      }, 3000);
    }

  const fetchProductData = async (limit) => {
    try {
      const response = await fetch(`http://localhost:80/WaveAura/Backend/product_re.php?limit=${limit}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Something went wrong while fetching products:", err);
    }
  };

  const handleWishlistClick = (id) => {
    addToWishlist(id);
    window.dispatchEvent(new Event('wishlistUpdated'));
    showToast("Added To Wishlist...","success")
  };

  return (
    <>
      <section className="product-gallery" id="product-gallery">
        <h2 className="product-gallary-heading">Ultimate range of Products</h2>
        <div className="product-lineup">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <figure className="product-figure">
                <img
                  src={product.imgSrc}
                  alt={product.altTxt}
                  className="product-image"
                />
              </figure>
              <div className="product-data-section">
                <div className="wishlist-icon-container">
                  <Link onClick={() => handleWishlistClick(product.id)}>
                    <i className="fa-solid fa-heart"></i>
                  </Link>
                </div>
                <h3>{product.name}</h3>
                <div className="product-data-rating">
                  <div className="star-rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <h5>(12 Reviews)</h5>
                </div>
                <div className="product-price-buynow">
                  <span className="amount">₹{product.price}</span>
                  <Link
                    to="/"
                    className="buy-button"
                    onClick={(e) => {
                      e.preventDefault();
                      // handleAddToCart(product.id);
                    }}
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="toast" className="toast">
        <span id="toast-message"></span>
      </div>
    </>
  );
};

export default Product;
