-- PostgreSQL database

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(130) NOT NULL,
  password VARCHAR(10) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  lastname VARCHAR(50),
  firstname VARCHAR(50)
);

CREATE TABLE adress_delivery (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  civility VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  adress VARCHAR(250) NOT NULL,
  additionnal_adress VARCHAR(250) NOT NULL,
  postal_code INT NOT NULL,
  city VARCHAR(70) NOT NULL,
  country VARCHAR(70) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR(130) NOT NULL,
  digicode INT,
  comment TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE adress_facturation (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  civility VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  adress VARCHAR(250) NOT NULL,
  additionnal_adress VARCHAR(250) NOT NULL,
  postal_code INT NOT NULL,
  city VARCHAR(70) NOT NULL,
  country VARCHAR(70) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR(130) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(250) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  reduction DECIMAL(10,2),
  description TEXT NOT NULL,
  category_id INT NOT NULL,
  activation BOOLEAN DEFAULT 'false',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  slug VARCHAR(120),
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  src VARCHAR(250) NOT NULL,
  alt VARCHAR(250) NOT NULL,
  title VARCHAR(250) NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE sizes (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE materials (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL
);

CREATE TABLE product_matiere (
  product_id INT NOT NULL,
  material_id INT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(material_id) REFERENCES materials(id)
);

CREATE TABLE stock (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  quantity INT NOT NULL,
  size_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY(size_id) REFERENCES sizes(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE ordered (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  livraison_id INT NOT NULL,
  facturation_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(livraison_id) REFERENCES adress_delivery(id),
  FOREIGN KEY(facturation_id) REFERENCES adress_facturation(id)
);

CREATE TABLE details_ordered (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  quantity INT NOT NULL,
  ordered_id INT NOT NULL,
  product_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(ordered_id) REFERENCES ordered(id)
);