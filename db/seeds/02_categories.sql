-- Widgets table seeds here (Example)
INSERT INTO categories (id, description, creation_date, user_id, cover_photo_url)
VALUES (1, 'Books', '2018-11-02', 1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg'),
(2, 'Movies', '2017-11-02', 1, 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg'),
(3, 'Sports', '2019-02-02', 2, 'https://images.pexels.com/photos/63590/san-francisco-california-city-cities-63590.jpeg'),
(4, 'Restaurants', '2019-03-03', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350');

SELECT SETVAL('categories_id_seq', 50);
