-- Seed data for Halcones Torrevieja
-- Generated based on FPCV data
-- Fixed: Using UUIDs for team IDs

-- TEAMS
INSERT INTO teams (id, name, category, image_url) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Senior Blue', 'Senior', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Senior White', 'Senior', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop'),
('4f762699-3c0d-4762-8820-205a6736c844', 'Junior', 'Junior', 'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=800&auto=format&fit=crop'),
('c8f1e9a2-5b3d-4e1f-8a2c-9d3b4e5f6a7b', 'Juvenil', 'Juvenil', 'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=800&auto=format&fit=crop'),
('e5d2c1b4-8a9f-4c3d-7e6f-5a4b3c2d1e0f', 'Infantil Blue', 'Infantil', 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=800&auto=format&fit=crop'),
('f6a3b2c1-7d8e-4f9a-0b1c-2d3e4f5a6b7c', 'Infantil White', 'Infantil', 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=800&auto=format&fit=crop'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'Alevín', 'Alevín', 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Benjamín', 'Benjamín', 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop');


-- MATCHES (Senior Blue)
INSERT INTO matches (category, home_team, away_team, date, time, location) VALUES
('Senior', 'HALCONES TORREVIEJA BLUE', 'ALAS SAGUNTO', '2025-09-21', '16:30', 'Cecilio Gallego'),
('Senior', 'TITANES ELCHE A', 'HALCONES TORREVIEJA BLUE', '2025-09-27', '11:00', 'Elche'),
('Senior', 'HALCONES TORREVIEJA BLUE', 'DIABLOS MISLATA A', '2025-10-05', '11:45', 'Cecilio Gallego'),
('Senior', 'ORCAS OROPESA A', 'HALCONES TORREVIEJA BLUE', '2025-10-19', '11:15', 'Oropesa'),
('Senior', 'HALCONES TORREVIEJA BLUE', 'LLOPS VILA-REAL A', '2025-10-26', '11:45', 'Cecilio Gallego'),
('Senior', 'CPH SKULLS PLATA', 'HALCONES TORREVIEJA BLUE', '2025-11-09', '11:00', 'Almassera'),
('Senior', 'HALCONES TORREVIEJA BLUE', 'HC CASTELLÓN', '2025-11-16', '11:45', 'Cecilio Gallego'),
('Senior', 'ALAS SAGUNTO', 'HALCONES TORREVIEJA BLUE', '2025-11-30', '12:00', 'Sagunto');

-- MATCHES (Senior White)
INSERT INTO matches (category, home_team, away_team, date, time, location) VALUES
('Senior', 'HALCONES TORREVIEJA WHITE', 'ORCAS OROPESA B', '2025-09-21', '13:00', 'Cecilio Gallego'),
('Senior', 'LLOPS VILA-REAL B', 'HALCONES TORREVIEJA WHITE', '2025-09-28', '12:30', 'Vila-real'),
('Senior', 'HALCONES TORREVIEJA WHITE', 'CRACKENS MISLATA', '2025-10-05', '13:00', 'Cecilio Gallego'),
('Senior', 'TITANES ELCHE B', 'HALCONES TORREVIEJA WHITE', '2025-10-19', '11:15', 'Elche'),
('Senior', 'HALCONES TORREVIEJA WHITE', 'DINOS VILAREAL', '2025-10-26', '13:00', 'Cecilio Gallego'),
('Senior', 'BERENGUER DALMAU', 'HALCONES TORREVIEJA WHITE', '2025-11-09', '12:30', 'Catarroja'),
('Senior', 'HALCONES TORREVIEJA WHITE', 'LLOPS VILA-REAL C', '2025-11-16', '13:00', 'Cecilio Gallego');

-- MATCHES (Junior)
INSERT INTO matches (category, home_team, away_team, date, time, location) VALUES
('Junior', 'HALCONES TORREVIEJA', 'ALAS SAGUNTO', '2025-09-21', '11:45', 'Cecilio Gallego'),
('Junior', 'TITANES ELCHE', 'HALCONES TORREVIEJA', '2025-09-28', '11:00', 'Elche'),
('Junior', 'HALCONES TORREVIEJA', 'DIABLOS MISLATA', '2025-10-05', '10:30', 'Cecilio Gallego'),
('Junior', 'ORCAS OROPESA', 'HALCONES TORREVIEJA', '2025-10-19', '12:30', 'Oropesa'),
('Junior', 'HALCONES TORREVIEJA', 'LLOPS VILA-REAL', '2025-10-26', '10:30', 'Cecilio Gallego'),
('Junior', 'CPH SKULLS PLATA', 'HALCONES TORREVIEJA', '2025-11-09', '12:15', 'Almassera'),
('Junior', 'HALCONES TORREVIEJA', 'HC CASTELLÓN', '2025-11-16', '10:30', 'Cecilio Gallego');

-- MATCHES (Juvenil)
INSERT INTO matches (category, home_team, away_team, date, time, location) VALUES
('Juvenil', 'HALCONES TORREVIEJA', 'ALAS SAGUNTO', '2025-09-22', '11:45', 'Cecilio Gallego'),
('Juvenil', 'TITANES ELCHE A', 'HALCONES TORREVIEJA', '2025-09-29', '11:00', 'Elche'),
('Juvenil', 'HALCONES TORREVIEJA', 'DIABLOS MISLATA A', '2025-10-06', '11:45', 'Cecilio Gallego'),
('Juvenil', 'ORCAS OROPESA', 'HALCONES TORREVIEJA', '2025-10-20', '11:15', 'Oropesa'),
('Juvenil', 'HALCONES TORREVIEJA', 'LLOPS VILA-REAL A', '2025-10-27', '11:45', 'Cecilio Gallego'),
('Juvenil', 'CPH SKULLS ALMASSERA', 'HALCONES TORREVIEJA', '2025-11-10', '11:00', 'Almassera'),
('Juvenil', 'HALCONES TORREVIEJA', 'HC CASTELLÓN', '2025-11-17', '11:45', 'Cecilio Gallego');
