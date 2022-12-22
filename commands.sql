CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs 
(author, url, title) 
VALUES (
  'Red Blob Games', 
  'https://www.redblobgames.com/grids/hexagons/', 
  'Hexagonal Grids');

INSERT INTO blogs 
(url, title, likes) 
VALUES (
  'https://stackoverflow.blog/2019/12/18/websockets-for-fun-and-profit/', 
  'WebSockets for fun and profit', 
  7);
