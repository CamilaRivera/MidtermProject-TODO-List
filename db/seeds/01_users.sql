INSERT INTO users (id, name, email, phone_number, password, avatar_url, birth_date)
VALUES (1, 'Armand Hilll', 'lera_hahn@dickens.org', '778-349-3299', 'password', 'https://cdn3.iconfinder.com/data/icons/dogs-outline/100/dog-04-512.png', '1990-12-11'),
(2, 'Pablo Soto', 'pablo_soto@dickens.org', '779-349-8899', 'password',  'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg', '1980-08-21'),
(3, 'Elliot Dickinson', 'derrick_pollich@gmail.com', '778-848-9923', 'password', 'https://images.pexels.com/photos/2078875/pexels-photo-2078875.jpeg', '2000-09-05');

SELECT SETVAL('users_id_seq', 50);