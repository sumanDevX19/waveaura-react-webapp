CREATE DATABASE waveaura;

USE waveaura;

drop table users_data;

CREATE TABLE users_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) unique,
  password VARCHAR(100),
  gender varchar(20),
  city varchar(20),
  cart JSON
);

select * from users_data;

drop table category_react;

CREATE TABLE category_react (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,               
    imgsrc VARCHAR(500) NOT NULL,           
    description TEXT,                       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE          
);

INSERT INTO category_react (name, slug, imgsrc, description)
VALUES 
('Realme TWS', 'realme_tws', './Asset/menu1.jpg', 'Realme Headphone TWS Buds'),
('Realme Colar', 'realme_colar', './Asset/menu2.jpg', 'Realme Colar Headphones'),
('Samsung Buds', 'smasung_buds', './Asset/menu3.jpg', 'Samsung Air Buds'),
('Realme Buds', 'realme_buds', './Asset/menu4.jpg', 'Realme Air Buds'),
('Noise Buds', 'noise_buds', './Asset/menu5.jpg', 'Noise Air Buds'),
('Zebronics Headset', 'zebronics_headset', './Asset/headphone2.jpg', 'Zebronics Headset'),
('Amazon Headset', 'amazon_headset', './Asset/headphone4.jpg', 'Amazon Basic Headset');

select * from category_react;

CREATE TABLE contact (
    con_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),               
    message VARCHAR(10000) NOT NULL,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



select * from contact;

CREATE TABLE customer (
    cust_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),                        
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

select * from customer;

CREATE TABLE product_details_react (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  imgSrc TEXT NOT NULL,
  altText VARCHAR(255),
  productPageLink TEXT,
  quantity INT DEFAULT 0,
  rating INT DEFAULT 0 CHECK (rating BETWEEN 1 AND 5),
  review JSON,
  category_id INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category(cat_id) ON DELETE SET NULL
);


select * from product_details_react;

drop table product_details_react;

INSERT INTO product_details_react (
  name, price, imgSrc, altText, productPageLink,
  quantity, rating, review, category_id
) VALUES
(
  'Boult Headset',
  6000.00,
  './assets/headphone1.jpg',
  'Boult Audio Headset Image',
  '#',
  50,
  4,
  '[]',
  7
),
(
  'Zebronics HEadset',
  4000.00,
  './assets/headphone2.jpg',
  'Zebronics headset Image',
  '#',
  100,
  3,
  '[]',
  6
),
(
  'Zebronics RGB Headset',
  5500.00,
  './assets/headphone3.jpg',
  'Zebronics Basics RGB Headset',
  '#',
  70,
  5,
  '[]',
  6 
),
(
  'Amazon RGB Headset',
  7500.00,
  './assets/headphone4.jpg',
  'Amazon Basic RGB Headset',
  '#',
  30,
  4,
  '[]',
  7
);


INSERT INTO product_details_react (
  name, price, imgSrc, altText, productPageLink,
  quantity, rating, review, category_id
) VALUES
(
  'Boat Headset Black/Gray',
  2000.00,
  './Asset/headphone5.jpg',
  'Boat Headset Black/Gray',
  '#',
  50,
  4,
  '[]',
  7
),
(
  'Boat Headset Purple/Pink',
  2000.00,
  './Asset/headphone6.jpg',
  'Boat Headset Purple/Pink',
  '#',
  100,
  3,
  '[]',
  7
),
(
  'Boat Headset Blue/Yellow',
  2500.00,
  './Asset/headphone7.jpg',
  'Boat Headset Blue/Yellow',
  '#',
  70,
  5,
  '[]',
  7 
),
(
  'Boat Headset Red/Black',
  7500.00,
  './Asset/headphone8.jpg',
  'Boat Headset Red/Black',
  '#',
  30,
  4,
  '[]',
  7
),
(
  'Apple Headset',
  55000.00,
  './Asset/headphone9.jpg',
  'Apple Headset',
  '#',
  30,
  4,
  '[]',
  7
),
(
  'Marshall Headset',
  17500.00,
  './Asset/headphone10.jpg',
  'Marshall Headset',
  '#',
  30,
  4,
  '[]',
  7
),

(
  'Sony Headset',
  7500.00,
  './Asset/headphone11.jpg',
  'Sony Headset',
  '#',
  30,
  4,
  '[]',
  7
);


INSERT INTO product_details_react (
  name, price, imgSrc, altText, productPageLink,
  quantity, rating, review, category_id
) VALUES(

	'Bose Headset',
  27500.00,
  './Asset/headphone12.jpg',
  'Bose Headset',
  '#',
  30,
  4,
  '[]',
  7

);

select * from product_details_react;


