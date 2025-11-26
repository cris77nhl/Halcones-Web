-- Update Rosters based on images
-- Senior Nacional (New Team)
INSERT INTO teams (id, name, category, image_url) VALUES
('b2c3d4e5-f6a7-8901-2345-678901234567', 'Senior Nacional', 'Senior', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Clear existing players for these teams to avoid duplicates
DELETE FROM players WHERE team_id IN (
    'd290f1ee-6c54-4b01-90e6-d701748f0851', -- Senior Blue
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- Senior White
    'b2c3d4e5-f6a7-8901-2345-678901234567', -- Senior Nacional
    '4f762699-3c0d-4762-8820-205a6736c844', -- Junior
    'c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b'  -- Juvenil
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

-- Juvenil Players (Assuming Juvenil Blue is the main Juvenil team for now)
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
