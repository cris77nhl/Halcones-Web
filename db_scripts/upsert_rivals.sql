-- Script to Insert or Update Rival Teams with Logos
-- This will ensure the team exists AND has the correct logo

-- Helper function to upsert (you can run these blocks individually or all together)

-- LLOPS VILA-REAL (Various categories)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'LLOPS VILA-REAL') THEN
        UPDATE teams SET image_url = '/logos/villa.png' WHERE name = 'LLOPS VILA-REAL';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('LLOPS VILA-REAL', 'Rival', '/logos/villa.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'LLOPS VILA-REAL A') THEN
        UPDATE teams SET image_url = '/logos/villa.png' WHERE name = 'LLOPS VILA-REAL A';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('LLOPS VILA-REAL A', 'Rival', '/logos/villa.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'LLOPS VILA-REAL B') THEN
        UPDATE teams SET image_url = '/logos/villa.png' WHERE name = 'LLOPS VILA-REAL B';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('LLOPS VILA-REAL B', 'Rival', '/logos/villa.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'LLOPS VILA-REAL C') THEN
        UPDATE teams SET image_url = '/logos/villa.png' WHERE name = 'LLOPS VILA-REAL C';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('LLOPS VILA-REAL C', 'Rival', '/logos/villa.png');
    END IF;
END $$;

-- OTHER RIVALS
DO $$
BEGIN
    -- ALAS SAGUNTO
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'ALAS SAGUNTO') THEN
        UPDATE teams SET image_url = '/logos/alas.png' WHERE name = 'ALAS SAGUNTO';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('ALAS SAGUNTO', 'Rival', '/logos/alas.png');
    END IF;

    -- TITANES ELCHE (A, B, and generic)
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'TITANES ELCHE A') THEN
        UPDATE teams SET image_url = '/logos/titanes.png' WHERE name = 'TITANES ELCHE A';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('TITANES ELCHE A', 'Rival', '/logos/titanes.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'TITANES ELCHE B') THEN
        UPDATE teams SET image_url = '/logos/titanes.png' WHERE name = 'TITANES ELCHE B';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('TITANES ELCHE B', 'Rival', '/logos/titanes.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'TITANES ELCHE') THEN
        UPDATE teams SET image_url = '/logos/titanes.png' WHERE name = 'TITANES ELCHE';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('TITANES ELCHE', 'Rival', '/logos/titanes.png');
    END IF;

    -- DIABLOS MISLATA (A and generic)
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'DIABLOS MISLATA A') THEN
        UPDATE teams SET image_url = '/logos/mislata.png' WHERE name = 'DIABLOS MISLATA A';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('DIABLOS MISLATA A', 'Rival', '/logos/mislata.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'DIABLOS MISLATA') THEN
        UPDATE teams SET image_url = '/logos/mislata.png' WHERE name = 'DIABLOS MISLATA';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('DIABLOS MISLATA', 'Rival', '/logos/mislata.png');
    END IF;

    -- ORCAS OROPESA (A, B, and generic)
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'ORCAS OROPESA A') THEN
        UPDATE teams SET image_url = '/logos/orcas.png' WHERE name = 'ORCAS OROPESA A';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('ORCAS OROPESA A', 'Rival', '/logos/orcas.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'ORCAS OROPESA B') THEN
        UPDATE teams SET image_url = '/logos/orcas.png' WHERE name = 'ORCAS OROPESA B';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('ORCAS OROPESA B', 'Rival', '/logos/orcas.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'ORCAS OROPESA') THEN
        UPDATE teams SET image_url = '/logos/orcas.png' WHERE name = 'ORCAS OROPESA';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('ORCAS OROPESA', 'Rival', '/logos/orcas.png');
    END IF;

    -- SKULLS (Plata and Almassera)
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'CPH SKULLS PLATA') THEN
        UPDATE teams SET image_url = '/logos/skulls.png' WHERE name = 'CPH SKULLS PLATA';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('CPH SKULLS PLATA', 'Rival', '/logos/skulls.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'CPH SKULLS ALMASSERA') THEN
        UPDATE teams SET image_url = '/logos/skulls.png' WHERE name = 'CPH SKULLS ALMASSERA';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('CPH SKULLS ALMASSERA', 'Rival', '/logos/skulls.png');
    END IF;

    -- CASTELLON (HC and Hockey Club)
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'HC CASTELLÓN') THEN
        UPDATE teams SET image_url = '/logos/castellon.png' WHERE name = 'HC CASTELLÓN';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('HC CASTELLÓN', 'Rival', '/logos/castellon.png');
    END IF;

    IF EXISTS (SELECT 1 FROM teams WHERE name = 'HOCKEY CLUB CASTELLON') THEN
        UPDATE teams SET image_url = '/logos/castellon.png' WHERE name = 'HOCKEY CLUB CASTELLON';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('HOCKEY CLUB CASTELLON', 'Rival', '/logos/castellon.png');
    END IF;

    -- CRACKENS
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'CRACKENS MISLATA') THEN
        UPDATE teams SET image_url = '/logos/crakens.png' WHERE name = 'CRACKENS MISLATA';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('CRACKENS MISLATA', 'Rival', '/logos/crakens.png');
    END IF;

    -- DINOS
    IF EXISTS (SELECT 1 FROM teams WHERE name = 'DINOS VILAREAL') THEN
        UPDATE teams SET image_url = '/logos/dinos.png' WHERE name = 'DINOS VILAREAL';
    ELSE
        INSERT INTO teams (name, category, image_url) VALUES ('DINOS VILAREAL', 'Rival', '/logos/dinos.png');
    END IF;

END $$;
