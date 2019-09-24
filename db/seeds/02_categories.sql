-- Widgets table seeds here (Example)
INSERT INTO categories (id, description, user_id, cover_photo_url, main_category)
VALUES (1, 'Watch', 1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(2, 'Buy', 1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 2),
(3, 'Read', 1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 3),
(4, 'Eat',1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 4),
(5, 'Watch', 2, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(6, 'Buy', 2, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 2),
(7, 'Read', 2, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 3),
(8, 'Eat',2, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 4),
(9, 'Watch', 3, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(10, 'Buy', 3, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 2),
(11, 'Read', 3, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 3),
(12, 'Eat',3, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 4);

INSERT INTO categories (id, description, creation_date, user_id, cover_photo_url)
VALUES (13, 'Books', '2018-11-02', 1, 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg'),
(14, 'Movies', '2017-11-02', 1, 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg'),
(15, 'Sports', '2019-02-02', 2, 'https://images.pexels.com/photos/63590/san-francisco-california-city-cities-63590.jpeg'),
(16, 'Restaurants', '2019-03-03', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350');

SELECT SETVAL('categories_id_seq', 50);