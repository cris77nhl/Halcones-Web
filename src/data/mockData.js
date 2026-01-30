// Mock data for development/testing
export const newsData = [
    {
        id: '1',
        title: 'Victoria histórica del Senior Blue ante Alas Sagunto',
        author: 'Redacción Halcones',
        content: `El equipo Senior Blue de los Halcones Torrevieja logró una victoria histórica este fin de semana ante Alas Sagunto con un marcador de 8-3. El partido, disputado en el Pabellón Cecilio Gallego, fue un verdadero espectáculo de hockey donde nuestros jugadores demostraron su calidad y trabajo en equipo.

Desde el primer periodo, los Halcones tomaron el control del juego con una defensa sólida y un ataque contundente. El capitán del equipo anotó un hat-trick, mientras que el portero realizó paradas espectaculares que mantuvieron la ventaja durante todo el encuentro.

El entrenador destacó el esfuerzo de todos los jugadores y el apoyo incondicional de la afición, que llenó las gradas para animar al equipo. Esta victoria consolida la posición de los Halcones en la tabla y les acerca un paso más a la clasificación para los playoffs.

El próximo partido será el sábado a las 16:30 en casa. ¡Os esperamos a todos para seguir celebrando juntos!`,
        image_url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        title: 'Jornada de puertas abiertas: Únete a la familia Halcones',
        author: 'Dirección Deportiva',
        content: `Los Halcones Torrevieja organizan una jornada de puertas abiertas el próximo sábado 7 de diciembre en el Pabellón Cecilio Gallego. El evento, que se celebrará de 10:00 a 14:00 horas, está dirigido a niños y niñas de todas las edades que quieran conocer el apasionante mundo del hockey línea.

Durante la jornada, nuestros entrenadores titulados ofrecerán clases de iniciación gratuitas donde los participantes podrán probar el material, aprender las técnicas básicas y disfrutar de juegos y actividades. Además, habrá exhibiciones de nuestros equipos juveniles y la oportunidad de conocer a los jugadores del primer equipo.

No es necesario traer material, nosotros proporcionamos todo lo necesario: patines, sticks, protecciones y cascos. Solo hace falta venir con ropa deportiva y muchas ganas de pasarlo bien.

Las inscripciones para la nueva temporada estarán abiertas y ofrecemos descuentos especiales para quienes se apunten durante la jornada. ¡No te pierdas esta oportunidad de formar parte de la familia Halcones!`,
        image_url: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        title: 'El equipo Junior se proclama campeón del Torneo de Navidad',
        author: 'Prensa Halcones',
        content: `Nuestro equipo Junior ha conseguido un logro extraordinario al proclamarse campeón del prestigioso Torneo de Navidad de la Comunidad Valenciana, celebrado este fin de semana en Valencia. Tras tres días de intensa competición, los jóvenes Halcones demostraron su calidad superando a equipos de toda la región.

El torneo contó con la participación de 12 equipos de las mejores escuelas de hockey de la Comunidad Valenciana. Los Halcones llegaron a la final invictos, con 4 victorias y un empate en la fase de grupos. En la final se enfrentaron a los Diablos de Mislata en un partido emocionante que se decidió en los últimos minutos con un marcador de 5-4.

El MVP del torneo fue nuestro delantero, quien anotó 8 goles en todo el campeonato y realizó asistencias clave en los momentos decisivos. El entrenador del equipo Junior expresó su orgullo por el trabajo y la dedicación de todos los jugadores durante toda la temporada.

Este triunfo es especialmente significativo ya que demuestra el excelente trabajo que se está realizando en la cantera de los Halcones. ¡Enhorabuena a todo el equipo Junior por este merecido título!`,
        image_url: 'https://images.unsplash.com/photo-1628891890463-8588041068c4?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '4',
        title: 'Nuevas instalaciones: Mejoras en el Pabellón Cecilio Gallego',
        author: 'Club Halcones',
        content: `El Club Halcones Torrevieja se complace en anunciar importantes mejoras en las instalaciones del Pabellón Cecilio Gallego, nuestro hogar deportivo. Gracias al apoyo del Ayuntamiento de Torrevieja y nuestros patrocinadores, hemos podido realizar una serie de renovaciones que beneficiarán a todos nuestros equipos y aficionados.

Las mejoras incluyen la renovación completa de la superficie de juego con un nuevo pavimento de última generación que proporciona mejor agarre y reduce el riesgo de lesiones. Además, se han instalado nuevas gradas con capacidad para 200 espectadores adicionales, mejorando la experiencia de nuestra afición.

Los vestuarios han sido completamente reformados con nuevas taquillas, duchas y zonas de recuperación. También se ha creado una sala de fisioterapia equipada con material profesional para el cuidado y recuperación de nuestros deportistas.

Estas mejoras consolidan al Pabellón Cecilio Gallego como una de las mejores instalaciones de hockey línea de la Comunidad Valenciana. ¡Gracias a todos los que han hecho posible estas mejoras!`,
        image_url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '5',
        title: 'Clínic de hockey con jugadores profesionales',
        author: 'Escuela Halcones',
        content: `Los Halcones Torrevieja organizan un clínic de hockey de alto nivel el próximo 15 de diciembre, donde jugadores profesionales de la liga nacional compartirán sus conocimientos y experiencias con nuestros jóvenes deportistas.

El evento contará con la participación de tres jugadores de la selección española de hockey línea, quienes impartirán sesiones técnicas especializadas en diferentes aspectos del juego: técnica individual, estrategia de equipo, y preparación física específica para hockey.

El clínic está dirigido a jugadores de todas las categorías, desde Benjamín hasta Senior, y se dividirá en grupos por edades para optimizar el aprendizaje. Las sesiones incluirán ejercicios prácticos, análisis táctico y una sesión de preguntas y respuestas.

Las plazas son limitadas y la inscripción tiene un coste de 25€ para socios del club y 35€ para no socios. ¡No dejes pasar esta oportunidad de aprender de los mejores!`,
        image_url: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '6',
        title: 'Acuerdo de colaboración con el CD Torrevieja',
        author: 'Presidencia',
        content: `El Club Halcones Torrevieja ha firmado un acuerdo de colaboración con el Club Deportivo Torrevieja con el objetivo de promover el deporte base en la ciudad y crear sinergias entre ambas entidades deportivas.

Este acuerdo permitirá compartir instalaciones, recursos y experiencias que beneficiarán a los deportistas de ambos clubs. Entre las iniciativas previstas se encuentra la organización de eventos deportivos conjuntos, intercambio de metodologías de entrenamiento y la posibilidad de que los jóvenes deportistas puedan practicar ambos deportes de manera complementaria.

El presidente de los Halcones destacó la importancia de esta colaboración: "Creemos firmemente en el valor del deporte como herramienta educativa y de integración social. Este acuerdo nos permite ampliar nuestro impacto en la comunidad y ofrecer más oportunidades a los jóvenes de Torrevieja."

Esta alianza refuerza el compromiso de los Halcones Torrevieja con el desarrollo deportivo de la ciudad y abre nuevas posibilidades para el crecimiento del club. ¡Juntos somos más fuertes!`,
        image_url: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=1920&auto=format&fit=crop',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// Products data for merchandising
export const productsData = [
    {
        id: 1,
        name: 'Camiseta Oficial',
        price: '25€',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Sudadera Halcones',
        price: '35€',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Gorra Oficial',
        price: '15€',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Mochila Deportiva',
        price: '30€',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Botella Térmica',
        price: '12€',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Bufanda Halcones',
        price: '18€',
        image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 7,
        name: 'Polo Oficial',
        price: '28€',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 8,
        name: 'Llavero Halcones',
        price: '8€',
        image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=800&auto=format&fit=crop'
    }
];

