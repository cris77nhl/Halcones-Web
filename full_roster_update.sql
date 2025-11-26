-- Full Roster Update Script (FIXED)
-- This script cleans up duplicate teams and consolidates all roster updates.

-- ==========================================
-- CLEANUP DUPLICATES
-- ==========================================

-- 1. Delete players from duplicate/unwanted teams (found in screenshot)
DELETE FROM players WHERE team_id IN (
    '274754f6-c6e0-4f22-a238-1027e3d819ca', -- Duplicate Juvenil Blue
    'a1b94cf3-494b-4892-b304-395943c1ec4e', -- Duplicate Senior Nacional
    'adc0b7c8-37e1-437d-aa48-20518e19dd84'  -- Duplicate Infantil Nacional
);

-- 2. Delete the duplicate teams themselves
DELETE FROM teams WHERE id IN (
    '274754f6-c6e0-4f22-a238-1027e3d819ca',
    'a1b94cf3-494b-4892-b304-395943c1ec4e',
    'adc0b7c8-37e1-437d-aa48-20518e19dd84'
);

-- ==========================================
-- PART 1: Senior Blue, White, Nacional, Junior, Juvenil (Blue)
-- ==========================================

-- Senior Nacional (Ensure it exists with correct ID)
INSERT INTO teams (id, name, category, image_url) VALUES
('b2c3d4e5-f6a7-8901-2345-678901234567', 'Senior Nacional', 'Senior', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Clear existing players for the CORRECT teams to avoid duplicates before re-inserting
DELETE FROM players WHERE team_id IN (
    'd290f1ee-6c54-4b01-90e6-d701748f0851', -- Senior Blue
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- Senior White
    'b2c3d4e5-f6a7-8901-2345-678901234567', -- Senior Nacional
    '4f762699-3c0d-4762-8820-205a6736c844', -- Junior
    'c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b'  -- Juvenil Blue (Original Juvenil)
);

-- Senior Blue Players
INSERT INTO players (team_id, name, number, position) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'DEL REY MUNAR IGNACIO', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'HERRANZ RODRIGUEZ ANDER', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'WANGER BELTRAN MARLEN', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'SOTO SANCHEZ CRISTOBAL', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'TALLON JIMENEZ PEDRO', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'MADER CHRISTIAN', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'KISS RICHÁRD ATTILA', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'GARCIA AGUIRRE UNAI', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'TAVANO GIUSEPPE LUIGI', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'PEREZ ANTON MARCOS', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'SOLLA JOHANSEN NEHUEN', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'SALINAS DIAZ MIGUEL-ANGEL', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'CASTILLO MUÑOZ DE LA NAVA ALEJANDRO', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'CATALAN MENA HECTOR', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'MORALES CORRAL GERARD', 0, 'Jugador'),
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'RIBAS PEY XAVIER', 0, 'Jugador');

-- Senior White Players
INSERT INTO players (team_id, name, number, position) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'CALDERÓN ÁLVAREZ LUIS', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'DOMENE PEREZ MANUEL', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'SEGURA MIRAS JAVIER', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'HERNANDO MOLINA VEGA', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'GUIRADO SIERRA PABLO', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'TEROL DONIS ANDREA', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PEREZ ANTON ELENA', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ROSELLI EIROA CAMILA ISABEL', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'TOVAR MARTINEZ SAUL', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'HALOCHKIN MYKHAILO', 0, 'Jugador'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'GARRIDO BEDMAR LEONARDO', 0, 'Jugador');

-- Senior Nacional Players
INSERT INTO players (team_id, name, number, position) VALUES
('b2c3d4e5-f6a7-8901-2345-678901234567', 'HERRANZ RODRIGUEZ ANDER', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'MADER CHRISTIAN', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'MUNAR DEL REY IGNACIO', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'TALLON JIMENEZ PEDRO', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'RIBAS PEY XAVIER', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'GARCIA AGUIRRE UNAI', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'CATALAN MENA HECTOR', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'MORALES CORRAL GERARD', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'SOTO SANCHEZ CRISTOBAL', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'CASTILLO MUÑOZ DE LA NAVA ALEJANDRO', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'PEREZ ANTON MARCOS', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'DOMENE PÉREZ MANUEL', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'HALOCHKIN MYKHAILO', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'SALINAS DIAZ MIGUEL-ANGEL', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'SOLLA NEHUEN TIAGO', 0, 'Jugador'),
('b2c3d4e5-f6a7-8901-2345-678901234567', 'TAVANO GIUSEPPE LUIGI', 0, 'Jugador');

-- Junior Players
INSERT INTO players (team_id, name, number, position) VALUES
('4f762699-3c0d-4762-8820-205a6736c844', 'PEREZ ANTON MARCOS', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'SOLLA JOHANSEN NEHUEN', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'SEGURA MIRAS JAVIER', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'DOMENE PEREZ MANUEL', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'TOVAR MARTINEZ SAUL', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'CALDERÓN ÁLVAREZ LUIS', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'HALOCHKIN MYKHAILO', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'SALINAS DIAZ MIGUEL-ANGEL', 0, 'Jugador'),
('4f762699-3c0d-4762-8820-205a6736c844', 'GARRIDO BEDMAR LEONARDO', 0, 'Jugador');

-- Juvenil Blue Players (Using original Juvenil ID)
INSERT INTO players (team_id, name, number, position) VALUES
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'RICO SALINAS LUCA', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'SOLLA JOHANSEN NEHUEN', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'DOMENE PEREZ MANUEL', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'CALDERÓN ÁLVAREZ LUIS', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'SALINAS DIAZ PABLO', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'SEGURA MIRAS JAVIER', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'CUENDIAS SOTO ÁNGEL', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'SÁNCHEZ OJEDA SERGIO', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'HERNANDO MOLINA VEGA', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'HARKUSHA YURII', 0, 'Jugador'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'HALOCHKIN MYKHAILO', 0, 'Jugador');


-- ==========================================
-- PART 2: Juvenil White, Infantil Blue/White/Nacional, Alevin
-- ==========================================

-- Rename existing 'Juvenil' to 'Juvenil Blue' for consistency (if not already done)
UPDATE teams SET name = 'Juvenil Blue' WHERE id = 'c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b';

-- Create new teams (Ensure they exist)
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


-- ==========================================
-- PART 3: Benjamín
-- ==========================================

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
