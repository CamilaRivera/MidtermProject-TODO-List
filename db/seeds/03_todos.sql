INSERT INTO todos (id, title, description, start_date, end_date, cover_photo_url, category_id) VALUES
(1, 'Avengers', 'my fav', '2019-09-11', '2019-10-01', 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(2, 'Ninetendo Switch', 'Maxs fav', '2019-08-10', '2019-10-11', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 2),
(3, '12 Rules for life', 'My friend told me about Jordan Peterson', '2019-03-03', '2019-09-27', 'https://images.pexels.com/photos/63590/san-francisco-california-city-cities-63590.jpeg', 3);

INSERT INTO todos (id, title, description, start_date, end_date, priority, cover_photo_url, category_id) VALUES
(4, 'Tacos', 'eat tacos with jenny', '2019-03-03', '2019-10-03', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4);

INSERT INTO todos (id, title, description, complete, cover_photo_url, category_id) VALUES
(5, 'sushi', 'eat sushi', TRUE, 'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg', 4);

INSERT INTO todos (id, title, description, start_date, end_date, priority, cover_photo_url, category_id) VALUES
(6, 'kill bill', 'Watch it for Sunday night', '2019-09-22', '2019-09-29', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(7, 'Ant Man', 'watch it with Sean', '2019-03-03', '2019-09-28', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(8, 'Wonder Woman', 'Netflix maybe?', '2019-03-03', '2019-09-29', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(9, 'Gaming Laptop', 'Check the Best Buy', '2019-03-03', '2019-10-10', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 2),
(10, 'Pokemon Omega Ruby', 'My fav game', '2019-03-03', '2019-10-10', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 2),
(11, 'Game of Thrones', 'The things I do for love.', '2019-03-03', '2019-10-03', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 3),
(12, 'Foundation', 'Foundation from Isaac Asimov may be a good choice.', '2019-03-03', '2019-10-11', 4, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 3),
(13, 'brunch', 'eat brunch with sammy', '2019-03-03', '2019-09-28', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(14, 'Pho', 'Pho Delicious is good!', '2019-03-03', '2019-10-03', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(15, 'coffee', 'get coffee bean', '2019-03-03', '2019-09-30', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(16, 'Vikings', 'Cant wait for it!!', '2019-03-03', '2019-09-27', 4, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(17, 'Best Chinese Food', 'In Vancouver', '2019-10-03', '2019-10-03', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4);

SELECT SETVAL('todos_id_seq', 50);