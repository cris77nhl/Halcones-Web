-- Sample News Articles for Halcones Torrevieja
-- Run this after creating the news table

INSERT INTO news (title, author, content, image_url, created_at) VALUES
(
    'Victoria histórica del Senior Blue ante Alas Sagunto',
    'Redacción Halcones',
    'El equipo Senior Blue de los Halcones Torrevieja logró una victoria histórica este fin de semana ante Alas Sagunto con un marcador de 8-3. El partido, disputado en el Pabellón Cecilio Gallego, fue un verdadero espectáculo de hockey donde nuestros jugadores demostraron su calidad y trabajo en equipo.

Desde el primer periodo, los Halcones tomaron el control del juego con una defensa sólida y un ataque contundente. El capitán del equipo anotó un hat-trick, mientras que el portero realizó paradas espectaculares que mantuvieron la ventaja durante todo el encuentro.

El entrenador destacó el esfuerzo de todos los jugadores y el apoyo incondicional de la afición, que llenó las gradas para animar al equipo. Esta victoria consolida la posición de los Halcones en la tabla y les acerca un paso más a la clasificación para los playoffs.

El próximo partido será el sábado a las 16:30 en casa. ¡Os esperamos a todos para seguir celebrando juntos!',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '2 days'
),
(
    'Jornada de puertas abiertas: Únete a la familia Halcones',
    'Dirección Deportiva',
    'Los Halcones Torrevieja organizan una jornada de puertas abiertas el próximo sábado 7 de diciembre en el Pabellón Cecilio Gallego. El evento, que se celebrará de 10:00 a 14:00 horas, está dirigido a niños y niñas de todas las edades que quieran conocer el apasionante mundo del hockey línea.

Durante la jornada, nuestros entrenadores titulados ofrecerán clases de iniciación gratuitas donde los participantes podrán probar el material, aprender las técnicas básicas y disfrutar de juegos y actividades. Además, habrá exhibiciones de nuestros equipos juveniles y la oportunidad de conocer a los jugadores del primer equipo.

No es necesario traer material, nosotros proporcionamos todo lo necesario: patines, sticks, protecciones y cascos. Solo hace falta venir con ropa deportiva y muchas ganas de pasarlo bien.

Las inscripciones para la nueva temporada estarán abiertas y ofrecemos descuentos especiales para quienes se apunten durante la jornada. ¡No te pierdas esta oportunidad de formar parte de la familia Halcones!

Para más información, contacta con nosotros a través de nuestras redes sociales o en el correo info@halconestorrevieja.com',
    'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '5 days'
),
(
    'El equipo Junior se proclama campeón del Torneo de Navidad',
    'Prensa Halcones',
    'Nuestro equipo Junior ha conseguido un logro extraordinario al proclamarse campeón del prestigioso Torneo de Navidad de la Comunidad Valenciana, celebrado este fin de semana en Valencia. Tras tres días de intensa competición, los jóvenes Halcones demostraron su calidad superando a equipos de toda la región.

El torneo contó con la participación de 12 equipos de las mejores escuelas de hockey de la Comunidad Valenciana. Los Halcones llegaron a la final invictos, con 4 victorias y un empate en la fase de grupos. En la final se enfrentaron a los Diablos de Mislata en un partido emocionante que se decidió en los últimos minutos con un marcador de 5-4.

El MVP del torneo fue nuestro delantero, quien anotó 8 goles en todo el campeonato y realizó asistencias clave en los momentos decisivos. El entrenador del equipo Junior expresó su orgullo por el trabajo y la dedicación de todos los jugadores durante toda la temporada.

Este triunfo es especialmente significativo ya que demuestra el excelente trabajo que se está realizando en la cantera de los Halcones. Muchos de estos jóvenes talentos ya están siendo observados por equipos de categorías superiores.

¡Enhorabuena a todo el equipo Junior por este merecido título!',
    'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '1 week'
),
(
    'Nuevas instalaciones: Mejoras en el Pabellón Cecilio Gallego',
    'Club Halcones',
    'El Club Halcones Torrevieja se complace en anunciar importantes mejoras en las instalaciones del Pabellón Cecilio Gallego, nuestro hogar deportivo. Gracias al apoyo del Ayuntamiento de Torrevieja y nuestros patrocinadores, hemos podido realizar una serie de renovaciones que beneficiarán a todos nuestros equipos y aficionados.

Las mejoras incluyen la renovación completa de la superficie de juego con un nuevo pavimento de última generación que proporciona mejor agarre y reduce el riesgo de lesiones. Además, se han instalado nuevas gradas con capacidad para 200 espectadores adicionales, mejorando la experiencia de nuestra afición.

Los vestuarios han sido completamente reformados con nuevas taquillas, duchas y zonas de recuperación. También se ha creado una sala de fisioterapia equipada con material profesional para el cuidado y recuperación de nuestros deportistas.

En el área de espectadores, se ha habilitado una cafetería moderna y una tienda oficial donde los aficionados podrán adquirir merchandising del club. El sistema de iluminación también ha sido actualizado con tecnología LED, mejorando la visibilidad tanto para jugadores como para espectadores.

Estas mejoras consolidan al Pabellón Cecilio Gallego como una de las mejores instalaciones de hockey línea de la Comunidad Valenciana. Invitamos a todos a visitar las nuevas instalaciones en nuestro próximo partido en casa.

¡Gracias a todos los que han hecho posible estas mejoras!',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '10 days'
),
(
    'Clínic de hockey con jugadores profesionales',
    'Escuela Halcones',
    'Los Halcones Torrevieja organizan un clínic de hockey de alto nivel el próximo 15 de diciembre, donde jugadores profesionales de la liga nacional compartirán sus conocimientos y experiencias con nuestros jóvenes deportistas.

El evento contará con la participación de tres jugadores de la selección española de hockey línea, quienes impartirán sesiones técnicas especializadas en diferentes aspectos del juego: técnica individual, estrategia de equipo, y preparación física específica para hockey.

El clínic está dirigido a jugadores de todas las categorías, desde Benjamín hasta Senior, y se dividirá en grupos por edades para optimizar el aprendizaje. Las sesiones incluirán ejercicios prácticos, análisis táctico y una sesión de preguntas y respuestas donde los participantes podrán resolver todas sus dudas.

Las plazas son limitadas y la inscripción tiene un coste de 25€ para socios del club y 35€ para no socios. El precio incluye la participación en todas las sesiones, material didáctico y una camiseta conmemorativa del evento.

Esta es una oportunidad única para que nuestros jugadores aprendan de los mejores y se inspiren para seguir mejorando. Las inscripciones ya están abiertas a través de nuestra web o en la secretaría del club.

¡No dejes pasar esta oportunidad de aprender de los mejores!',
    'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '3 days'
),
(
    'Acuerdo de colaboración con el CD Torrevieja',
    'Presidencia',
    'El Club Halcones Torrevieja ha firmado un acuerdo de colaboración con el Club Deportivo Torrevieja con el objetivo de promover el deporte base en la ciudad y crear sinergias entre ambas entidades deportivas.

Este acuerdo permitirá compartir instalaciones, recursos y experiencias que beneficiarán a los deportistas de ambos clubs. Entre las iniciativas previstas se encuentra la organización de eventos deportivos conjuntos, intercambio de metodologías de entrenamiento y la posibilidad de que los jóvenes deportistas puedan practicar ambos deportes de manera complementaria.

El presidente de los Halcones destacó la importancia de esta colaboración: "Creemos firmemente en el valor del deporte como herramienta educativa y de integración social. Este acuerdo nos permite ampliar nuestro impacto en la comunidad y ofrecer más oportunidades a los jóvenes de Torrevieja."

Como parte del acuerdo, se organizará un torneo amistoso multideporte en primavera donde participarán equipos de ambos clubs en diferentes categorías. También se están estudiando programas de becas deportivas para jóvenes talentos que destaquen en cualquiera de las dos disciplinas.

Esta alianza refuerza el compromiso de los Halcones Torrevieja con el desarrollo deportivo de la ciudad y abre nuevas posibilidades para el crecimiento del club.

¡Juntos somos más fuertes!',
    'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=1920&auto=format&fit=crop',
    NOW() - INTERVAL '1 day'
);
