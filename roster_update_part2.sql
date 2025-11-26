-- Update Rosters Part 2
-- Rename existing 'Juvenil' to 'Juvenil Blue' for consistency
UPDATE teams SET name = 'Juvenil Blue' WHERE id = 'c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b';

-- Create new teams
INSERT INTO teams (id, name, category, image_url) VALUES
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'Juvenil White', 'Juvenil', 'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=800&auto=format&fit=crop'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Infantil Nacional', 'Infantil', 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=800&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Clear existing players for these teams
DELETE FROM players WHERE team_id IN (
    '7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', -- Juvenil White
    'e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', -- Infantil Blue
    'f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', -- Infantil White
    '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', -- Infantil Nacional
    'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e'  -- Alevín
);

-- Juvenil White Players
INSERT INTO players (team_id, name, number, position) VALUES
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'POBLET SIMÓN EVARISTO', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'PÉREZ ANTÓN HÉCTOR', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'ALVARADO ESTEBAN GINÉS', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'SOLLA QUIMEY', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'TOVAR MARTINEZ SAUL', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'YAKIMOV VICTOR', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'PEREZ ANTON ELENA', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'ZURDO GRACIA DIEGO', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'ESCRIBA GURBANOVA FRANCISCO', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'GARRIDO BEDMAR LEONARDO', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'BOWEN MORTIMER DANIEL JOHN', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'CASTELLET HERNANDEZ PABLO', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'FORTES LIMA DILARA', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'PORUSHCHENKO MAKSYM', 0, 'Jugador'),
('7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a', 'TOVAR MARTINEZ SALVADOR', 0, 'Jugador');

-- Infantil Blue Players
INSERT INTO players (team_id, name, number, position) VALUES
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'SALINAS DIAZ PABLO', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'RICO SALINAS LUCA', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'ALVARADO ESTEBAN GINÉS', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'POBLET SIMÓN EVARISTO', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'CUENDIAS SOTO ÁNGEL', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'PÉREZ ANTÓN HÉCTOR', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'SÁNCHEZ OJEDA SERGIO', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'SOLLA QUIMEY', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'HARKUSHA YURII', 0, 'Jugador'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'ESCRIBA GURBANOVA FRANCISCO', 0, 'Jugador');

-- Infantil White Players
INSERT INTO players (team_id, name, number, position) VALUES
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'YAKIMOV VICTOR', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'ZURDO GRACIA DIEGO', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'BOWEN MORTIMER DANIEL JOHN', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'PORUSHCHENKO MAKSYM', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'FORTES LIMA DILARA', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'TOVAR MARTINEZ SALVADOR', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'CASTELLET HERNANDEZ PABLO', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'RYZHYKH KARPOVA VERONIKA', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'SOLLA TAHIEL AUKAN', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'ZETA CARCAMO LUZ VALENTINA', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'GARCÍA ROMERO JORGE', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'HAGELKVIST COLIN ERIC LENNART', 0, 'Jugador'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'KOMARISTYY DAVID', 0, 'Jugador');

-- Infantil Nacional Players
INSERT INTO players (team_id, name, number, position) VALUES
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'CALDERÓN ÁLVAREZ PABLO', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'KOMARISTYY DANILA', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'SOLLA TAHIEL AUKAN', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'HAGELKVIST COLIN ERIC LENNART', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'KOMARISTYY DAVID', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'SALINAS DIAZ ARTURO', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'BALZA CASTRO CESAR', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'GARCÍA ROMERO JORGE', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'POBLET CATALINA', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'RODRIGUEZ REYES MARINA', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'ZETA CARCAMO LUZ VALENTINA', 0, 'Jugador'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'RYZHYKH KARPOVA VERONIKA', 0, 'Jugador');

-- Alevín Players
INSERT INTO players (team_id, name, number, position) VALUES
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'HARKUSHA YURII', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'RICO SALINAS LUCA', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'SALINAS DIAZ PABLO', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'PEREZ ANTON HECTOR', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'SÁNCHEZ OJEDA SERGIO', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'POBLET SIMON EVARISTO', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'ESCRIBA GURBANOVA FRANCISCO', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'SOLLA QUIMEY', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'CUENDIAS SOTO ANGEL', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'ALVARADO ESTEBAN GINÉS', 0, 'Jugador'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'YAKIMOV VICTOR', 0, 'Jugador');
