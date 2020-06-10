INSERT INTO users (username, password)
VALUES ('demo', 'demopassword');

INSERT INTO cards (title, content, tags, author)
VALUES 
('Biking', 'went on a bike ride with my wife & kids.', 'Recreation', 1),
('Making Cookies', 'made cookies, here is my recipe:', 'Culinary', 1),
('Monopoly', 'played monopoly with my family', 'Entertainment', 1);

INSERT INTO tags (tag)
VALUES 
('Recreation'),
('Culinary'),
('Entertainment');






-- password is 'demopassword'
-- INSERT INTO users (email, password) 
-- VALUES
-- ('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');

-- INSERT INTO collections (user_id, collection_name)
-- VALUES
-- (1, 'React Front'),
-- (1, 'Node Server'),
-- (1, 'Django Server'),
-- (1, 'Friendship');