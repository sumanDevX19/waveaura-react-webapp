import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories on mount
    const getCategoryData = async () => {
      try {
        const response = await fetch(`http://localhost:80/WaveAura/Backend/category_re.php`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Something Went Wrong", err);
      }
    };

    getCategoryData();
  }, []);

  return (
    <section className="product-category-section" id="hero">
      <h2 className="product-catagory-heading">Headphone Categories</h2>
      <div className="product-categories" id="category-area">
        {categories.map((cate, index) => (
          <div key={index} className="product">
            <Link to="/plp">
              <figure className="menu-back">
                <img
                  src={cate.imgsrc}
                  className="menu-image"
                  alt={`${cate.name} image`}
                />
              </figure>
            </Link>
            <h3>{cate.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
