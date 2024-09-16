CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    FOREIGN KEY ("user_email") REFERENCES users(email) ON DELETE CASCADE
);

INSERT INTO posts (title, image, content, user_email)
VALUES
('The Rise of Decentralized Finance', '/uploads/image-1.jpg', '<p>Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.</p>', 'ahmedfathy20044002@gmail.com'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-2.jpg', '<p>Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.</p>', 'ahmedfathy20044002@gmail.com'),
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-3.jpg', '<p>Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.</p>', 'ahmedfathy20044002@gmail.com'),
('The Rise of Decentralized Finance', '/uploads/image-4.jpg', '<p>Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.</p>', 'ahmedfathy20044002@gmail.com'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-5.jpg', '<p>Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.</p>', 'ahmedfathy20044002@gmail.com');


-- Posts for User Two
INSERT INTO posts (title, image, content, user_email)
VALUES
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-6.jpg', '<p>Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.</p>', 'test@test.com'),
('The Rise of Decentralized Finance', '/uploads/image-7.jpg', '<p>Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.</p>', 'test@test.com'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-8.jpg', '<p>Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.</p>', 'test@test.com'),
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-9.jpg', '<p>Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.</p>', 'test@test.com'),
('The Rise of Decentralized Finance', '/uploads/image-10.jpg', '<p>Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.</p>', 'test@test.com');
