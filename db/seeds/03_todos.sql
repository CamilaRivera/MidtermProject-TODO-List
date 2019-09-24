INSERT INTO todos (id, title, description, creation_date, cover_photo_url, category_id) VALUES
(1, 'Read The player', 'likely shirt sold pond according again class combination source mood tail attention somehow smell game him strip late likely', '2019-05-12', 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(2, 'Watch Titanic', 'st wide empty alphabet', '2019-08-05', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 1),
(3, 'Play tennis with Sam', 'ct distance fast pressure honor else lot plain tent arm parts whenever vote truth friend unit globe spell gone bent hundred', '2019-03-03', 'https://images.pexels.com/photos/63590/san-francisco-california-city-cities-63590.jpeg', 3);

INSERT INTO todos (id, title, start_date, end_date, priority, cover_photo_url,todo_id, category_id) VALUES
(4, 'Go to the Grand Palace', '2019-03-03', '2019-10-03', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1, 4);

INSERT INTO todos (id, title, complete, cover_photo_url, todo_id, category_id) VALUES
(5, 'Buy food', TRUE , 'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg', 1, 4);

INSERT INTO todos (id, title, description, creation_date, cover_photo_url, category_id) VALUES
(6, 'Family guy', 'some description', '2019-09-13', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 1),
(7, 'Harry Potter', 'some description', '2019-09-13', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 1),
(8, 'Lord Of The Rings', 'some description', '2019-09-13', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 1),
(9, 'Divergent', 'some description', '2019-09-13', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 1);

SELECT SETVAL('todos_id_seq', 50);
