import type { TourFaq } from "./tours"

// Contenido largo, FAQ y metadatos SEO en INGLES para cada tour.
// Traducidos fielmente desde la base en espanol de lib/tours.ts.
// Se usa en las rutas /en/tours y /en/tours/[slug] para captar turistas extranjeros.
export interface TourContentEn {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  longDescription: string[]
  faq: TourFaq[]
}

const tourContentEn: Record<string, TourContentEn> = {
  "city-tour-bogota": {
    metaTitle: "Bogotá City Tour | Private Tour of the Historic Center",
    metaDescription:
      "Discover the best of Bogotá on a private City Tour: Plaza de Bolívar, Gold Museum, La Candelaria and Monserrate with a bilingual guide. Book on WhatsApp.",
    keywords: ["bogota city tour", "private tour bogota", "things to do in bogota", "bogota tours"],
    longDescription: [
      "The Bogotá City Tour is the best way to understand a city that surprises you at every corner. In a single day you'll travel through more than five centuries of history, from the cobblestone streets of La Candelaria to the skyscrapers of the financial district, with a local guide who knows the stories that don't make it into the guidebooks.",
      "We start at Plaza de Bolívar, surrounded by the Primatial Cathedral, the National Capitol and the Palace of Justice. From there we walk through the colonial quarter, admiring the street art that has made Bogotá famous around the world, and we visit the Gold Museum, home to the largest collection of pre-Hispanic goldwork on the planet.",
      "The whole tour runs at your own pace, with private air-conditioned transport between each stop and breaks to taste the local cuisine. It's the ideal tour for first-time visitors who want to take in a complete overview of the city in just a few hours.",
    ],
    faq: [
      {
        q: "How long is the Bogotá City Tour?",
        a: "The private City Tour lasts between 4 and 5 hours and includes Plaza de Bolívar, the Gold Museum, La Candelaria and a panoramic view of the city. We can adjust the itinerary to your pace and interests.",
      },
      {
        q: "What does the Bogotá City Tour include?",
        a: "It includes private air-conditioned transport, a bilingual guide, entrance tickets to the museums on the route and a bottle of water. Pickup can be at your hotel in Bogotá.",
      },
      {
        q: "Is the City Tour suitable for the whole family?",
        a: "Yes. It's a comfortable, flexible tour, ideal for families, couples and travelers arriving in Bogotá for the first time who want to see the city's essentials in a single day.",
      },
      {
        q: "In which languages is the tour offered?",
        a: "We offer guides in Spanish and English. With advance notice we can also arrange other languages for private groups.",
      },
    ],
  },
  "la-candelaria": {
    metaTitle: "La Candelaria & Graffiti Tour Bogotá | Old Town Walking Tour",
    metaDescription:
      "Explore La Candelaria, Bogotá's historic center, and its famous street art with a local guide. Graffiti tour, Chorro de Quevedo and historic cafés.",
    keywords: ["la candelaria tour", "graffiti tour bogota", "bogota historic center", "bogota street art"],
    longDescription: [
      "La Candelaria is the soul of Bogotá: a maze of colonial streets, colorful houses, hidden squares and walls turned into open-air art galleries. This tour combines the history of the city's founding with the creative energy that defines it today.",
      "You'll walk through Chorro de Quevedo, the place where, according to tradition, Bogotá was founded in 1538, and you'll hear the legends still told between its walls. Our guide will explain the meaning of the street art — one of the most respected graffiti scenes in Latin America — and the stories of the artists behind each mural.",
      "Among alleyways, bohemian cafés and artisan workshops, you'll understand why La Candelaria is a heritage site and the perfect starting point for falling in love with the Colombian capital.",
    ],
    faq: [
      {
        q: "What is the La Candelaria Graffiti Tour?",
        a: "It's a walking tour through Bogotá's historic center where you'll discover the murals and street art that have made the city famous, with a guide who explains the meaning and stories behind each work.",
      },
      {
        q: "How long is the La Candelaria tour?",
        a: "The tour lasts around 3 hours and includes Chorro de Quevedo, the main colonial streets, the street art and a Colombian coffee tasting.",
      },
      {
        q: "Is it a walking tour or by transport?",
        a: "La Candelaria is explored mainly on foot, as it's the best way to appreciate its cobblestone streets and murals. We arrange pickup at your hotel and transfer to the neighborhood.",
      },
    ],
  },
  monserrate: {
    metaTitle: "Monserrate Tour Bogotá | Cable Car & Panoramic View",
    metaDescription:
      "Go up Monserrate Hill and enjoy the best view of Bogotá. Transport, cable car and guide included. Book your Monserrate tour on WhatsApp.",
    keywords: ["monserrate tour", "cerro monserrate", "monserrate bogota", "panoramic view bogota"],
    longDescription: [
      "Monserrate is the landmark that crowns Bogotá. At 3,152 meters above sea level, this hill offers the most impressive view of the city and is, at the same time, one of the most visited religious sanctuaries in Colombia.",
      "You can go up by cable car, by funicular or, if you're looking for a more active experience, along the pedestrian trail that pilgrims have walked for centuries. Once at the top, besides the views, you'll find the Señor Caído sanctuary, gardens, craft markets and restaurants serving typical Bogotá cuisine.",
      "It's a perfect plan for sunset, when the city begins to light up and the horizon of the Bogotá savanna turns golden. Our service includes transport from your hotel and coordination of the tickets, so all you have to worry about is enjoying it.",
    ],
    faq: [
      {
        q: "How do you get up to Monserrate?",
        a: "You can go up by cable car, funicular or the pedestrian trail. Our service arranges transport from your hotel and the ascent tickets so you can simply enjoy the experience.",
      },
      {
        q: "What is the best time to visit Monserrate?",
        a: "Sunset is the favorite time, when the city starts to light up and the horizon turns golden. It's also spectacular during the day to take in the entire Bogotá savanna.",
      },
      {
        q: "Is Monserrate safe and suitable for all ages?",
        a: "Yes. The cable car or funicular ascent is comfortable and safe for all ages. Keep in mind Monserrate sits at 3,152 m of altitude, so we recommend going up slowly.",
      },
    ],
  },
  "laguna-de-guatavita": {
    metaTitle: "Guatavita Lake Tour | Day Trip from Bogotá",
    metaDescription:
      "Day trip to Guatavita Lake from Bogotá, birthplace of the El Dorado legend. Eco-trail, Muisca history and transport included.",
    keywords: ["guatavita lake tour", "laguna de guatavita", "el dorado colombia", "day trips from bogota"],
    longDescription: [
      "Just over an hour from Bogotá hides one of the most magical places in Colombia: Guatavita Lake. For the Muisca people it was a sacred space, and it was here that the legend of El Dorado was born — the legend that obsessed European conquistadors for centuries.",
      "The tour includes a guided walk along an eco-trail, through cloud forests and natural viewpoints, until you reach the edge of the lake. There, our guide will tell you about the rituals of the Muisca chiefs, who covered their bodies in gold dust before submerging themselves in these waters, and the fascinating history of the attempts to drain the lake in search of treasure.",
      "It's an ideal getaway to connect with nature and the ancestral spirituality of the Andes, with comfortable transport from Bogotá and time to enjoy the colonial town of Guatavita on the shore of the reservoir.",
    ],
    faq: [
      {
        q: "How far is Guatavita Lake from Bogotá?",
        a: "Guatavita Lake is about 60 km from Bogotá, just over an hour by car. The trip is a full day (6-7 hours) and includes round-trip transport.",
      },
      {
        q: "Is there a lot of walking to reach the lake?",
        a: "There's a guided walk along a moderate eco-trail, through cloud forest and viewpoints, to the edge of the lake. We recommend comfortable footwear and warm clothing.",
      },
      {
        q: "What is the legend of El Dorado?",
        a: "Guatavita Lake was sacred to the Muisca: their chiefs covered themselves in gold dust and submerged into its waters as an offering. That ritual gave rise to the myth of El Dorado that obsessed the conquistadors.",
      },
    ],
  },
  "catedral-de-sal-zipaquira": {
    metaTitle: "Zipaquirá Salt Cathedral Tour from Bogotá",
    metaDescription:
      "Visit the Salt Cathedral of Zipaquirá, Colombia's first wonder, on a day trip from Bogotá with transport and guide. Book on WhatsApp.",
    keywords: ["salt cathedral zipaquira tour", "zipaquira from bogota", "catedral de sal", "day trips from bogota"],
    longDescription: [
      "The Salt Cathedral of Zipaquirá is considered the first wonder of Colombia, and one visit is enough to understand why. It's a complete Catholic temple, carved 180 meters underground within the galleries of a former salt mine, lit with plays of light that leave you breathless.",
      "The route begins at the Stations of the Cross — fourteen stations sculpted into the salt rock — and culminates in the central nave with its imposing illuminated cross, one of the largest in the world carved from this material. It's an experience blending the spiritual, the artistic and the geological, with no comparison.",
      "We combine the visit with a stroll through the charming town of Zipaquirá, with its colonial architecture and peaceful atmosphere. We depart from Bogotá with private transport, making it a perfect half-day trip for the whole family.",
    ],
    faq: [
      {
        q: "How much does the Salt Cathedral of Zipaquirá tour cost?",
        a: "The price depends on the number of people and the pickup point. Message us on WhatsApp with your dates and we'll send you a personalized quote. The trip includes transport, guide and entrance.",
      },
      {
        q: "How far is Zipaquirá from Bogotá?",
        a: "Zipaquirá is 49 km from Bogotá, about an hour by car. We offer the Salt Cathedral as a half-day trip (5-6 hours) with private transport.",
      },
      {
        q: "What can you see inside the Salt Cathedral?",
        a: "You'll walk through the Stations of the Cross carved into the salt rock, the underground chambers and the imposing central nave with its illuminated cross — one of the largest in the world in this material — 180 meters underground.",
      },
    ],
  },
  "villa-de-leyva": {
    metaTitle: "Villa de Leyva Tour | Colonial Day Trip from Bogotá",
    metaDescription:
      "Discover Villa de Leyva, one of Colombia's most beautiful towns, on a trip from Bogotá with private transport and guide. Colonial square and vineyards.",
    keywords: ["villa de leyva tour", "villa de leyva from bogota", "colombia heritage towns", "day trips from bogota"],
    longDescription: [
      "Villa de Leyva seems frozen in the 16th century. Declared a National Monument, this town preserves one of the largest squares in the Americas — cobblestoned and surrounded by white-façade colonial houses that give it a charm unique in all of Colombia.",
      "Beyond its architectural beauty, the region surprises with its nearby attractions: fossils millions of years old, vineyards producing high-altitude wine, the La Candelaria desert and traditional pottery workshops. It's a destination that combines history, nature and gastronomy in a single trip.",
      "Because of the distance, we offer it as a full-day trip or with an overnight option, always with comfortable private transport from Bogotá and a guide who will help you make the most of every corner of this Boyacá treasure.",
    ],
    faq: [
      {
        q: "How long does it take to get to Villa de Leyva from Bogotá?",
        a: "Villa de Leyva is about 160 km from Bogotá, around 3 hours by car. That's why we offer it as a full-day trip or with an overnight option, always with private transport.",
      },
      {
        q: "What is there to do in Villa de Leyva?",
        a: "Besides its huge colonial Plaza Mayor, you can visit high-altitude vineyards, paleontology museums with fossils, the La Candelaria desert and pottery workshops. We build an itinerary tailored to you.",
      },
      {
        q: "Is Villa de Leyva better as a day trip or an overnight stay?",
        a: "It can be enjoyed in a full day, but because of the distance and the number of attractions many travelers prefer to stay overnight. We'll advise you based on your available time.",
      },
    ],
  },
  "traslado-aeropuerto": {
    metaTitle: "El Dorado Airport Transfer Bogotá | Private Transport",
    metaDescription:
      "Private transfer to and from Bogotá's El Dorado Airport. Professional drivers, flight monitoring and a fixed fare. Book on WhatsApp.",
    keywords: ["bogota airport transfer", "el dorado airport transport", "private transport bogota", "airport transfer bogota"],
    longDescription: [
      "There's nothing better than arriving in a new city and finding someone waiting for you with your name. Our transfer service to and from El Dorado International Airport guarantees a stress-free start and end to your trip, with comfortable vehicles and professional drivers.",
      "We monitor your flight in real time, so if there are delays or early arrivals, your driver will be there anyway. We greet you in the arrivals area, help you with your luggage and take you directly to your hotel or destination, with the security of a private service and fixed fares with no surprises.",
      "It's the preferred option for business travelers and families who value their time and peace of mind, available 24 hours a day, every day of the year.",
    ],
    faq: [
      {
        q: "What happens if my flight is delayed?",
        a: "We monitor your flight in real time, so if there are delays or early arrivals your driver will adjust the pickup time and be waiting for you anyway, at no extra cost.",
      },
      {
        q: "Where does the driver meet me at El Dorado Airport?",
        a: "We greet you in the arrivals area with a sign showing your name, help you with your luggage and take you directly to your hotel or destination in Bogotá.",
      },
      {
        q: "Is the transfer service available 24 hours?",
        a: "Yes. The El Dorado Airport transfer service is available 24 hours a day, every day of the year, with a fixed fare agreed in advance and no surprises.",
      },
    ],
  },
}

export function getTourContentEn(slug: string): TourContentEn | undefined {
  return tourContentEn[slug]
}
