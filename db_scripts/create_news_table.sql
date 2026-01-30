-- Create News Table
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some initial data (optional, but good for testing)
INSERT INTO news (title, author, content, image_url, created_at) VALUES
('Victoria del Senior Blue', 'Prensa Halcones', 'El equipo Senior Blue logró una importante victoria este fin de semana...', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop', NOW() - INTERVAL '2 days'),
('Escuela de Hockey', 'Dirección Técnica', 'Abiertas las inscripciones para la nueva temporada de la escuela...', 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop', NOW() - INTERVAL '5 days'),
('Torneo de Verano', 'Club', 'Gran éxito en el torneo de verano celebrado en nuestras instalaciones...', 'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=800&auto=format&fit=crop', NOW() - INTERVAL '1 week');
