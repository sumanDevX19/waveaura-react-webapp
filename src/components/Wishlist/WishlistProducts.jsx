import React, { useEffect, useState } from "react";

const WishlistProducts = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(-1);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (storedWishlist.length === 0) {
      setWishlistItems([]);
      return;
    }

    fetch("http://localhost:80/WaveAura/Backend/get_wishlisted.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wishlist: storedWishlist }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setWishlistItems(data.products);
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [wishlistCount]);

  const handleWishlistClick = (id) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = storedWishlist.filter((itemId) => itemId !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistCount(updatedWishlist.length); // 🔁 Trigger re-render
    window.dispatchEvent(new Event("wishlistUpdated")); // optional global listener
  };

  return (
    <section className="product-gallery" id="wishlist-gallery">
      <h2 className="product-gallary-heading">Your Wishlist</h2>
      <div className="product-lineup">
        {wishlistItems.length === 0 ? (
      <div className="empty-wishlist">
        <h1 style={{color:"var(--text)"}}>Empty Wishlist Please Add some Products</h1>
      </div>
    ) : (wishlistItems.map((product) => (
          <div className="product-card" key={product.id}>
            <figure className="product-figure">
              <img
                src={product.imgSrc}
                alt={product.altText}
                className="product-image"
              />
            </figure>
            <div className="product-data-section">
              <div className="wishlist-icon-container">
                <a onClick={() => handleWishlistClick(product.id)}>
                  <i className="fa-solid fa-heart"></i>
                </a>
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
                <a
                  href="#"
                  className="buy-button"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleAddToCart(product.id);
                  }}
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        )))}
        
      </div>
    </section>
  );
};

export default WishlistProducts;
