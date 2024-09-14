CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL
);

INSERT INTO "posts" ("title", "image", "content") VALUES
('The Rise of Decentralized Finance', '/uploads/image-1.jpg', 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-2.jpg', 'Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.'),
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-3.jpg', 'Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.'),
('The Rise of Decentralized Finance', '/uploads/image-4.jpg', 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-5.jpg', 'Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.'),
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-6.jpg', 'Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.'),
('The Rise of Decentralized Finance', '/uploads/image-7.jpg', 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.'),
('The Impact of Artificial Intelligence on Modern Businesses', '/uploads/image-8.jpg', 'Artificial Intelligence (AI) is no longer a concept of the future. It''s very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.'),
('Sustainable Living: Tips for an Eco-Friendly Lifestyle', '/uploads/image-9.jpg', 'Sustainability is more than just a buzzword; it''s a way of life. As the effects of climate change become more pronounced, there''s a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.'),
('The Rise of Decentralized Finance', '/uploads/image-10.jpg', 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.');


CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100)
)


