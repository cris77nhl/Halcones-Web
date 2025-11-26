ALTER TABLE teams ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Update Halcones teams
UPDATE teams SET logo_url = '/logos/halcones.png' WHERE name LIKE '%Halcones%' OR name LIKE '%Senior%' OR name LIKE '%Junior%' OR name LIKE '%Juvenil%' OR name LIKE '%Infantil%' OR name LIKE '%Alevín%' OR name LIKE '%Benjamín%';

-- Update Rivals (Force update of existing rows)
UPDATE teams
SET logo_url = t.logo_url
FROM (VALUES
    ('DIABLOS MISLATA A', '/logos/diablos-mislata-a.png'),
    ('DIABLOS MISLATA B', '/logos/diablos-mislata-b.png'),
    ('ORCAS OROPESA A', '/logos/orcas-oropesa-a.png'),
    ('ORCAS OROPESA B', '/logos/orcas-oropesa-b.png'),
    ('HC CASTELLÓN', '/logos/hc-castelln.png'),
    ('ALAS SAGUNTO', '/logos/alas-sagunto.png'),
    ('ALAS SAGUNTO WHITE', '/logos/alas-sagunto-white.png'),
    ('ALAS SAGUNTO GREEN', '/logos/alas-sagunto-green.png'),
    ('TITANES ELCHE A', '/logos/titanes-elche-a.png'),
    ('TITANES ELCHE B', '/logos/titanes-elche-b.png'),
    ('TITANES ELCHE', '/logos/titanes-elche.png'),
    ('LLOPS VILA-REAL A', '/logos/llops-vila-real-a.png'),
    ('LLOPS VILA-REAL B', '/logos/llops-vila-real-b.png'),
    ('LLOPS VILA-REAL C', '/logos/llops-vila-real-c.png'),
    ('CPH SKULLS PLATA', '/logos/cph-skulls-plata.png'),
    ('CPH SKULLS A', '/logos/cph-skulls-a.png'),
    ('CPH SKULLS G', '/logos/cph-skulls-g.png'),
    ('CPH SKULLS 5', '/logos/cph-skulls-5.png'),
    ('CPH SKULLS 6', '/logos/cph-skulls-6.png'),
    ('CRACKENS MISLATA', '/logos/crackens-mislata.png'),
    ('BERSERKERS', '/logos/berserkers.png'),
    ('DINOS BORRIOL', '/logos/dinos-borriol.png'),
    ('CP VILAFRANCA', '/logos/cp-vilafranca.png')
) AS t(name, logo_url)
WHERE teams.name = t.name;

-- Insert Rivals (if they don't exist)
INSERT INTO teams (name, category, logo_url)
SELECT name, 'Rival', logo_url
FROM (VALUES
    ('DIABLOS MISLATA A', '/logos/diablos-mislata-a.png'),
    ('DIABLOS MISLATA B', '/logos/diablos-mislata-b.png'),
    ('ORCAS OROPESA A', '/logos/orcas-oropesa-a.png'),
    ('ORCAS OROPESA B', '/logos/orcas-oropesa-b.png'),
    ('HC CASTELLÓN', '/logos/hc-castelln.png'),
    ('ALAS SAGUNTO', '/logos/alas-sagunto.png'),
    ('ALAS SAGUNTO WHITE', '/logos/alas-sagunto-white.png'),
    ('ALAS SAGUNTO GREEN', '/logos/alas-sagunto-green.png'),
    ('TITANES ELCHE A', '/logos/titanes-elche-a.png'),
    ('TITANES ELCHE B', '/logos/titanes-elche-b.png'),
    ('TITANES ELCHE', '/logos/titanes-elche.png'),
    ('LLOPS VILA-REAL A', '/logos/llops-vila-real-a.png'),
    ('LLOPS VILA-REAL B', '/logos/llops-vila-real-b.png'),
    ('LLOPS VILA-REAL C', '/logos/llops-vila-real-c.png'),
    ('CPH SKULLS PLATA', '/logos/cph-skulls-plata.png'),
    ('CPH SKULLS A', '/logos/cph-skulls-a.png'),
    ('CPH SKULLS G', '/logos/cph-skulls-g.png'),
    ('CPH SKULLS 5', '/logos/cph-skulls-5.png'),
    ('CPH SKULLS 6', '/logos/cph-skulls-6.png'),
    ('CRACKENS MISLATA', '/logos/crackens-mislata.png'),
    ('BERSERKERS', '/logos/berserkers.png'),
    ('DINOS BORRIOL', '/logos/dinos-borriol.png'),
    ('CP VILAFRANCA', '/logos/cp-vilafranca.png')
) AS t(name, logo_url)
WHERE NOT EXISTS (
    SELECT 1 FROM teams WHERE teams.name = t.name
);
