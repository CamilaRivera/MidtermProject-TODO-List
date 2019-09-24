INSERT INTO todos (id, title, description, start_date, end_date, cover_photo_url, category_id) VALUES
(1, 'Read The player', 'likely shirt sold pond according again class combination source mood tail attention somehow smell game him strip late likely', '2019-09-11', '2019-10-01', 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', 1),
(2, 'Watch Titanic', 'st wide empty alphabet', '2019-08-10', '2019-10-11', 'https://images.pexels.com/photos/2104146/pexels-photo-2104146.jpeg', 2),
(3, 'Play tennis with Sam', 'ct distance fast pressure honor else lot plain tent arm parts whenever vote truth friend unit globe spell gone bent hundred', '2019-03-03', '2019-09-27', 'https://images.pexels.com/photos/63590/san-francisco-california-city-cities-63590.jpeg', 3);


INSERT INTO todos (id, title, start_date, end_date, priority, cover_photo_url,todo_id, category_id) VALUES
(4, 'Go to the Grand Palace', '2019-03-03', '2019-10-03', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1, 4);

INSERT INTO todos (id, title, complete, cover_photo_url, todo_id, category_id) VALUES
(5, 'Buy food', TRUE , 'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg', 1, 4);



INSERT INTO todos (id, title, start_date, end_date, priority, cover_photo_url, category_id) VALUES
(6, 'Watch kill bill 2', '2019-09-22', '2019-09-29', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(7, 'Go to the cinema to watch Fast & Furious', '2019-03-03', '2019-09-29', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(8, 'See the last season of La casa de Papel', '2019-03-03', '2019-09-29', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1),
(9, 'Buy a new pc', '2019-03-03', '2019-10-10', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 2),
(10, 'Buy ticket for Concert', '2019-03-03', '2019-10-10', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 2),
(11, 'Read Damian', '2019-03-03', '2019-10-03', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 3),
(12, 'Read one book of Isaac Asimov', '2019-03-03', '2019-10-11', 4, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 3),
(13, 'Eat with Sam on monday', '2019-03-03', '2019-09-24', 1, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(14, 'Go to eat at the new place in Downtown', '2019-03-03', '2019-10-03', 2, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(15, 'Go to a coffee with John', '2019-03-03', '2019-09-23', 3, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
(16, 'Watch the last season of Vikings', '2019-03-03', '2019-09-23', 4, 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 1);


SELECT SETVAL('todos_id_seq', 50);

