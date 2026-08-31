export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  heroImage: string
  author: string
  date: string
  displayDate: string
  readTime: string
  content: BlogSection[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "que-ver-en-bogota-lugares-imprescindibles",
    title: "10 lugares imprescindibles que ver en Bogotá",
    excerpt:
      "Desde el centro histórico de La Candelaria hasta las vistas de Monserrate, esta es la guía definitiva de los lugares que no puedes perderte en la capital colombiana.",
    category: "Destinos",
    heroImage: "/images/blog/lugares-imprescindibles-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-01-10",
    displayDate: "10 de enero de 2026",
    readTime: "7 min",
    content: [
      {
        paragraphs: [
          "Bogotá es una ciudad que se disfruta despacio. A 2.640 metros de altura, la capital de Colombia mezcla arquitectura colonial, museos de talla mundial, montañas verdes y una escena gastronómica que sorprende a todo el que la visita. Si es tu primera vez, esta lista te ayudará a organizar tu recorrido por los diez lugares que definen la experiencia bogotana.",
        ],
      },
      {
        heading: "1. La Candelaria, el corazón histórico",
        paragraphs: [
          "El barrio de La Candelaria es el punto de partida obligatorio. Sus calles empedradas, casas coloniales de colores y muros pintados con arte urbano cuentan la historia de la ciudad desde su fundación en 1538. Piérdete por sus callejones, entra a un café tradicional y déjate sorprender por cada esquina.",
        ],
      },
      {
        heading: "2. El Cerro de Monserrate",
        paragraphs: [
          "Ninguna visita a Bogotá está completa sin subir a Monserrate. A 3.152 metros de altura, este santuario ofrece la vista panorámica más impresionante de la ciudad. Puedes subir en teleférico, funicular o caminando, y arriba encontrarás restaurantes típicos y jardines para disfrutar del atardecer.",
        ],
      },
      {
        heading: "3. El Museo del Oro",
        paragraphs: [
          "Con más de 34.000 piezas de orfebrería prehispánica, el Museo del Oro es uno de los más importantes del mundo en su categoría. Es una parada imprescindible para entender las culturas indígenas que habitaron Colombia mucho antes de la llegada de los españoles.",
        ],
      },
      {
        heading: "4. La Plaza de Bolívar",
        paragraphs: [
          "El epicentro político e histórico del país. Rodeada por la Catedral Primada, el Capitolio Nacional y el Palacio de Justicia, esta plaza es perfecta para comprender la historia de Colombia y tomar fotografías memorables.",
        ],
      },
      {
        heading: "5. Usaquén y su mercado de pulgas",
        paragraphs: [
          "Este antiguo pueblo colonial, hoy integrado a la ciudad, es famoso por su ambiente bohemio, sus restaurantes gourmet y su mercado de pulgas de los domingos. Ideal para una tarde tranquila lejos del bullicio del centro.",
        ],
      },
      {
        heading: "6. El Museo Botero",
        paragraphs: [
          "Ubicado en La Candelaria, alberga obras del maestro Fernando Botero y una colección internacional con piezas de Picasso, Dalí y Monet. La entrada es gratuita y es una joya cultural que muchos turistas pasan por alto.",
        ],
      },
      {
        heading: "7. La Zona T y la Zona Rosa",
        paragraphs: [
          "El corazón del entretenimiento bogotano. Aquí encontrarás los mejores restaurantes, bares, discotecas y centros comerciales. Es el lugar para salir de noche y probar la cocina internacional que convive con los sabores locales.",
        ],
      },
      {
        heading: "8. El Jardín Botánico y el Parque Simón Bolívar",
        paragraphs: [
          "El pulmón verde de la ciudad. El Parque Simón Bolívar es más grande que el Central Park de Nueva York y, junto al Jardín Botánico, ofrece un respiro natural perfecto para caminar, montar bicicleta o hacer un picnic.",
        ],
      },
      {
        heading: "9. El barrio La Macarena",
        paragraphs: [
          "Un rincón artístico y gastronómico lleno de galerías, restaurantes de autor y un ambiente relajado. Es el lugar preferido de los bogotanos que buscan buena comida y arte contemporáneo.",
        ],
      },
      {
        heading: "10. El Mercado de Paloquemao",
        paragraphs: [
          "Para una experiencia auténtica, visita este mercado tradicional donde encontrarás las frutas exóticas, flores y sabores que definen a Colombia. Ir con un guía te permitirá probar frutas que no conocías y entender la cultura local.",
        ],
      },
      {
        heading: "Recorre la ciudad con comodidad",
        paragraphs: [
          "Bogotá es una ciudad grande y el tráfico puede ser intenso. Para aprovechar tu tiempo al máximo, contar con transporte privado marca la diferencia: te movilizas con seguridad entre cada punto, sin esperas ni preocupaciones, y con la flexibilidad de armar tu propio itinerario. En BogotourVIP diseñamos recorridos privados con conductores y guías bilingües para que solo te dediques a disfrutar.",
        ],
      },
    ],
    metaTitle: "10 lugares imprescindibles que ver en Bogotá | Guía de viaje",
    metaDescription:
      "Descubre los 10 lugares imprescindibles de Bogotá: La Candelaria, Monserrate, Museo del Oro, Plaza de Bolívar y más. Guía completa para tu viaje a la capital colombiana.",
    keywords: [
      "que ver en bogotá",
      "lugares turísticos bogotá",
      "qué hacer en bogotá",
      "atracciones bogotá",
      "guía de viaje bogotá",
    ],
  },
  {
    slug: "como-moverse-por-bogota-transporte-turistas",
    title: "Cómo moverse por Bogotá: guía de transporte para turistas",
    excerpt:
      "TransMilenio, taxis, apps y transporte privado. Te explicamos las opciones para moverte por Bogotá de forma segura y eficiente durante tu visita.",
    category: "Consejos de viaje",
    heroImage: "/images/blog/transporte-privado-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-01-15",
    displayDate: "15 de enero de 2026",
    readTime: "6 min",
    content: [
      {
        paragraphs: [
          "Moverse por una ciudad de más de ocho millones de habitantes puede parecer intimidante, pero con la información correcta es más sencillo de lo que crees. Aquí te explicamos todas las opciones de transporte en Bogotá y cuándo conviene usar cada una.",
        ],
      },
      {
        heading: "TransMilenio y SITP",
        paragraphs: [
          "El sistema de buses articulados TransMilenio es la columna vertebral del transporte público bogotano. Es económico y cubre gran parte de la ciudad, pero en horas pico va muy lleno y conviene cuidar tus pertenencias. El SITP son los buses azules que complementan las rutas. Para un turista, puede ser útil en trayectos puntuales, aunque requiere conocer bien las rutas.",
        ],
      },
      {
        heading: "Taxis y aplicaciones",
        paragraphs: [
          "Los taxis son abundantes, pero se recomienda pedirlos siempre por aplicación en lugar de tomarlos en la calle, por seguridad. Varias apps de movilidad funcionan en la ciudad y permiten pagar con tarjeta. Ten en cuenta que en horas pico las tarifas suben y los tiempos de espera aumentan.",
        ],
      },
      {
        heading: "La bicicleta",
        paragraphs: [
          "Bogotá es una de las ciudades más amigables con la bicicleta en América Latina, con cientos de kilómetros de ciclorrutas. Los domingos, la Ciclovía cierra las principales avenidas para peatones y ciclistas: una experiencia local imperdible.",
        ],
      },
      {
        heading: "Transporte privado: la opción más cómoda para el turista",
        paragraphs: [
          "Si valoras tu tiempo, tu comodidad y tu seguridad, el transporte privado es la mejor alternativa para recorrer Bogotá. A diferencia del transporte público, no dependes de rutas ni horarios, evitas las esperas y viajas con un conductor que conoce la ciudad.",
          "Para traslados desde el aeropuerto, recorridos turísticos o excursiones a los alrededores, un servicio privado te recoge en tu hotel, te espera en cada parada y te lleva directamente a tu destino. Es especialmente recomendable si viajas en familia, con equipaje o con un itinerario ajustado.",
          "En BogotourVIP ofrecemos transporte especial y privado con conductores profesionales, vehículos cómodos y monitoreo de vuelos para los traslados al Aeropuerto El Dorado. Así conviertes cada desplazamiento en parte de la experiencia y no en una preocupación.",
        ],
      },
      {
        heading: "Consejos finales",
        paragraphs: [
          "Ten siempre a mano la dirección de tu hotel escrita, evita mostrar objetos de valor en el transporte público y planifica tus trayectos considerando el tráfico, especialmente entre las 6 y 9 de la mañana y las 5 y 8 de la noche. Con un poco de planificación, moverte por Bogotá será parte del disfrute de tu viaje.",
        ],
      },
    ],
    metaTitle: "Cómo moverse por Bogotá: guía de transporte para turistas",
    metaDescription:
      "Guía completa de transporte en Bogotá: TransMilenio, taxis, apps, bicicleta y transporte privado. Aprende a moverte seguro y cómodo durante tu visita.",
    keywords: [
      "transporte en bogotá",
      "cómo moverse en bogotá",
      "transporte privado bogotá",
      "taxis bogotá",
      "transmilenio turistas",
    ],
  },
  {
    slug: "mejores-excursiones-de-un-dia-desde-bogota",
    title: "Las mejores excursiones de un día desde Bogotá",
    excerpt:
      "La Catedral de Sal, la Laguna de Guatavita, Villa de Leyva y más. Descubre los destinos perfectos para una escapada de un día desde la capital.",
    category: "Alrededores",
    heroImage: "/images/blog/excursiones-un-dia-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-01-20",
    displayDate: "20 de enero de 2026",
    readTime: "8 min",
    content: [
      {
        paragraphs: [
          "Una de las grandes ventajas de Bogotá es su ubicación: en pocas horas puedes pasar de la gran ciudad a pueblos coloniales, lagunas sagradas y maravillas subterráneas. Estas son las mejores excursiones de un día que puedes hacer desde la capital.",
        ],
      },
      {
        heading: "La Catedral de Sal de Zipaquirá",
        paragraphs: [
          "A menos de una hora de Bogotá, la Catedral de Sal es considerada la primera maravilla de Colombia. Se trata de un templo tallado a 180 metros bajo tierra dentro de una mina de sal, con un Vía Crucis iluminado y una nave central que deja sin palabras. El pueblo de Zipaquirá, de arquitectura colonial, complementa perfectamente la visita.",
        ],
      },
      {
        heading: "La Laguna de Guatavita",
        paragraphs: [
          "Esta laguna sagrada de los Muiscas es el origen de la leyenda de El Dorado. Rodeada de paisajes andinos, se recorre por un sendero ecológico guiado que te lleva hasta su mirador. Es una escapada ideal para conectar con la naturaleza y la historia ancestral de Colombia.",
        ],
      },
      {
        heading: "Villa de Leyva",
        paragraphs: [
          "Uno de los pueblos más hermosos de Colombia, con una de las plazas empedradas más grandes de América y casas coloniales blancas intactas. Aunque está a unas tres horas de Bogotá, su encanto justifica el viaje. En sus alrededores hay viñedos, fósiles y desiertos que sorprenden a todos.",
        ],
      },
      {
        heading: "Guatavita pueblo y el embalse de Tominé",
        paragraphs: [
          "El pueblo de Guatavita, reconstruido en estilo colonial, se asoma sobre el embalse de Tominé. Es un lugar tranquilo, perfecto para caminar, comprar artesanías y disfrutar de vistas espectaculares del agua rodeada de montañas.",
        ],
      },
      {
        heading: "Suesca y sus rocas",
        paragraphs: [
          "Para los amantes de la aventura, Suesca es la meca de la escalada en roca en Colombia. Además ofrece senderismo, ciclismo y deportes de río en un entorno natural impresionante, a poco más de una hora de la ciudad.",
        ],
      },
      {
        heading: "Cómo aprovechar al máximo tu excursión",
        paragraphs: [
          "El principal reto de estas escapadas es el transporte. El transporte público hacia los alrededores es limitado, lento y complica combinar varios destinos en un mismo día. Por eso, la mayoría de viajeros elige un servicio privado.",
          "Con transporte especial y privado partes directamente desde tu hotel, viajas cómodo entre montañas, decides cuánto tiempo pasar en cada lugar y regresas sin depender de horarios. En BogotourVIP organizamos estas excursiones con guías bilingües y conductores expertos en las rutas, para que tu escapada sea segura y sin estrés de principio a fin.",
        ],
      },
    ],
    metaTitle: "Mejores excursiones de un día desde Bogotá | Guía completa",
    metaDescription:
      "Las mejores excursiones de un día desde Bogotá: Catedral de Sal de Zipaquirá, Laguna de Guatavita, Villa de Leyva, Suesca y más. Escapadas con transporte privado.",
    keywords: [
      "excursiones desde bogotá",
      "que hacer cerca de bogotá",
      "catedral de sal zipaquirá",
      "villa de leyva desde bogotá",
      "tours de un día bogotá",
    ],
  },
  {
    slug: "guia-la-candelaria-centro-historico-bogota",
    title: "Qué hacer en La Candelaria: guía del centro histórico de Bogotá",
    excerpt:
      "Museos, arte callejero, cafés y leyendas coloniales. Recorre el barrio más emblemático de Bogotá con esta guía detallada.",
    category: "Destinos",
    heroImage: "/images/blog/la-candelaria-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-01-25",
    displayDate: "25 de enero de 2026",
    readTime: "6 min",
    content: [
      {
        paragraphs: [
          "La Candelaria es el barrio donde nació Bogotá y sigue siendo su alma cultural. Caminar por sus calles es como recorrer un museo al aire libre donde conviven la historia colonial, el arte urbano contemporáneo y la vida universitaria. Esta guía te ayudará a descubrir lo mejor del centro histórico.",
        ],
      },
      {
        heading: "El Chorro de Quevedo",
        paragraphs: [
          "Según la tradición, aquí se fundó la ciudad en 1538. Hoy es una pequeña plaza rodeada de cafés, artistas y cuenteros que mantienen viva la tradición oral bogotana. Al atardecer se llena de estudiantes y viajeros: el ambiente es único.",
        ],
      },
      {
        heading: "El arte callejero",
        paragraphs: [
          "Bogotá tiene una de las escenas de grafiti más respetadas del mundo, y La Candelaria es su epicentro. Los murales cuentan historias sociales, políticas y culturales del país. Un graffiti tour guiado te permite entender el significado detrás de cada obra y conocer a los artistas que las crearon.",
        ],
      },
      {
        heading: "Museos para todos los gustos",
        paragraphs: [
          "En pocas cuadras encontrarás el Museo del Oro, el Museo Botero, la Casa de la Moneda y el Museo de Arte del Banco de la República. Muchos tienen entrada gratuita y ofrecen un panorama completo del arte y la historia de Colombia.",
        ],
      },
      {
        heading: "Cafés y gastronomía",
        paragraphs: [
          "El barrio está lleno de cafés tradicionales donde probar un buen café colombiano y platos típicos como el ajiaco santafereño. Es el lugar perfecto para hacer una pausa entre museo y museo.",
        ],
      },
      {
        heading: "Consejos para tu visita",
        paragraphs: [
          "La Candelaria se recorre a pie, pero llegar hasta allí desde otras zonas de la ciudad puede tomar tiempo por el tráfico. Un traslado privado hasta el centro histórico te ahorra complicaciones y te permite comenzar el recorrido con energía.",
          "Si quieres aprovechar al máximo el día, en BogotourVIP combinamos el transporte privado con un guía experto que te acompaña por el barrio, te cuenta las historias que no salen en las guías y coordina las entradas a los museos. Así vives La Candelaria con seguridad y sin perderte nada.",
        ],
      },
    ],
    metaTitle: "Qué hacer en La Candelaria: guía del centro histórico de Bogotá",
    metaDescription:
      "Guía completa de La Candelaria en Bogotá: Chorro de Quevedo, arte callejero, museos, cafés y consejos. Descubre el centro histórico con un tour privado.",
    keywords: [
      "que hacer en la candelaria",
      "centro histórico bogotá",
      "graffiti tour bogota",
      "la candelaria bogotá",
      "museos bogotá",
    ],
  },
  {
    slug: "consejos-clima-altura-seguridad-viajar-bogota",
    title: "Clima, altura y seguridad: consejos para viajar a Bogotá",
    excerpt:
      "Todo lo que necesitas saber antes de viajar a Bogotá: cómo vestirte, cómo adaptarte a la altura y cómo moverte con seguridad por la ciudad.",
    category: "Consejos de viaje",
    heroImage: "/images/blog/clima-altura-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-02-01",
    displayDate: "1 de febrero de 2026",
    readTime: "5 min",
    content: [
      {
        paragraphs: [
          "Bogotá es una ciudad fascinante, pero su altura y su clima particular pueden tomar por sorpresa a quien no viene preparado. Estos consejos prácticos te ayudarán a disfrutar tu viaje sin contratiempos.",
        ],
      },
      {
        heading: "El clima: prepárate para las cuatro estaciones en un día",
        paragraphs: [
          "A 2.640 metros de altura, Bogotá tiene un clima fresco durante todo el año, con temperaturas que van de los 7 a los 19 grados. Puede amanecer soleado, llover a media tarde y refrescar por la noche. La clave es vestirse en capas: lleva siempre una chaqueta, un paraguas pequeño y zapatos cómodos para caminar.",
        ],
      },
      {
        heading: "La altura: tómatelo con calma",
        paragraphs: [
          "El primer día puedes sentir el efecto de la altitud: cansancio, dolor de cabeza leve o dificultad para respirar al subir escaleras. Es normal. Bebe mucha agua, evita el exceso de alcohol las primeras horas, come ligero y no te exijas demasiado el primer día. El cuerpo se adapta rápido.",
        ],
      },
      {
        heading: "Seguridad: sentido común ante todo",
        paragraphs: [
          "Como en cualquier gran ciudad, conviene tomar precauciones. Evita mostrar objetos de valor, no lleves grandes cantidades de efectivo y prefiere moverte en transporte confiable, sobre todo de noche. Infórmate sobre las zonas recomendadas para turistas y confía en tu instinto.",
        ],
      },
      {
        heading: "Moverte con tranquilidad",
        paragraphs: [
          "Una de las mejores formas de viajar seguro es contar con transporte privado, especialmente al llegar al aeropuerto o al desplazarte de noche. Con un conductor profesional evitas riesgos, no dependes de encontrar transporte en la calle y viajas con la confianza de estar en buenas manos.",
          "En BogotourVIP ofrecemos traslados y recorridos con conductores de confianza y vehículos cómodos, para que tu única preocupación sea disfrutar de la ciudad. Es la manera más tranquila de conocer Bogotá, sobre todo si es tu primera visita.",
        ],
      },
    ],
    metaTitle: "Clima, altura y seguridad: consejos para viajar a Bogotá",
    metaDescription:
      "Consejos esenciales para viajar a Bogotá: cómo enfrentar el clima, adaptarte a la altura y moverte con seguridad. Guía práctica para tu primer viaje.",
    keywords: [
      "consejos viajar a bogotá",
      "clima bogotá",
      "altura bogotá",
      "seguridad bogotá turistas",
      "qué llevar a bogotá",
    ],
  },
  {
    slug: "guia-gastronomica-que-comer-en-bogota",
    title: "Guía gastronómica: qué comer en Bogotá",
    excerpt:
      "Ajiaco, tamal, changua y frutas exóticas. Un recorrido por los sabores tradicionales de Bogotá y los mejores lugares para probarlos.",
    category: "Gastronomía",
    heroImage: "/images/blog/gastronomia-bogota.png",
    author: "Equipo BogotourVIP",
    date: "2026-02-06",
    displayDate: "6 de febrero de 2026",
    readTime: "6 min",
    content: [
      {
        paragraphs: [
          "La gastronomía bogotana es un reflejo de la diversidad de Colombia: platos de raíces indígenas y coloniales, ingredientes de tierra fría y una increíble variedad de frutas que no encontrarás en ningún otro lugar. Esta guía te lleva por los sabores que tienes que probar.",
        ],
      },
      {
        heading: "El ajiaco santafereño",
        paragraphs: [
          "El plato insignia de Bogotá. Una sopa espesa de tres tipos de papa, pollo, mazorca y guascas (una hierba local), servida con crema, alcaparras y aguacate. Reconfortante y perfecta para el clima fresco de la ciudad.",
        ],
      },
      {
        heading: "El tamal y la changua",
        paragraphs: [
          "El tamal tolimense envuelto en hoja de plátano es un clásico del desayuno de fin de semana. La changua, una sopa de leche con huevo y cilantro, es el desayuno tradicional de la sabana que despierta a los bogotanos desde hace generaciones.",
        ],
      },
      {
        heading: "Las frutas exóticas",
        paragraphs: [
          "Colombia es un paraíso de frutas. En los mercados como Paloquemao podrás probar lulo, guanábana, curuba, feijoa, mangostino y granadilla, entre muchas otras. Un recorrido guiado por el mercado es una experiencia sensorial imperdible.",
        ],
      },
      {
        heading: "El café colombiano",
        paragraphs: [
          "No puedes irte sin probar un buen café. Bogotá tiene una escena de cafés de especialidad en pleno auge, donde baristas expertos preparan granos de las mejores regiones del país. Muchos ofrecen catas para entender todo el proceso.",
        ],
      },
      {
        heading: "Un tour gastronómico a tu medida",
        paragraphs: [
          "Los mejores sabores de Bogotá están repartidos por distintos barrios, desde La Candelaria hasta Usaquén y La Macarena. Recorrerlos en transporte público toma tiempo y resta espontaneidad a la experiencia.",
          "Con un recorrido privado puedes diseñar tu propia ruta gastronómica, moverte cómodamente entre mercados, restaurantes y cafés, y aprovechar cada parada sin preocuparte por el traslado. En BogotourVIP creamos experiencias personalizadas con transporte y guía para que descubras la Bogotá más sabrosa a tu ritmo.",
        ],
      },
    ],
    metaTitle: "Guía gastronómica: qué comer en Bogotá | Sabores típicos",
    metaDescription:
      "Descubre qué comer en Bogotá: ajiaco, tamal, changua, frutas exóticas y café de especialidad. Guía gastronómica de los sabores típicos de la capital colombiana.",
    keywords: [
      "que comer en bogotá",
      "comida típica bogotá",
      "gastronomía bogotá",
      "ajiaco santafereño",
      "tour gastronómico bogotá",
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
