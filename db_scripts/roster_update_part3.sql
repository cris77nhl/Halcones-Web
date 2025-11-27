-- Update Rosters Part 3 (Benjamín)

-- Clear existing players for Benjamín
DELETE FROM players WHERE team_id = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

-- Benjamín Players
INSERT INTO players (team_id, name, number, position) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'KOMARISTYY DANILA', 0, 'Jugador'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'ESTEBAN MARTINEZ IZAN', 0, 'Jugador'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'ROMASHOV ROBERT', 0, 'Jugador'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'CALDERÓN ÁLVAREZ PABLO', 0, 'Jugador'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'SALINAS DIAZ ARTURO', 0, 'Jugador'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'BALZA CASTRO CESAR', 0, 'Jugador');
