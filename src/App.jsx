import { useState, useEffect } from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  coral: '#E8442A',
  coralLight: '#FFF0ED',
  coralBorder: '#F5B8AA',
  navy: '#1a1a2e',
  navyText: '#f8f8f6',
  bg: '#ffffff',
  bgSoft: '#fafaf8',
  text: '#1a1a2e',
  textMid: '#555550',
  textMuted: '#999990',
  border: '#e8e8e2',
  borderMid: '#d0d0c8',
}

const CAT = {
  coffee:   { bg: '#FFF8F0', border: '#F5D5A8', text: '#8B4A00', count: '#BA7517', icon: '☕' },
  bakeries: { bg: '#F0F7FF', border: '#B8D4F5', text: '#1A4A8B', count: '#185FA5', icon: '🥐' },
  bars:     { bg: '#F3F0FF', border: '#C8B8F5', text: '#4A1A8B', count: '#534AB7', icon: '🍸' },
  burgers:  { bg: '#FFF0ED', border: '#F5B8AA', text: '#8B2210', count: '#993C1D', icon: '🍔' },
  ramen:    { bg: '#FFF0F8', border: '#F5B8D8', text: '#8B0A50', count: '#993C72', icon: '🍜' },
  brunch:   { bg: '#FFFBF0', border: '#F5E4A8', text: '#7A5C00', count: '#8B6A00', icon: '🥞' },
}

const HOOD_COLORS = [
  { bg: '#FFF8F0', border: '#F5D5A8' },
  { bg: '#F0F7FF', border: '#B8D4F5' },
  { bg: '#F3F0FF', border: '#C8B8F5' },
  { bg: '#F0FBF7', border: '#9FE1CB' },
  { bg: '#FFF0ED', border: '#F5B8AA' },
  { bg: '#FAEEDA', border: '#FAC775' },
]

const GUIDE_COLORS = [
  { bg: '#FFF8F0', border: '#F5D5A8', color: '#8B4A00' },
  { bg: '#FFF0ED', border: '#F5B8AA', color: '#8B2210' },
  { bg: '#F3F0FF', border: '#C8B8F5', color: '#4A1A8B' },
  { bg: '#F0F7FF', border: '#B8D4F5', color: '#1A4A8B' },
  { bg: '#F0FBF7', border: '#9FE1CB', color: '#085041' },
]

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS = [
  // ── COFFEE ──
  {
    id: 'sey-coffee', name: 'Sey Coffee', category: 'coffee', neighborhood: 'Bushwick',
    rating: 4.7, reviewCount: 430, featured: true,
    tags: ['Specialty', 'Pour over', 'In-house roaster'],
    address: '18 Grattan St, Brooklyn, NY 11206',
    hours: 'Mon–Fri 7am–6pm, Sat–Sun 8am–6pm',
    phone: '(347) 689-4552',
    website: 'https://seycoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Sey+Coffee+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/sey-coffee-brooklyn',
    description: 'Sey Coffee is a specialty roaster and café in the heart of Bushwick, beloved for its minimal aesthetic and exceptional single-origin pour overs. Beans are roasted in-house, and every cup reflects a near-obsessive commitment to quality. The bright, airy space feels welcoming whether you\'re a seasoned coffee nerd or just looking for a seriously good flat white. The rotating seasonal offerings and transparent sourcing make every visit an education in what coffee can taste like.',
    whyWePicked: 'One of the few Brooklyn roasters with a dedicated cupping program. Consistent quality across every brew method, and the space is a genuine pleasure to spend time in. Worth the trip from anywhere in the borough.',
    bestFor: 'Pour over, espresso, bag of beans to take home',
    priceRange: '$$',
  },
  {
    id: 'devocion', name: 'Devoción', category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.6, reviewCount: 812, featured: false,
    tags: ['Specialty', 'Colombian beans', 'Beautiful space'],
    address: '69 Grand St, Brooklyn, NY 11249',
    hours: 'Daily 8am–6pm',
    phone: '(718) 285-6180',
    website: 'https://devocion.com',
    mapsUrl: 'https://maps.google.com/?q=Devocion+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/devocion-brooklyn',
    description: 'Devoción sources its Colombian beans farm-to-cup in record time — often just days from harvest to your cup. Set inside a stunning converted factory space with a living green wall, it\'s arguably the most photographed coffee shop in Brooklyn. But the coffee is the real story: bright, fruity, and unlike anything else in the borough. The farm-direct relationship means the beans are fresher than almost anything available in New York City.',
    whyWePicked: 'Freshest Colombian beans in the city by a wide margin. The space is genuinely beautiful. A must-visit for anyone who thinks coffee is just coffee.',
    bestFor: 'Filter coffee, cortado, gifting a bag',
    priceRange: '$$',
  },
  {
    id: 'cafe-grumpy', name: 'Café Grumpy', category: 'coffee', neighborhood: 'Park Slope',
    rating: 4.5, reviewCount: 623, featured: false,
    tags: ['Cozy', 'Work-friendly', 'Neighborhood staple'],
    address: '383 7th Ave, Brooklyn, NY 11215',
    hours: 'Daily 7am–7pm',
    phone: '(718) 499-4404',
    website: 'https://cafegrumpy.com',
    mapsUrl: 'https://maps.google.com/?q=Cafe+Grumpy+Park+Slope+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/cafe-grumpy-brooklyn-4',
    description: 'Café Grumpy started in Greenpoint and has become a Brooklyn institution over twenty years. The Park Slope outpost is the neighborhood\'s living room — warm, unhurried, and packed with regulars. The espresso is reliably excellent, the drip coffee is always fresh, and the pastries rotate with the seasons. The staff remembers regulars\' orders, and the pace of life inside is a welcome contrast to the street outside.',
    whyWePicked: 'One of those rare places where consistency actually means something. Great for a laptop afternoon or catching up with a friend over a long coffee.',
    bestFor: 'Espresso, latte, working remotely',
    priceRange: '$$',
  },
  {
    id: 'oslo-coffee', name: 'Oslo Coffee Roasters', category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 394, featured: false,
    tags: ['Light roast', 'Roaster', 'Scandinavian style'],
    address: '133 Roebling St, Brooklyn, NY 11211',
    hours: 'Daily 7:30am–6pm',
    phone: '(718) 782-0332',
    website: 'https://oslocoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Oslo+Coffee+Roasters+Williamsburg',
    yelpUrl: 'https://yelp.com/biz/oslo-coffee-roasters-brooklyn-2',
    description: 'Oslo brought Scandinavian-style light roast coffee to Williamsburg before it was fashionable. The roasting operation is visible through the window, and the resulting cups are clean, bright, and nuanced. One of the original specialty coffee pioneers in Brooklyn, Oslo has maintained its standard through years of competition from newer arrivals. The neighborhood feel and unpretentious staff make it a reliable weekday anchor.',
    whyWePicked: 'The light roasts are some of the cleanest in Brooklyn. A great introduction to third-wave coffee without the pretension.',
    bestFor: 'Pour over, Chemex, buying whole beans',
    priceRange: '$$',
  },
  {
    id: 'partners-coffee', name: 'Partners Coffee', category: 'coffee', neighborhood: 'DUMBO',
    rating: 4.6, reviewCount: 541, featured: false,
    tags: ['Bright space', 'Specialty', 'Great pastries'],
    address: '125 Plymouth St, Brooklyn, NY 11201',
    hours: 'Mon–Fri 7am–6pm, Sat–Sun 8am–6pm',
    phone: '(347) 987-4551',
    website: 'https://partnerscoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Partners+Coffee+DUMBO+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/partners-coffee-brooklyn-2',
    description: 'Partners Coffee sits in a beautifully converted warehouse in DUMBO, with soaring ceilings and enough natural light to make any morning feel cinematic. The espresso program is tight, the food selection punches above its weight, and the crowd is a mix of creative types and tourists who accidentally found the best coffee near the bridge. The seasonal latte specials are worth trying, and the drip program is sourced with real care.',
    whyWePicked: 'One of the best coffee + space combinations in all of Brooklyn. The DUMBO location is especially good on a weekend morning.',
    bestFor: 'Cappuccino, avocado toast, weekend brunch vibes',
    priceRange: '$$',
  },
  {
    id: 'variety-coffee', name: 'Variety Coffee Roasters', category: 'coffee', neighborhood: 'Crown Heights',
    rating: 4.4, reviewCount: 312, featured: false,
    tags: ['Community', 'Neighborhood gem', 'Affordable'],
    address: '1 Kingston Ave, Brooklyn, NY 11213',
    hours: 'Daily 7am–7pm',
    phone: '(347) 915-1680',
    website: 'https://varietycoffeeroasters.com',
    mapsUrl: 'https://maps.google.com/?q=Variety+Coffee+Roasters+Crown+Heights',
    yelpUrl: 'https://yelp.com/biz/variety-coffee-roasters-brooklyn-3',
    description: 'Variety is the coffee shop Crown Heights deserves — welcoming, unpretentious, and genuinely excellent. The Crown Heights location has a distinct neighborhood feel, and the rotating single-origins on drip are some of the most interesting in the borough at a price point that won\'t make you wince. The staff is knowledgeable without being opinionated, and the space works equally well for a quick stop or a long afternoon.',
    whyWePicked: 'The rare spot that\'s both highly accessible and genuinely high quality. A Crown Heights anchor that the whole neighborhood relies on.',
    bestFor: 'Drip coffee, espresso, staying awhile',
    priceRange: '$',
  },
  {
    id: 'sweatshop', name: 'Sweatshop', category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 287, featured: false,
    tags: ['Vintage', 'Laundromat café', 'Unique'],
    address: '325 Kent Ave, Brooklyn, NY 11249',
    hours: 'Daily 7am–9pm',
    phone: '(718) 388-4600',
    website: 'https://sweatshopbk.com',
    mapsUrl: 'https://maps.google.com/?q=Sweatshop+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/sweatshop-brooklyn',
    description: 'Half laundromat, half café — Sweatshop has been a Williamsburg institution since 2009. You can drop off your laundry and drink excellent espresso while you wait. The vintage furniture, exposed brick, and eclectic art make it one of the most visually interesting coffee spots in the borough. The coffee is genuinely good, not just gimmicky, and the extended hours make it a useful anchor for the neighborhood at any time of day.',
    whyWePicked: 'There\'s nothing else quite like it in Brooklyn. The laundromat concept should be weird but it works perfectly. The espresso is excellent and the vibe is unmatched.',
    bestFor: 'Espresso, laundry day, people watching',
    priceRange: '$$',
  },
  {
    id: 'tobys-estate', name: "Toby's Estate Coffee", category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 502, featured: false,
    tags: ['Australian', 'Specialty', 'Flat white'],
    address: '125 N 6th St, Brooklyn, NY 11249',
    hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–7pm',
    phone: '(347) 457-6160',
    website: 'https://tobysestate.com',
    mapsUrl: 'https://maps.google.com/?q=Toby+Estate+Coffee+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/tobys-estate-coffee-brooklyn',
    description: 'Toby\'s Estate arrived from Sydney with a distinctly Australian approach to espresso — precise, drinkable, and built around milk-forward coffees done right. The Williamsburg café occupies a handsome industrial space and draws a loyal crowd of specialty coffee drinkers who appreciate the consistency. The flat white is arguably the best in Brooklyn, and the single-origin filter rotation gives regulars something to look forward to each week.',
    whyWePicked: 'The flat white benchmark in Brooklyn. Australian coffee culture translated perfectly to Williamsburg. Reliable at any hour of the day.',
    bestFor: 'Flat white, cold brew, single-origin filter',
    priceRange: '$$',
  },
  {
    id: 'hungry-ghost', name: 'Hungry Ghost', category: 'coffee', neighborhood: 'Fort Greene',
    rating: 4.4, reviewCount: 341, featured: false,
    tags: ['Neighborhood café', 'Work-friendly', 'Cozy'],
    address: '781 Fulton St, Brooklyn, NY 11217',
    hours: 'Daily 7am–6pm',
    phone: '(347) 223-4569',
    website: 'https://hungryghostcoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Hungry+Ghost+Fort+Greene+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/hungry-ghost-brooklyn-4',
    description: 'Hungry Ghost is Fort Greene\'s beloved neighborhood café — unpretentious, warm, and reliably excellent. The espresso is sourced carefully and the room fills up with a mix of Brooklyn College students, freelancers, and neighborhood regulars who\'ve been coming since it opened. The food program is a cut above the usual café fare, and the staff genuinely knows their regulars. A quiet anchor in one of Brooklyn\'s most charming neighborhoods.',
    whyWePicked: 'The quintessential Fort Greene café — warm, consistent, and deeply neighborhood. A reliable spot for a long morning or a quick espresso.',
    bestFor: 'Espresso, latte, working remotely, morning pastry',
    priceRange: '$$',
  },
  {
    id: 'gorilla-coffee', name: 'Gorilla Coffee', category: 'coffee', neighborhood: 'Park Slope',
    rating: 4.4, reviewCount: 387, featured: false,
    tags: ['Bold roasts', 'Independent', 'Park Slope icon'],
    address: '97 5th Ave, Brooklyn, NY 11217',
    hours: 'Daily 7am–8pm',
    phone: '(718) 230-3243',
    website: 'https://gorillacoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Gorilla+Coffee+Park+Slope+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/gorilla-coffee-brooklyn',
    description: 'Gorilla Coffee has been roasting in Park Slope for over two decades, predating the specialty coffee wave and weathering every trend without losing its identity. The roasts lean bold — full-bodied, direct, and built for people who want to taste the coffee rather than delicate fruit notes. The 5th Avenue location is a Park Slope institution, and the counter has seen countless neighborhood conversations unfold over the years.',
    whyWePicked: 'A true Park Slope original. The bold roast philosophy produces cups with real character. Two decades of consistency earns a spot on any list.',
    bestFor: 'Bold espresso, drip coffee, classic latte',
    priceRange: '$',
  },
  {
    id: 'eleva-coffee', name: 'Eleva Coffee', category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 278, featured: false,
    tags: ['Minimal', 'Specialty', 'Natural wine too'],
    address: '160 Havemeyer St, Brooklyn, NY 11211',
    hours: 'Daily 7am–7pm',
    phone: '(917) 781-4430',
    website: 'https://elevacoffee.com',
    mapsUrl: 'https://maps.google.com/?q=Eleva+Coffee+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/eleva-coffee-williamsburg',
    description: 'Eleva is the coffee shop that also does natural wine, and somehow both sides of that equation are executed with equal care. The daytime coffee program sources thoughtfully and the preparation is precise — clean, fruit-forward espresso and carefully brewed filters. The minimal interior and neighborhood-first approach make it a genuinely pleasant place to spend time, whether you\'re there for morning coffee or an afternoon glass.',
    whyWePicked: 'A dual-purpose space that handles both coffee and wine with genuine expertise. The specialty coffee program alone justifies the visit.',
    bestFor: 'Filter coffee, espresso, afternoon natural wine',
    priceRange: '$$',
  },
  {
    id: 'caffe-vita', name: 'Caffè Vita', category: 'coffee', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 244, featured: false,
    tags: ['Pacific Northwest', 'Dark roast', 'Espresso bar'],
    address: '124 Bedford Ave, Brooklyn, NY 11249',
    hours: 'Daily 7am–8pm',
    phone: '(718) 388-2100',
    website: 'https://caffevita.com',
    mapsUrl: 'https://maps.google.com/?q=Caffe+Vita+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/caffe-vita-brooklyn',
    description: 'Caffè Vita brings its Seattle espresso sensibility to Bedford Avenue — confident, full-bodied roasts with a strong emphasis on well-pulled shots and expertly steamed milk. The Seattle original has been roasting since 1995, and the Williamsburg outpost maintains those standards faithfully. The café bar setup encourages you to watch the barista work, and the dark, cozy interior is a good option when the rest of the neighborhood feels too bright and busy.',
    whyWePicked: 'A reliable anchor on Bedford Avenue. The espresso is confident and consistent, and the atmosphere is a useful counterpoint to more minimalist neighbors.',
    bestFor: 'Espresso, cappuccino, dark roast drip',
    priceRange: '$$',
  },

  // ── BAKERIES ──
  {
    id: 'bien-cuit', name: 'Bien Cuit', category: 'bakeries', neighborhood: 'Cobble Hill',
    rating: 4.7, reviewCount: 568, featured: true,
    tags: ['Sourdough', 'French pastries', 'Award-winning'],
    address: '120 Smith St, Brooklyn, NY 11201',
    hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–7pm',
    phone: '(718) 852-0200',
    website: 'https://biencuit.com',
    mapsUrl: 'https://maps.google.com/?q=Bien+Cuit+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/bien-cuit-brooklyn',
    description: 'Bien Cuit is the bakery benchmark in Brooklyn. Chef Zachary Golper\'s bread and pastry program is technically extraordinary — the country loaves have a crackling crust and a complex, deeply developed crumb that takes days to achieve. The croissants are laminated to perfection, and the seasonal pastries rival anything you\'d find in Paris. The Cobble Hill shop is worth the visit not just for what\'s in the case but for the experience of watching a bakery operating at full craft.',
    whyWePicked: 'The best bread in Brooklyn, full stop. Worth a trip from anywhere in the city. Buy an extra loaf — you\'ll be glad you did.',
    bestFor: 'Country loaf, croissant, kouign-amann',
    priceRange: '$$',
  },
  {
    id: 'ovenly', name: 'Ovenly', category: 'bakeries', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 431, featured: false,
    tags: ['Creative flavors', 'Cookies', 'Seasonal'],
    address: '31 Greenpoint Ave, Brooklyn, NY 11222',
    hours: 'Mon–Fri 7am–5pm, Sat–Sun 8am–5pm',
    phone: '(888) 899-2276',
    website: 'https://oven.ly',
    mapsUrl: 'https://maps.google.com/?q=Ovenly+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/ovenly-brooklyn',
    description: 'Ovenly is known for pushing flavors in unexpected directions — salty chocolate chip cookies, salted caramel brownies, and seasonal specials that routinely sell out by 10am. The bakers are creative without being gimmicky, and the resulting pastries consistently surprise. Their vegan options are genuinely as good as the rest, which is rare in a field where vegan baking often feels like an afterthought.',
    whyWePicked: 'The salty chocolate chip cookie alone is worth the trip. Creative but never weird for weird\'s sake. One of Brooklyn\'s most original bakery voices.',
    bestFor: 'Salty cookies, seasonal tarts, gift boxes',
    priceRange: '$$',
  },
  {
    id: 'colson-patisserie', name: 'Colson Patisserie', category: 'bakeries', neighborhood: 'Park Slope',
    rating: 4.6, reviewCount: 389, featured: false,
    tags: ['Belgian', 'Waffles', 'Fine pastries'],
    address: '374 9th St, Brooklyn, NY 11215',
    hours: 'Daily 7am–7pm',
    phone: '(718) 965-6400',
    website: 'https://colsonpatisserie.com',
    mapsUrl: 'https://maps.google.com/?q=Colson+Patisserie+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/colson-patisserie-brooklyn',
    description: 'Colson brings a distinctly Belgian perspective to Brooklyn baking. The Liège waffles — dense, caramelized at the edges, studded with pearl sugar — are some of the best in the city. The pastry case rotates seasonally and the tarts and cakes are made with an attention to detail you\'d expect from a Paris pâtisserie. The café side of the operation is just as polished, making it an ideal stop for a long morning.',
    whyWePicked: 'The Liège waffle is the best version in Brooklyn. The tarts are extraordinary. A rare bakery that delivers at the level it promises.',
    bestFor: 'Liège waffle, fruit tarts, croissant',
    priceRange: '$$',
  },
  {
    id: 'one-girl-cookies', name: 'One Girl Cookies', category: 'bakeries', neighborhood: 'DUMBO',
    rating: 4.5, reviewCount: 302, featured: false,
    tags: ['Sandwich cookies', 'Cozy', 'Neighborhood gem'],
    address: '68 Dean St, Brooklyn, NY 11201',
    hours: 'Mon–Fri 8am–6pm, Sat–Sun 9am–5pm',
    phone: '(212) 675-4996',
    website: 'https://onegirlcookies.com',
    mapsUrl: 'https://maps.google.com/?q=One+Girl+Cookies+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/one-girl-cookies-brooklyn',
    description: 'One Girl Cookies has been a beloved Brooklyn institution for nearly two decades. Named for the sandwich cookies that started it all, the bakery has evolved into a full pastry and cake destination. The space is warm and distinctly un-commercial, and the baked goods reflect that same unhurried care — seasonal, hand-crafted, and genuinely delicious. The custom cake program is exceptional for special occasions.',
    whyWePicked: 'One of the original Brooklyn artisan bakeries that still gets it right every day. The sandwich cookies are iconic for a reason.',
    bestFor: 'Sandwich cookies, wedding cakes, morning pastry',
    priceRange: '$$',
  },
  {
    id: 'baked', name: 'Baked', category: 'bakeries', neighborhood: 'Red Hook',
    rating: 4.5, reviewCount: 478, featured: false,
    tags: ['Brownies', 'American classics', 'Iconic'],
    address: '359 Van Brunt St, Brooklyn, NY 11231',
    hours: 'Mon–Fri 8am–6pm, Sat–Sun 9am–6pm',
    phone: '(718) 222-0345',
    website: 'https://bakednyc.com',
    mapsUrl: 'https://maps.google.com/?q=Baked+Red+Hook+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/baked-brooklyn-2',
    description: 'Baked in Red Hook is where the brownie was reinvented. Their signature Sweet and Salty brownie — a dense, fudgy slab with pretzel crust and sea salt — has been copied across the country, but the original is still the best. The bakery also does excellent cookies, cakes, and bars that lean into American comfort baking with serious technical chops. The Red Hook location feels like the right setting for a bakery this committed to its own vision.',
    whyWePicked: 'The best brownie in New York City. The Sweet and Salty brownie alone justifies the trip to Red Hook. Get extra — they don\'t last long.',
    bestFor: 'Sweet and Salty brownie, cookies, birthday cakes',
    priceRange: '$$',
  },
  {
    id: 'butter-and-scotch', name: 'Butter & Scotch', category: 'bakeries', neighborhood: 'Crown Heights',
    rating: 4.4, reviewCount: 256, featured: false,
    tags: ['Bar + bakery', 'Cocktails', 'Pies'],
    address: '818 Franklin Ave, Brooklyn, NY 11225',
    hours: 'Mon–Thu 4pm–midnight, Fri 2pm–2am, Sat–Sun 11am–2am',
    phone: '(347) 350-8899',
    website: 'https://butterandscotch.com',
    mapsUrl: 'https://maps.google.com/?q=Butter+and+Scotch+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/butter-and-scotch-brooklyn',
    description: 'Butter & Scotch is Brooklyn\'s only bakery-bar hybrid, and it works better than it has any right to. Come for the pie — lemon chess, seasonal fruit, bourbon pecan — and stay for the cocktails. The weekend brunch is legendary, and the late-night baked goods situation means you can have a slice of cake at midnight. Which you should.',
    whyWePicked: 'An entirely original concept done brilliantly. The pies are excellent and the cocktails match. Crown Heights\'s most fun spot by a wide margin.',
    bestFor: 'Seasonal pie, cocktails, late-night cake',
    priceRange: '$$',
  },
  {
    id: 'almondine', name: 'Almondine Bakery', category: 'bakeries', neighborhood: 'DUMBO',
    rating: 4.6, reviewCount: 445, featured: false,
    tags: ['French', 'Croissants', 'DUMBO institution'],
    address: '85 Water St, Brooklyn, NY 11201',
    hours: 'Mon–Sat 7am–7pm, Sun 8am–6pm',
    phone: '(718) 797-5026',
    website: 'https://almondinebakery.com',
    mapsUrl: 'https://maps.google.com/?q=Almondine+Bakery+DUMBO+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/almondine-bakery-brooklyn',
    description: 'Almondine has been producing classic French pastry in DUMBO for over two decades, and it remains one of the neighborhood\'s most reliable pleasures. The croissants are butter-laminated and properly caramelized on the outside with a honeycomb interior that pulls apart cleanly. The pain au chocolat, tarts, and éclairs are all executed with the kind of quiet confidence that only comes from years of daily practice. An essential stop before or after the Brooklyn Bridge.',
    whyWePicked: 'Two decades of French pastry excellence in DUMBO. The croissants are consistently among the best in Brooklyn — flaky, buttery, and properly caramelized.',
    bestFor: 'Croissant, pain au chocolat, seasonal tart',
    priceRange: '$$',
  },
  {
    id: 'four-and-twenty-blackbirds', name: 'Four & Twenty Blackbirds', category: 'bakeries', neighborhood: 'Gowanus',
    rating: 4.6, reviewCount: 512, featured: false,
    tags: ['Pies', 'Seasonal', 'Nationally recognized'],
    address: '439 3rd Ave, Brooklyn, NY 11215',
    hours: 'Mon–Fri 8am–8pm, Sat–Sun 9am–8pm',
    phone: '(718) 499-2917',
    website: 'https://birdsblack.com',
    mapsUrl: 'https://maps.google.com/?q=Four+Twenty+Blackbirds+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/four-and-twenty-blackbirds-brooklyn',
    description: 'Four & Twenty Blackbirds has become the most celebrated pie shop in America, and the Gowanus original is where it all started. The Elsen sisters\' approach to pie — seasonal fillings, perfectly structured crusts, an emphasis on sourcing — elevated the form from comfort food to serious pastry. The Salted Caramel Apple and Black Bottom Oat are year-round signatures, but the rotating seasonal specials are the real reason to keep coming back.',
    whyWePicked: 'The most celebrated pie shop in the country, and it lives in Brooklyn. The Salted Caramel Apple is a benchmark. A genuine American original.',
    bestFor: 'Salted caramel apple pie, Black Bottom Oat, seasonal specials',
    priceRange: '$$',
  },
  {
    id: 'peter-pan-donuts', name: 'Peter Pan Donut & Pastry Shop', category: 'bakeries', neighborhood: 'Greenpoint',
    rating: 4.6, reviewCount: 1240, featured: false,
    tags: ['Classic donuts', 'Cash only', 'Old school'],
    address: '727 Manhattan Ave, Brooklyn, NY 11222',
    hours: 'Mon–Fri 4:30am–8pm, Sat–Sun 5am–8pm',
    phone: '(718) 389-3676',
    mapsUrl: 'https://maps.google.com/?q=Peter+Pan+Donut+Greenpoint+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/peter-pan-donut-and-pastry-shop-brooklyn',
    description: 'Peter Pan has been frying donuts in Greenpoint since 1953, and the original pink-and-green counter looks almost exactly as it did then. The donuts are old-school New York — yeast-raised, glossy with glaze, and available in combinations that haven\'t changed in decades. The crullers are exceptional, the staff wears pink uniforms and remembers every order, and the cash-only policy feels right for a place this uninterested in being anything other than what it is.',
    whyWePicked: 'One of the great old-school donut shops in New York City. The cruller is exceptional and the atmosphere is pure Brooklyn history. Cash only, arrive early.',
    bestFor: 'Crullers, glazed donuts, red velvet donut',
    priceRange: '$',
  },
  {
    id: 'milk-bar-brooklyn', name: 'Milk Bar', category: 'bakeries', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 388, featured: false,
    tags: ['Christina Tosi', 'Cereal milk', 'Birthday cake'],
    address: '382 Metropolitan Ave, Brooklyn, NY 11211',
    hours: 'Daily 9am–11pm',
    phone: '(347) 577-9504',
    website: 'https://milkbarstore.com',
    mapsUrl: 'https://maps.google.com/?q=Milk+Bar+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/milk-bar-brooklyn-3',
    description: 'Christina Tosi\'s Milk Bar brought a whole new vocabulary to American baking — compost cookies, cereal milk soft serve, crack pie, and birthday cake truffles made from the nostalgia of processed ingredients rethought with genuine technique. The Williamsburg location is the most convenient for Brooklyn, and the late hours mean it works as a post-dinner dessert destination. The birthday cake layer cake is exactly as excessive as it should be.',
    whyWePicked: 'An entirely original point of view on American baking. The cereal milk soft serve and birthday cake are cult classics for good reason.',
    bestFor: 'Cereal milk soft serve, compost cookie, birthday cake',
    priceRange: '$$',
  },
  {
    id: 'court-pastry-shop', name: 'Court Pastry Shop', category: 'bakeries', neighborhood: 'Carroll Gardens',
    rating: 4.5, reviewCount: 267, featured: false,
    tags: ['Italian', 'Old school', 'Sfogliatelle'],
    address: '298 Court St, Brooklyn, NY 11231',
    hours: 'Tue–Sun 7am–7pm',
    phone: '(718) 875-4820',
    mapsUrl: 'https://maps.google.com/?q=Court+Pastry+Shop+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/court-pastry-shop-brooklyn',
    description: 'Court Pastry Shop is a Carroll Gardens institution — a proper Italian-American pastry shop that has been operating on Court Street for generations. The sfogliatelle, cannoli, and lobster tails are made with traditional technique and without the self-consciousness of newer bakeries. The counter is staffed by people who have been there for decades, and the regulars who come every Sunday morning have been coming for years. An authentic slice of old Brooklyn that deserves to be preserved.',
    whyWePicked: 'One of the last authentic old-school Italian pastry shops in Brooklyn. The sfogliatelle is exceptional and the history of the place is irreplaceable.',
    bestFor: 'Sfogliatelle, cannoli, lobster tail pastry',
    priceRange: '$',
  },
  {
    id: 'damascus-bakery', name: 'Damascus Bakery', category: 'bakeries', neighborhood: 'Brooklyn Heights',
    rating: 4.5, reviewCount: 334, featured: false,
    tags: ['Middle Eastern', 'Pita', 'Flatbread'],
    address: '195 Atlantic Ave, Brooklyn, NY 11201',
    hours: 'Daily 8am–6pm',
    phone: '(718) 625-7070',
    website: 'https://damascusbakery.com',
    mapsUrl: 'https://maps.google.com/?q=Damascus+Bakery+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/damascus-bakery-brooklyn',
    description: 'Damascus Bakery has been making pita on Atlantic Avenue since 1930, which makes it one of the oldest continuously operating bakeries in Brooklyn. The flatbreads come out of the oven throughout the day — soft, slightly chewy, and worlds apart from anything sold in a supermarket. The bakery also makes excellent spinach pies, sesame crackers, and specialty breads, and the shop itself feels like a direct portal to the Middle Eastern grocery culture that defined this stretch of Atlantic Avenue for a century.',
    whyWePicked: 'One of Brooklyn\'s oldest bakeries and still the best pita in the borough. Buy a bag while it\'s still warm. An essential Atlantic Avenue stop.',
    bestFor: 'Fresh pita, spinach pies, sesame crackers',
    priceRange: '$',
  },

  // ── BARS ──
  {
    id: 'maison-premiere', name: 'Maison Premiere', category: 'bars', neighborhood: 'Williamsburg',
    rating: 4.6, reviewCount: 892, featured: true,
    tags: ['Oyster bar', 'Craft cocktails', 'New Orleans vibe'],
    address: '298 Bedford Ave, Brooklyn, NY 11249',
    hours: 'Mon–Thu 4pm–midnight, Fri–Sat 2pm–2am, Sun 2pm–midnight',
    phone: '(347) 335-0446',
    website: 'https://maisonpremiere.com',
    mapsUrl: 'https://maps.google.com/?q=Maison+Premiere+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/maison-premiere-brooklyn',
    description: 'Maison Premiere is one of the finest bars in New York City, let alone Brooklyn. The absinthe program is unmatched in the US, the oyster list runs deep with thoughtfully sourced bivalves, and the cocktail menu draws from New Orleans tradition with genuine craft. The garden in warm months is one of the most romantic spots in the borough. The service is professional in the old-world sense — attentive without being intrusive, knowledgeable without being pedantic.',
    whyWePicked: 'One of the best bars in America, not just Brooklyn. The absinthe service and oyster program are extraordinary. The garden on a summer evening is hard to beat anywhere in the city.',
    bestFor: 'Absinthe, oysters, classic cocktails, garden dining',
    priceRange: '$$$',
  },
  {
    id: 'sunnys-bar', name: "Sunny's Bar", category: 'bars', neighborhood: 'Red Hook',
    rating: 4.7, reviewCount: 531, featured: false,
    tags: ['Dive bar', 'Live music', 'Legendary'],
    address: '253 Conover St, Brooklyn, NY 11231',
    hours: 'Thu–Sun 5pm–late',
    phone: '(718) 625-8211',
    website: 'https://sunnysredhook.com',
    mapsUrl: "https://maps.google.com/?q=Sunny's+Bar+Red+Hook+Brooklyn",
    yelpUrl: "https://yelp.com/biz/sunnys-red-hook-brooklyn",
    description: "Sunny's is the soul of Red Hook — a century-old longshoreman's bar that somehow survived gentrification, Hurricane Sandy, and the death of its founder, emerging each time more beloved. The Saturday night bluegrass jams are Brooklyn legend. The crowd is mixed, the drinks are cheap, and the atmosphere is irreplaceable. There is no other bar in Brooklyn quite like this one, and there won't be again.",
    whyWePicked: 'An irreplaceable piece of Brooklyn history that somehow keeps getting better. The Saturday bluegrass night is a genuine New York experience. Go before it changes.',
    bestFor: 'Cold beer, bluegrass nights, falling in love with Brooklyn',
    priceRange: '$',
  },
  {
    id: 'threes-brewing', name: 'Threes Brewing', category: 'bars', neighborhood: 'Gowanus',
    rating: 4.5, reviewCount: 743, featured: false,
    tags: ['Craft beer', 'Taproom', 'Food'],
    address: '333 Douglass St, Brooklyn, NY 11217',
    hours: 'Mon–Thu 4pm–midnight, Fri 2pm–1am, Sat–Sun noon–1am',
    phone: '(718) 522-2110',
    website: 'https://threesbrewing.com',
    mapsUrl: 'https://maps.google.com/?q=Threes+Brewing+Gowanus+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/threes-brewing-brooklyn',
    description: 'Threes Brewing is Gowanus\' anchor taproom — an enormous, welcoming space with an exceptional rotating beer list, a kitchen that genuinely competes on its own merits, and a backyard that fills up the moment weather permits. The beers are brewed in-house and consistently excellent across every style, from hazy IPAs to dry farmhouse ales.',
    whyWePicked: 'The best all-around taproom in Brooklyn. The beer quality is high, the food is legitimately good, and the space works whether you\'re with a group or solo. Reliable every single time.',
    bestFor: 'IPA, saison, taproom food, groups',
    priceRange: '$$',
  },
  {
    id: 'the-narrows', name: 'The Narrows', category: 'bars', neighborhood: 'Bushwick',
    rating: 4.4, reviewCount: 412, featured: false,
    tags: ['Craft cocktails', 'Intimate', 'Hidden gem'],
    address: '1037 Flushing Ave, Brooklyn, NY 11237',
    hours: 'Tue–Sun 6pm–2am',
    phone: '(718) 386-8833',
    website: 'https://thenarrowsbar.com',
    mapsUrl: 'https://maps.google.com/?q=The+Narrows+Bushwick+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/the-narrows-brooklyn',
    description: 'The Narrows is the cocktail bar Bushwick needed — intimate, inventive, and without a whiff of the neighborhood\'s occasional try-hard quality. The bar program rotates seasonally and focuses on layered, spirit-forward cocktails that reward attention. The low lighting and tight seating make it ideal for dates or small groups who want to actually hear each other.',
    whyWePicked: 'Consistently one of the most interesting cocktail menus in Brooklyn. The bartenders know their craft and the atmosphere is exactly right. A true neighborhood gem.',
    bestFor: 'Seasonal cocktails, mezcal, date night',
    priceRange: '$$',
  },
  {
    id: 'extra-fancy', name: 'Extra Fancy', category: 'bars', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 386, featured: false,
    tags: ['Waterfront', 'Seafood', 'Cocktails'],
    address: '302 Metropolitan Ave, Brooklyn, NY 11211',
    hours: 'Mon–Thu 5pm–midnight, Fri 5pm–2am, Sat–Sun noon–2am',
    phone: '(347) 422-0939',
    website: 'https://extrafancybk.com',
    mapsUrl: 'https://maps.google.com/?q=Extra+Fancy+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/extra-fancy-brooklyn',
    description: 'Extra Fancy is the Williamsburg bar that figured out how to do a seafood-focused cocktail bar without tipping into gimmick territory. The clam chowder punch is legitimately good, the oysters are well-sourced, and the drinks list reads like someone who actually loves both cocktails and the sea wrote it.',
    whyWePicked: 'The most original bar concept in Williamsburg. The clam chowder punch is not a joke — it\'s excellent. Great for a group looking for something different.',
    bestFor: 'Clam chowder punch, oysters, after-dinner drinks',
    priceRange: '$$',
  },
  {
    id: 'berry-park', name: 'Berry Park', category: 'bars', neighborhood: 'Williamsburg',
    rating: 4.3, reviewCount: 654, featured: false,
    tags: ['Rooftop', 'Beer garden', 'Skyline views'],
    address: '4 Berry St, Brooklyn, NY 11249',
    hours: 'Mon–Fri 5pm–2am, Sat–Sun noon–2am',
    phone: '(718) 782-2829',
    website: 'https://berryparkbk.com',
    mapsUrl: 'https://maps.google.com/?q=Berry+Park+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/berry-park-brooklyn-2',
    description: 'Berry Park occupies a converted warehouse in Williamsburg with a rooftop beer garden that offers some of the best skyline views in Brooklyn. The beer list leans German with a strong draft selection, and the pretzel and wurst situation is exactly what you want with a stein. Gets packed on weekends but the views justify the crowd.',
    whyWePicked: 'The rooftop views of Manhattan are genuinely special, and the German beer garden concept is executed better here than almost anywhere in the city.',
    bestFor: 'Rooftop beers, skyline views, pretzel and wurst',
    priceRange: '$$',
  },
  {
    id: 'hotel-delmano', name: 'Hotel Delmano', category: 'bars', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 489, featured: false,
    tags: ['Belle Époque', 'Craft cocktails', 'Date night'],
    address: '82 Berry St, Brooklyn, NY 11249',
    hours: 'Daily 5pm–2am',
    phone: '(718) 387-1945',
    website: 'https://hoteldelmano.com',
    mapsUrl: 'https://maps.google.com/?q=Hotel+Delmano+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/hotel-delmano-brooklyn',
    description: 'Hotel Delmano is one of Williamsburg\'s most atmospheric bars — a Belle Époque-inspired interior with marble counters, antique mirrors, and warm candlelight that makes everyone look good. The cocktail program is serious: the menu changes seasonally and focuses on spirit-forward builds that age well in the glass. The oyster program is compact but well-sourced. Perfect for a date or a long evening with old friends.',
    whyWePicked: 'The most atmospheric bar in Williamsburg. The cocktails are excellent and the room is genuinely beautiful. One of Brooklyn\'s best date night bars.',
    bestFor: 'Classic cocktails, oysters, date night, anniversary drinks',
    priceRange: '$$$',
  },
  {
    id: 'clover-club', name: 'Clover Club', category: 'bars', neighborhood: 'Carroll Gardens',
    rating: 4.6, reviewCount: 521, featured: false,
    tags: ['Craft cocktails', 'Sophisticated', 'Carroll Gardens gem'],
    address: '210 Smith St, Brooklyn, NY 11201',
    hours: 'Daily 4pm–2am',
    phone: '(718) 855-7939',
    website: 'https://cloverclubny.com',
    mapsUrl: 'https://maps.google.com/?q=Clover+Club+Carroll+Gardens+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/clover-club-brooklyn',
    description: 'Clover Club is one of Brooklyn\'s most accomplished cocktail bars — a Smith Street anchor with a serious, historically-informed drinks program and an interior that manages to feel both grand and comfortable. The bar team has deep technical knowledge and the cocktail menu balances classics and originals with real intelligence. The wine list is also excellent, which is uncommon for a cocktail-focused bar.',
    whyWePicked: 'One of Brooklyn\'s best cocktail bars by any measure. The historical approach to the drinks program produces results you won\'t find elsewhere. Essential.',
    bestFor: 'Pre-Prohibition cocktails, whiskey, a proper evening out',
    priceRange: '$$$',
  },
  {
    id: 'featherweight', name: 'Featherweight', category: 'bars', neighborhood: 'Bushwick',
    rating: 4.4, reviewCount: 298, featured: false,
    tags: ['Natural wine', 'Intimate', 'Low-key'],
    address: '135 Graham Ave, Brooklyn, NY 11206',
    hours: 'Tue–Sun 5pm–midnight',
    phone: '(917) 909-0971',
    website: 'https://featherweightbar.com',
    mapsUrl: 'https://maps.google.com/?q=Featherweight+Bushwick+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/featherweight-brooklyn',
    description: 'Featherweight is Bushwick\'s answer to the natural wine bar — tiny, unpretentious, and staffed by people who are genuinely excited about what\'s in the glass. The list skews orange and pét-nat, rotates frequently, and focuses on small producers who are doing something interesting. The snacks are simple but good, and the room fills up quickly, so arrive early or be patient.',
    whyWePicked: 'The best natural wine bar in Bushwick, and one of the more interesting in Brooklyn. The list is curated with real passion and the atmosphere is exactly what a wine bar should be.',
    bestFor: 'Orange wine, pét-nat, low-intervention picks',
    priceRange: '$$',
  },
  {
    id: 'union-pool', name: 'Union Pool', category: 'bars', neighborhood: 'Williamsburg',
    rating: 4.3, reviewCount: 768, featured: false,
    tags: ['Outdoor fire pit', 'Live music', 'Iconic'],
    address: '484 Union Ave, Brooklyn, NY 11211',
    hours: 'Daily 5pm–4am',
    phone: '(718) 609-0484',
    website: 'https://union-pool.com',
    mapsUrl: 'https://maps.google.com/?q=Union+Pool+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/union-pool-brooklyn',
    description: 'Union Pool is a converted pool supply store turned bar, which says a lot about Williamsburg\'s history and its present. The back patio with its fire pit is one of Brooklyn\'s most beloved outdoor bar spaces, the taco truck parked outside is genuinely good, and the rotating live music and DJ nights have made it a Williamsburg institution. It\'s crowded on weekends but the outdoor space absorbs the crowd better than almost anywhere.',
    whyWePicked: 'The fire pit patio is one of Brooklyn\'s great outdoor bar experiences. The taco truck and live music complete the picture. A Williamsburg landmark.',
    bestFor: 'Fire pit drinks, outdoor hanging, live music nights',
    priceRange: '$$',
  },
  {
    id: 'pine-box-rock-shop', name: 'Pine Box Rock Shop', category: 'bars', neighborhood: 'Bushwick',
    rating: 4.3, reviewCount: 347, featured: false,
    tags: ['Vegan-friendly', 'Rock bar', 'Pool table'],
    address: '12 Grattan St, Brooklyn, NY 11206',
    hours: 'Daily 4pm–4am',
    phone: '(718) 366-6311',
    website: 'https://pineboxrockshop.com',
    mapsUrl: 'https://maps.google.com/?q=Pine+Box+Rock+Shop+Bushwick+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/pine-box-rock-shop-brooklyn',
    description: 'Pine Box Rock Shop is a Bushwick institution — a vegan-friendly bar in a converted coffin factory (yes, really) that serves craft beer, hosts live music, and operates a pool table that sees serious action. The beer list is one of the better craft selections in the neighborhood, the prices are reasonable, and the crowd is as mixed as Bushwick itself. Late night here is never boring.',
    whyWePicked: 'A genuinely fun bar in a neighborhood full of them. The vegan food, craft beer, and converted coffin factory story make it one of Bushwick\'s most memorable spots.',
    bestFor: 'Craft beer, pool, live music, late-night vegan snacks',
    priceRange: '$',
  },

  // ── BURGERS ──
  {
    id: 'emily-brooklyn', name: 'Emily', category: 'burgers', neighborhood: 'Clinton Hill',
    rating: 4.7, reviewCount: 1024, featured: true,
    tags: ['Emmy Burger', 'Wood-fired', 'Must-visit'],
    address: '919 Fulton St, Brooklyn, NY 11238',
    hours: 'Mon–Thu 5pm–10pm, Fri–Sat 5pm–11pm, Sun 5pm–9pm',
    phone: '(347) 844-9588',
    website: 'https://pizzalovesemily.com',
    mapsUrl: 'https://maps.google.com/?q=Emily+Brooklyn+Clinton+Hill',
    yelpUrl: 'https://yelp.com/biz/emily-brooklyn-2',
    description: 'Emily is primarily known for its wood-fired pizza, but the Emmy Burger has become one of the most talked-about burgers in New York City. Dry-aged beef, caramelized onions, American cheese, and special sauce on a potato bun — it sounds simple but the execution is extraordinary. They make a limited number each night and when they\'re gone, they\'re gone. The Clinton Hill location is the original, and regulars will tell you it\'s still the best.',
    whyWePicked: 'The Emmy Burger is genuinely one of the top five burgers in New York City. The dry-aged beef flavor is unlike anything else. Go early — they sell out.',
    bestFor: 'Emmy Burger, dry-aged beef, date night',
    priceRange: '$$$',
  },
  {
    id: 'the-commodore', name: 'The Commodore', category: 'burgers', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 687, featured: false,
    tags: ['Bar burger', 'Late night', 'Fried chicken too'],
    address: '366 Metropolitan Ave, Brooklyn, NY 11211',
    hours: 'Daily noon–4am',
    phone: '(718) 218-7632',
    website: 'https://thecommodorebar.com',
    mapsUrl: 'https://maps.google.com/?q=The+Commodore+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/the-commodore-brooklyn',
    description: 'The Commodore is where you go when you want a great burger and you don\'t want to make a thing of it. The double smash burger is messy, juicy, and absolutely delicious. It\'s a bar first — dark, wood-paneled, excellent jukebox — but the kitchen is taken seriously. Open until 4am, which is information you will eventually find very useful.',
    whyWePicked: 'Brooklyn\'s best bar burger, and it\'s not particularly close. The late-night kitchen is a public service. The fried chicken is also excellent.',
    bestFor: 'Double smash burger, late-night eating, cold beer',
    priceRange: '$$',
  },
  {
    id: 'pies-n-thighs', name: "Pies 'n' Thighs", category: 'burgers', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 812, featured: false,
    tags: ['Southern', 'Smash burger', 'Brunch too'],
    address: '166 S 4th St, Brooklyn, NY 11211',
    hours: 'Mon–Fri 9am–4pm, Sat–Sun 9am–5pm',
    phone: '(347) 529-6090',
    website: 'https://piesnthighs.com',
    mapsUrl: "https://maps.google.com/?q=Pies+n+Thighs+Brooklyn",
    yelpUrl: "https://yelp.com/biz/pies-n-thighs-brooklyn",
    description: "Pies 'n' Thighs built its name on fried chicken and biscuits, but the burger is a legitimate revelation. It's a double smash cooked on a flat-top with pickles, yellow mustard, and American cheese — diner-style but executed with Southern precision. The brunch service adds buttermilk pancakes and biscuit sandwiches to the mix. One of Williamsburg's most beloved spots for a reason.",
    whyWePicked: 'The smash burger is one of the most underrated in Brooklyn. The Southern comfort approach to everything on the menu is consistent and genuinely excellent.',
    bestFor: 'Smash burger, fried chicken, weekend brunch',
    priceRange: '$$',
  },
  {
    id: 'black-swan', name: 'Black Swan', category: 'burgers', neighborhood: 'Crown Heights',
    rating: 4.5, reviewCount: 423, featured: false,
    tags: ['Craft beer', 'Bar burger', 'Neighborhood spot'],
    address: '1206 Atlantic Ave, Brooklyn, NY 11216',
    hours: 'Mon–Thu 4pm–midnight, Fri–Sat noon–2am, Sun noon–midnight',
    phone: '(347) 915-1682',
    website: 'https://blackswanbk.com',
    mapsUrl: 'https://maps.google.com/?q=Black+Swan+Crown+Heights+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/black-swan-brooklyn',
    description: 'Black Swan is Crown Heights\' best bar, full stop — but the burger has become almost as much of a draw as the exceptional craft beer list. A half-pound patty with sharp cheddar, bacon, and house sauce on a brioche bun that holds together until the last bite. The 30-tap draft system runs deep with local and regional craft beers.',
    whyWePicked: 'The perfect bar burger — big, flavorful, well-constructed. Paired with the best beer list in Crown Heights, it\'s one of Brooklyn\'s great bar experiences.',
    bestFor: 'Half-pound burger, craft beer, neighborhood hang',
    priceRange: '$$',
  },
  {
    id: 'burger-supreme', name: 'Burger Supreme', category: 'burgers', neighborhood: 'Park Slope',
    rating: 4.3, reviewCount: 312, featured: false,
    tags: ['Classic', 'No frills', 'Old school'],
    address: '242 5th Ave, Brooklyn, NY 11215',
    hours: 'Daily 11am–10pm',
    phone: '(718) 638-1010',
    mapsUrl: 'https://maps.google.com/?q=Burger+Supreme+Park+Slope+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/burger-supreme-brooklyn',
    description: 'Burger Supreme has been feeding Park Slope for decades and shows no sign of slowing down. No reservations, no pretension, no $25 wagyu nonsense — just honest burgers cooked to order with good toppings at fair prices. The double with cheese and a side of crinkle fries is a Park Slope rite of passage.',
    whyWePicked: 'Sometimes you want a great burger without the event. Burger Supreme delivers every time — consistent, affordable, and proudly old-school.',
    bestFor: 'Classic double cheeseburger, crinkle fries, milkshakes',
    priceRange: '$',
  },
  {
    id: 'no7-burger', name: 'No. 7 Burger', category: 'burgers', neighborhood: 'Fort Greene',
    rating: 4.4, reviewCount: 289, featured: false,
    tags: ['Creative toppings', 'Broccoli burger', 'Inventive'],
    address: '7 Greene Ave, Brooklyn, NY 11238',
    hours: 'Tue–Sun 11:30am–9pm',
    phone: '(718) 522-6370',
    website: 'https://no7restaurant.com',
    mapsUrl: 'https://maps.google.com/?q=No7+Burger+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/no-7-burger-brooklyn',
    description: 'No. 7 Burger made its name with creative, slightly unexpected burger combinations — the Broccoli Burger, loaded with roasted broccoli, cheddar, and pickle, has been on New York\'s best burger lists for years. The kitchen takes ingredients seriously and the results are burgers that feel considered rather than assembled.',
    whyWePicked: 'The most creative burger menu in Brooklyn. The Broccoli Burger should not be as good as it is. A great option if you\'re with a group with mixed preferences.',
    bestFor: 'Broccoli burger, creative combinations, vegetarian options',
    priceRange: '$$',
  },
  {
    id: 'shake-shack-prospect', name: 'Shake Shack', category: 'burgers', neighborhood: 'Park Slope',
    rating: 4.4, reviewCount: 1893, featured: false,
    tags: ['ShackBurger', 'Classic', 'Crinkle fries'],
    address: '170 Flatbush Ave, Brooklyn, NY 11217',
    hours: 'Daily 11am–11pm',
    phone: '(646) 435-0135',
    website: 'https://shakeshack.com',
    mapsUrl: 'https://maps.google.com/?q=Shake+Shack+Park+Slope+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/shake-shack-brooklyn-2',
    description: 'Shake Shack began as a hot dog cart in Madison Square Park and grew into the standard-bearer for the modern American burger. The ShackBurger — a crispy-edged smash patty with ShackSauce, lettuce, tomato, and American cheese — remains one of the most reliably excellent fast-casual burgers in the city. The crinkle fries and concrete shakes are essential companions. The Brooklyn location near Barclays Center is convenient and consistent.',
    whyWePicked: 'The gold standard of the fast-casual burger in New York City. The ShackBurger has been consistent since day one and the crinkle fries are genuinely great.',
    bestFor: 'ShackBurger, crinkle fries, concrete shake',
    priceRange: '$$',
  },
  {
    id: 'brennan-and-carr', name: 'Brennan & Carr', category: 'burgers', neighborhood: 'Sheepshead Bay',
    rating: 4.5, reviewCount: 567, featured: false,
    tags: ['Old school', 'Roast beef', 'Brooklyn institution'],
    address: '3432 Nostrand Ave, Brooklyn, NY 11229',
    hours: 'Daily 11am–11pm',
    phone: '(718) 769-1254',
    mapsUrl: 'https://maps.google.com/?q=Brennan+and+Carr+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/brennan-and-carr-brooklyn',
    description: 'Brennan & Carr has been a Brooklyn institution since 1938, famous for its roast beef sandwich dipped in au jus — but the burger here deserves equal recognition. A no-nonsense patty cooked over an open flame and served with exactly what you want and nothing you don\'t. The Sheepshead Bay location feels unchanged from decades ago, and the regulars who\'ve been coming for years wouldn\'t have it any other way.',
    whyWePicked: 'A piece of genuine Brooklyn history that still delivers. The flame-cooked burger is straightforward and excellent. Worth the trip to Sheepshead Bay.',
    bestFor: 'Classic burger, roast beef dip, old school Brooklyn atmosphere',
    priceRange: '$',
  },
  {
    id: 'roberta-pizza-burger', name: "Roberta's", category: 'burgers', neighborhood: 'Bushwick',
    rating: 4.6, reviewCount: 2140, featured: false,
    tags: ['Lunch burger', 'Famous kitchen', 'Bushwick icon'],
    address: '261 Moore St, Brooklyn, NY 11206',
    hours: 'Mon–Fri noon–midnight, Sat–Sun 11am–midnight',
    phone: '(718) 417-1118',
    website: 'https://robertaspizza.com',
    mapsUrl: 'https://maps.google.com/?q=Roberta\'s+Bushwick+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/robertas-brooklyn',
    description: 'Roberta\'s is primarily the most famous pizza in Brooklyn, but the burger served at lunch and in the bar area has developed its own dedicated following. The kitchen applies the same sourcing rigor and technique to the beef as it does to its legendary pies — the result is a burger that punches well above its setting. The outdoor area, container bar, and radio station make the full Roberta\'s experience one of a kind in Brooklyn.',
    whyWePicked: 'The most famous kitchen in Brooklyn does a burger worth knowing about. The sourcing and technique applied to the beef are exceptional. A bonus to one of Brooklyn\'s great destinations.',
    bestFor: 'Lunch burger, the full Roberta\'s experience, beer in the garden',
    priceRange: '$$',
  },
  {
    id: 'peter-luger-lunch', name: 'Peter Luger Steak House', category: 'burgers', neighborhood: 'Williamsburg',
    rating: 4.6, reviewCount: 3241, featured: false,
    tags: ['Legendary', 'Lunch only', 'Steak house burger'],
    address: '178 Broadway, Brooklyn, NY 11211',
    hours: 'Mon–Thu noon–9:45pm, Fri–Sat noon–10:45pm, Sun 1pm–9:45pm',
    phone: '(718) 387-7400',
    website: 'https://peterluger.com',
    mapsUrl: 'https://maps.google.com/?q=Peter+Luger+Steak+House+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/peter-luger-steak-house-brooklyn',
    description: 'Peter Luger has been the definitive New York steakhouse since 1887, but the lunch burger is a genuine insider secret. Made from dry-aged beef trimmings — the same beef dry-aging in the back for the legendary porterhouse — the Peter Luger burger is available only at lunch and served with tomato, onion, and the restaurant\'s famous thick-cut bacon. It\'s cash only, the waitstaff are famously brusque, and every single bite is worth it.',
    whyWePicked: 'The most famous steakhouse in New York does a lunch burger made from dry-aged trimmings. It\'s one of the best burgers in the city. Cash only. Worth every penny.',
    bestFor: 'Dry-aged lunch burger, bacon, a taste of old New York',
    priceRange: '$$$',
  },
  {
    id: 'walters-fort-greene', name: "Walter's", category: 'burgers', neighborhood: 'Fort Greene',
    rating: 4.5, reviewCount: 398, featured: false,
    tags: ['Craft burgers', 'Natural wine', 'Fort Greene gem'],
    address: '166 DeKalb Ave, Brooklyn, NY 11217',
    hours: 'Tue–Sun 5pm–10pm',
    phone: '(718) 488-7800',
    website: 'https://waltersbrooklyn.com',
    mapsUrl: 'https://maps.google.com/?q=Walter+Restaurant+Fort+Greene+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/walters-brooklyn',
    description: 'Walter\'s is Fort Greene\'s most relaxed nice restaurant — a neighborhood spot where the food punches significantly above the unpretentious room. The burger is a well-engineered double-patty with house pickles and a special sauce that have been refined over years of service. The natural wine list is genuinely interesting and the staff knowledgeable. A rare combination of excellent food, fair prices, and real neighborhood character.',
    whyWePicked: 'Fort Greene\'s most underrated spot. The burger is refined and delicious, and the natural wine list makes it a complete evening rather than just a meal.',
    bestFor: 'Double burger, natural wine, low-key date night',
    priceRange: '$$',
  },

  // ── RAMEN ──
  {
    id: 'ganso-ramen', name: 'Ganso', category: 'ramen', neighborhood: 'Downtown Brooklyn',
    rating: 4.5, reviewCount: 672, featured: true,
    tags: ['Tonkotsu', 'Japanese izakaya', 'Craft beer'],
    address: '25 Bond St, Brooklyn, NY 11201',
    hours: 'Mon–Thu noon–10pm, Fri–Sat noon–11pm, Sun noon–10pm',
    phone: '(718) 403-0900',
    website: 'https://ganso-nyc.com',
    mapsUrl: 'https://maps.google.com/?q=Ganso+Ramen+Downtown+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/ganso-brooklyn',
    description: 'Ganso is Downtown Brooklyn\'s definitive ramen destination — a full Japanese izakaya with a ramen program that takes equal pride in its broths and its robata-grilled skewers. The tonkotsu is milky, rich, and built on bones simmered for 18 hours. The spicy miso is a close second. The craft beer list is curated thoughtfully, and the space manages to work for a solo lunch at the counter and a group dinner in equal measure.',
    whyWePicked: 'The best all-around ramen experience in Downtown Brooklyn. The tonkotsu is exceptional and the izakaya format means excellent food beyond just the bowl.',
    bestFor: 'Tonkotsu ramen, spicy miso, robata skewers, craft beer',
    priceRange: '$$',
  },
  {
    id: 'chuko-ramen', name: 'Chuko', category: 'ramen', neighborhood: 'Prospect Heights',
    rating: 4.6, reviewCount: 531, featured: false,
    tags: ['Creative', 'Vegetarian-friendly', 'Seasonal'],
    address: '552 Vanderbilt Ave, Brooklyn, NY 11238',
    hours: 'Tue–Sun noon–10pm',
    phone: '(718) 576-6701',
    website: 'https://barchuko.com',
    mapsUrl: 'https://maps.google.com/?q=Chuko+Ramen+Prospect+Heights+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/chuko-brooklyn',
    description: 'Chuko is Prospect Heights\' neighborhood ramen spot and one of the more thoughtful bowls in Brooklyn. The ramen here leans creative — the shoyu broth is clean and complex, and the seasonal specials often incorporate ingredients outside the traditional Japanese pantry. The vegetarian option is genuinely excellent, which is rare in a ramen context. The bar side of the operation serves cocktails that pair better with a bowl than you\'d expect.',
    whyWePicked: 'The most inventive ramen in Brooklyn. The shoyu is exceptional and the vegetarian option is the best of its kind. A Prospect Heights treasure.',
    bestFor: 'Shoyu ramen, vegetarian bowl, cocktails',
    priceRange: '$$',
  },
  {
    id: 'samurai-mama', name: 'Samurai Mama', category: 'ramen', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 443, featured: false,
    tags: ['Udon too', 'Izakaya', 'Late night'],
    address: '205 Grand St, Brooklyn, NY 11211',
    hours: 'Mon–Fri 5pm–midnight, Sat–Sun noon–midnight',
    phone: '(718) 599-6161',
    website: 'https://samuraimama.com',
    mapsUrl: 'https://maps.google.com/?q=Samurai+Mama+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/samurai-mama-brooklyn-2',
    description: 'Samurai Mama has been serving Williamsburg\'s late-night ramen and udon crowd since 2008. The menu toggles between ramen and udon, with seasonal specials that reward regular visits. The tonkotsu is traditional and satisfying, and the cold udon in summer is one of the neighborhood\'s best warm-weather dishes. The space fills up quickly after 8pm and the vibe is reliably lively — a good-natured Williamsburg izakaya that hasn\'t lost its way.',
    whyWePicked: 'One of Williamsburg\'s original Japanese restaurants and still among the best. The late hours and udon program set it apart from most ramen spots.',
    bestFor: 'Tonkotsu ramen, cold udon in summer, late-night eating',
    priceRange: '$$',
  },
  {
    id: 'okiboru', name: 'Okiboru', category: 'ramen', neighborhood: 'Williamsburg',
    rating: 4.7, reviewCount: 389, featured: false,
    tags: ['House-made noodles', 'Tsukemen', 'Acclaimed'],
    address: '136 Division Ave, Brooklyn, NY 11211',
    hours: 'Wed–Mon noon–9pm',
    phone: '(929) 367-3688',
    website: 'https://okiboru.com',
    mapsUrl: 'https://maps.google.com/?q=Okiboru+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/okiboru-brooklyn',
    description: 'Okiboru is the most technically serious ramen operation in Brooklyn — the noodles are made in-house daily, the broths are multi-day projects, and the tsukemen (dipping ramen) is among the best in New York City. The space is small and the lines can be long, but the bowl justifies the wait. The thick, hand-cut noodles hold up beautifully to the concentrated dipping broth, which is dense with pork and chicken built over dozens of hours.',
    whyWePicked: 'The best ramen in Brooklyn. The house-made noodles and tsukemen are exceptional by any measure. Expect a wait and bring patience — it\'s worth it.',
    bestFor: 'Tsukemen, house-made noodles, classic shoyu',
    priceRange: '$$',
  },
  {
    id: 'ichiran-williamsburg', name: 'Ichiran', category: 'ramen', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 1845, featured: false,
    tags: ['Solo booth', 'Tonkotsu', 'Japanese chain'],
    address: '374 Johnson Ave, Brooklyn, NY 11206',
    hours: 'Daily 24 hours',
    website: 'https://ichiranusa.com',
    mapsUrl: 'https://maps.google.com/?q=Ichiran+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/ichiran-brooklyn',
    description: 'Ichiran\'s concept is pure and unlike anything else in New York: you order via a vending machine, sit in a private solo booth with a bamboo curtain separating you from the kitchen, and receive a bowl of perfectly calibrated Hakata-style tonkotsu ramen. You specify your spice level, richness, garlic, noodle firmness — everything. The result is a tonkotsu that tastes tuned specifically to you. The 24-hour operation means it\'s available at any reasonable or unreasonable hour.',
    whyWePicked: 'The most distinctive ramen experience in Brooklyn. The solo booth concept and customizable tonkotsu create something genuinely unlike any other ramen in the city.',
    bestFor: 'Tonkotsu solo experience, late-night ramen, first ramen visit',
    priceRange: '$$',
  },
  {
    id: 'nakamura-ramen', name: 'Nakamura', category: 'ramen', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 312, featured: false,
    tags: ['Chicken broth', 'Tokyo-style', 'Intimate'],
    address: '172 Delancey St, Brooklyn, NY 11211',
    hours: 'Tue–Sun noon–10pm',
    phone: '(646) 490-8541',
    website: 'https://nakamura-ny.com',
    mapsUrl: 'https://maps.google.com/?q=Nakamura+Ramen+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/nakamura-brooklyn',
    description: 'Nakamura serves a Tokyo-style chicken broth ramen that is the cleanest, most refined bowl in Williamsburg. Where most Brooklyn ramen leans tonkotsu and rich, Nakamura\'s chintan chicken broth is almost crystalline — clear, complex, and built on technique rather than fat. The shio and shoyu versions are both excellent and the hand-pulled chashu is some of the best in the city.',
    whyWePicked: 'The most technically refined ramen in Williamsburg. The Tokyo-style chicken broth is exceptional and underrepresented in Brooklyn. For ramen enthusiasts.',
    bestFor: 'Shio ramen, Tokyo chicken broth, chashu pork',
    priceRange: '$$',
  },
  {
    id: 'yuji-ramen', name: 'Yuji Ramen', category: 'ramen', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 256, featured: false,
    tags: ['Mazemen', 'Seafood ramen', 'Creative'],
    address: '150 Ainslie St, Brooklyn, NY 11211',
    hours: 'Wed–Sun noon–9pm',
    mapsUrl: 'https://maps.google.com/?q=Yuji+Ramen+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/yuji-ramen-brooklyn',
    description: 'Yuji Ramen focuses on mazemen — brothless ramen that lets the toppings and sauce take center stage — and on applying Japanese noodle technique to non-traditional ingredients. The smoked salmon mazemen has been a signature for years, and the seasonal specials often incorporate seafood in ways you won\'t find anywhere else. A small operation with big ideas, and one of Brooklyn\'s most original Japanese restaurants.',
    whyWePicked: 'The most original ramen concept in Brooklyn. The mazemen and seafood combinations are genuinely inventive. For adventurous eaters.',
    bestFor: 'Mazemen, smoked salmon ramen, seasonal specials',
    priceRange: '$$',
  },
  {
    id: 'shalom-japan', name: 'Shalom Japan', category: 'ramen', neighborhood: 'South Williamsburg',
    rating: 4.5, reviewCount: 487, featured: false,
    tags: ['Japanese-Jewish fusion', 'Ramen dishes', 'Creative'],
    address: '310 S 4th St, Brooklyn, NY 11211',
    hours: 'Wed–Mon 5:30pm–10pm, Sat–Sun 11am–3pm',
    phone: '(718) 388-4012',
    website: 'https://shalomjapannyc.com',
    mapsUrl: 'https://maps.google.com/?q=Shalom+Japan+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/shalom-japan-brooklyn',
    description: 'Shalom Japan is a Japanese-Jewish fusion restaurant that has no right being as good as it is. The matzo ball ramen — a Japanese broth with a matzo ball in place of the noodle — is a cult dish that makes perfect sense the moment you taste it. Chef Aaron Israel and his team approach both cuisines with deep knowledge and irreverence, and the seasonal ramen specials are among the most creative in Brooklyn.',
    whyWePicked: 'The most unique ramen experience in Brooklyn. The matzo ball ramen is a genuine original and the Japanese-Jewish fusion is handled with real intelligence.',
    bestFor: 'Matzo ball ramen, fusion specials, weekend brunch ramen',
    priceRange: '$$$',
  },

  // ── BRUNCH ──
  {
    id: 'five-leaves', name: 'Five Leaves', category: 'brunch', neighborhood: 'Greenpoint',
    rating: 4.6, reviewCount: 892, featured: true,
    tags: ['Australian', 'Ricotta hotcakes', 'Always a line'],
    address: '18 Bedford Ave, Brooklyn, NY 11222',
    hours: 'Daily 8am–midnight',
    phone: '(718) 383-5345',
    website: 'https://fiveleavesny.com',
    mapsUrl: 'https://maps.google.com/?q=Five+Leaves+Greenpoint+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/five-leaves-brooklyn-2',
    description: 'Five Leaves is the Brooklyn brunch institution — a Greenpoint café-restaurant that has been drawing lines down Bedford Avenue since 2008. The Australian-influenced menu produces the ricotta hotcakes with honeycomb butter that are among the most photographed brunches in New York City. The grain bowls and avocado dishes are equally good, and the coffee is serious. Expect a wait on weekends; it\'s worth it.',
    whyWePicked: 'The definitive Brooklyn brunch. The ricotta hotcakes alone justify the wait. A genuinely great Australian café that has held its standard for years.',
    bestFor: 'Ricotta hotcakes, grain bowl, excellent coffee',
    priceRange: '$$',
  },
  {
    id: 'sunday-in-brooklyn', name: 'Sunday in Brooklyn', category: 'brunch', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 743, featured: false,
    tags: ['Malted pancakes', 'Beautiful space', 'Full bar'],
    address: '348 Wythe Ave, Brooklyn, NY 11249',
    hours: 'Mon–Fri 9am–4pm, Sat–Sun 9am–5pm',
    phone: '(347) 222-6722',
    website: 'https://sundayinbrooklyn.com',
    mapsUrl: 'https://maps.google.com/?q=Sunday+in+Brooklyn+Williamsburg',
    yelpUrl: 'https://yelp.com/biz/sunday-in-brooklyn-brooklyn',
    description: 'Sunday in Brooklyn operates as though the perfect weekend morning is an art form worth taking seriously. The malted pancakes with hazelnut maple syrup and whipped butter are the signature — thick, nutty, and decadent without tipping into excess. The space is beautifully designed, the full bar opens early for cocktails, and the savory dishes are as considered as the sweets. Williamsburg brunch at its best.',
    whyWePicked: 'The malted pancakes are the best pancakes in Brooklyn. The space is beautiful and the execution is consistent. The standard-setter for Williamsburg brunch.',
    bestFor: 'Malted pancakes, brunch cocktails, eggs Benedict',
    priceRange: '$$$',
  },
  {
    id: 'vinegar-hill-house', name: 'Vinegar Hill House', category: 'brunch', neighborhood: 'DUMBO',
    rating: 4.5, reviewCount: 634, featured: false,
    tags: ['Cozy', 'Farm-to-table', 'Neighborhood gem'],
    address: '72 Hudson Ave, Brooklyn, NY 11201',
    hours: 'Sat–Sun 11am–3pm (brunch), dinner Tue–Sun',
    phone: '(718) 522-1018',
    website: 'https://vinegarhillhouse.com',
    mapsUrl: 'https://maps.google.com/?q=Vinegar+Hill+House+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/vinegar-hill-house-brooklyn',
    description: 'Vinegar Hill House occupies a charming converted row house in one of Brooklyn\'s quietest pockets — a neighborhood so small it barely shows on most maps. The weekend brunch is among the most intimate and comfortable in the borough: farm-sourced eggs, house-made bread, seasonal vegetables, and a kitchen that applies dinner-level craft to brunch service. The garden is lovely in warm weather.',
    whyWePicked: 'The most romantic brunch setting in Brooklyn. The food is farm-to-table done right and the neighborhood itself is worth discovering.',
    bestFor: 'Farm egg dishes, seasonal vegetables, garden brunch',
    priceRange: '$$$',
  },
  {
    id: 'reynard-wythe', name: 'Reynard at The Wythe', category: 'brunch', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 512, featured: false,
    tags: ['Hotel restaurant', 'Upscale', 'Manhattan views'],
    address: '80 Wythe Ave, Brooklyn, NY 11249',
    hours: 'Sat–Sun 11am–3:30pm',
    phone: '(718) 460-8004',
    website: 'https://wythehotel.com/reynard',
    mapsUrl: 'https://maps.google.com/?q=Reynard+Wythe+Hotel+Williamsburg',
    yelpUrl: 'https://yelp.com/biz/reynard-brooklyn',
    description: 'Reynard occupies the ground floor of the Wythe Hotel, one of Williamsburg\'s landmark adaptive reuse buildings. The brunch here is a more formal affair than most Brooklyn options — seasonal American cooking with serious sourcing, impressive cocktails, and a room that looks out toward Manhattan. It\'s the place to go when you want brunch to feel like an event rather than just a meal.',
    whyWePicked: 'Brooklyn\'s most impressive brunch setting. The food matches the room and the cocktails are excellent. For a special occasion or when visitors need to be impressed.',
    bestFor: 'Special occasion brunch, seasonal egg dishes, brunch cocktails',
    priceRange: '$$$',
  },
  {
    id: 'mables-smokehouse', name: "Mable's Smokehouse", category: 'brunch', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 478, featured: false,
    tags: ['BBQ brunch', 'Biscuits', 'Southern'],
    address: '44 Berry St, Brooklyn, NY 11249',
    hours: 'Sat–Sun 11am–4pm',
    phone: '(718) 218-6655',
    website: 'https://mablessmokehouse.com',
    mapsUrl: "https://maps.google.com/?q=Mable's+Smokehouse+Williamsburg+Brooklyn",
    yelpUrl: "https://yelp.com/biz/mables-smokehouse-brooklyn",
    description: 'Mable\'s Smokehouse does something few Brooklyn brunch spots attempt: applying real Southern BBQ technique to weekend brunch. The smoked brisket hash, buttermilk biscuits with sausage gravy, and smoked turkey eggs Benedict are exactly as good as they sound. The pulled pork Benedict is the signature. The weekend lines are long but the meats are smoked overnight, which should tell you everything you need to know about the commitment here.',
    whyWePicked: 'The best BBQ brunch in Brooklyn by a wide margin. The brisket hash and pulled pork Benedict are exceptional. Southern technique applied to the morning meal.',
    bestFor: 'Brisket hash, pulled pork Benedict, buttermilk biscuits',
    priceRange: '$$',
  },
  {
    id: 'northeast-kingdom', name: 'Northeast Kingdom', category: 'brunch', neighborhood: 'Bushwick',
    rating: 4.4, reviewCount: 356, featured: false,
    tags: ['New England', 'Seasonal', 'Neighborhood spot'],
    address: '18 Wyckoff Ave, Brooklyn, NY 11237',
    hours: 'Sat–Sun 11am–4pm',
    phone: '(718) 386-3864',
    website: 'https://northeastkingdom.com',
    mapsUrl: 'https://maps.google.com/?q=Northeast+Kingdom+Bushwick+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/northeast-kingdom-brooklyn',
    description: 'Northeast Kingdom is a Bushwick original — a cozy restaurant inspired by Vermont and New England food culture, with a focus on seasonal ingredients and preparations that feel genuinely warm rather than trend-chasing. The weekend brunch draws on this sensibility: maple-glazed things, house-made breads, foraged mushrooms when available, and eggs from farms the kitchen actually knows by name. A perfect antidote to the louder side of Bushwick.',
    whyWePicked: 'The most genuinely warm brunch in Bushwick. The New England sensibility and seasonal sourcing produce something distinct from typical Brooklyn brunch.',
    bestFor: 'Seasonal egg dishes, house bread, maple everything',
    priceRange: '$$',
  },
  {
    id: 'egg-restaurant', name: 'Egg', category: 'brunch', neighborhood: 'Williamsburg',
    rating: 4.5, reviewCount: 921, featured: false,
    tags: ['Southern breakfast', 'Biscuits', 'Long-running'],
    address: '109 N 3rd St, Brooklyn, NY 11249',
    hours: 'Daily 8am–6pm',
    phone: '(718) 302-5151',
    website: 'https://eggrestaurant.com',
    mapsUrl: 'https://maps.google.com/?q=Egg+Restaurant+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/egg-brooklyn',
    description: 'Egg has been serving the Williamsburg morning crowd since 2003 with an approach so consistent it borders on principled. The menu is Southern-influenced American breakfast — biscuits with butter and local honey, farm eggs cooked with care, grits, and the Sunnyside Up, which has been on the menu essentially unchanged for twenty years. The space is small and the lines can be long, but the quality has never wavered.',
    whyWePicked: 'One of Williamsburg\'s original neighborhood restaurants, still going strong after two decades. The biscuits and Southern egg dishes are the real deal.',
    bestFor: 'Southern biscuits, farm eggs, grits, classic brunch',
    priceRange: '$$',
  },
  {
    id: 'cafe-mogador-brooklyn', name: 'Café Mogador', category: 'brunch', neighborhood: 'Williamsburg',
    rating: 4.4, reviewCount: 687, featured: false,
    tags: ['Moroccan', 'Shakshuka', 'Long-running'],
    address: '133 Wythe Ave, Brooklyn, NY 11249',
    hours: 'Daily 9am–midnight',
    phone: '(718) 486-9800',
    website: 'https://cafemogador.com',
    mapsUrl: 'https://maps.google.com/?q=Cafe+Mogador+Williamsburg+Brooklyn',
    yelpUrl: 'https://yelp.com/biz/cafe-mogador-brooklyn',
    description: 'Café Mogador brought its beloved Moroccan brunch from the East Village to Williamsburg, and the new location has become as much of a neighborhood institution as the original. The shakshuka is the signature — eggs poached in a spiced tomato-pepper sauce that has been refined over decades. The Moroccan breakfast plate, fresh mint tea, and tagines make it the most distinctive brunch menu in Williamsburg.',
    whyWePicked: 'The best shakshuka in Brooklyn, from a restaurant that invented its own interpretation of Moroccan-American café culture. The mint tea alone is worth the visit.',
    bestFor: 'Shakshuka, Moroccan breakfast plate, fresh mint tea',
    priceRange: '$$',
  },
]

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 'best-coffee-brooklyn',
    title: 'Best Coffee Shops in Brooklyn (2026)',
    category: 'coffee',
    tag: 'COFFEE GUIDE',
    description: 'From specialty roasters to cozy neighborhood staples — the definitive guide to Brooklyn\'s coffee scene by neighborhood.',
    content: `Brooklyn's coffee scene has matured from a novelty into one of the best in the country. Whether you want a technically perfect pour over or just a reliably excellent flat white on your way to work, the borough has you covered. Here's where to go, organized by what you're actually looking for.

**The best overall: Sey Coffee (Bushwick)**
If you had to name one Brooklyn coffee shop that represents everything the borough does right, Sey would be it. The in-house roasting operation is meticulous, the space is beautiful, and the baristas treat every cup with the same care. The single-origin pour overs are exceptional.

**Best for the space: Devoción (Williamsburg)**
Devoción's farm-to-cup Colombian sourcing is remarkable, but the real showstopper is the space — a converted factory with a soaring green wall and enough natural light to make any morning feel like an event. The coffee matches the setting.

**Best neighborhood café: Café Grumpy (Park Slope)**
Twenty years in, Café Grumpy is still getting it right. The Park Slope location is one of Brooklyn's most reliable spots — the espresso is consistent, the pastries are good, and the room fills up with regulars who've been coming for years.

**Best for exploring: Variety Coffee (Crown Heights)**
The Crown Heights location of Variety doesn't get enough attention. The drip coffee is sourced thoughtfully and the prices are some of the fairest in the borough for the quality. A genuine neighborhood anchor.

**The wildcard: Sweatshop (Williamsburg)**
A laundromat café that's been operating since 2009. The concept sounds gimmicky but works brilliantly. Drop off your laundry and drink excellent espresso — it's a very Brooklyn solution to a very Brooklyn problem.`,
    faqs: [
      { q: 'What is the best coffee shop in Brooklyn?', a: 'Sey Coffee in Bushwick is consistently considered the best overall, particularly for specialty coffee and pour overs. Devoción in Williamsburg is a close second for both coffee quality and atmosphere.' },
      { q: 'Where can I find the best espresso in Brooklyn?', a: 'Sey Coffee, Café Grumpy, and Toby\'s Estate all run excellent espresso programs. For the most technically precise espresso, Sey is the standard.' },
      { q: 'Are there good coffee shops in Crown Heights?', a: 'Variety Coffee Roasters on Kingston Ave is the standout in Crown Heights — excellent quality at fair prices with a strong neighborhood community feel.' },
    ],
  },
  {
    id: 'best-burgers-brooklyn',
    title: 'The 10 Best Burgers in Brooklyn, Ranked',
    category: 'burgers',
    tag: 'BURGER GUIDE',
    description: 'From dry-aged beef masterpieces to perfect late-night smash burgers — every great burger in Brooklyn, ranked and reviewed.',
    content: `Brooklyn takes its burgers seriously. The borough has become home to some of the most interesting burger spots in New York City, ranging from bar classics to genuinely inventive kitchen projects. Here's where the best ones live.

**1. The Emmy Burger at Emily (Clinton Hill)**
The Emmy Burger at Emily is genuinely one of the five best burgers in New York City. Dry-aged beef, perfectly caramelized onions, American cheese, and a special sauce that deserves its own profile. They make a limited number each service, and when they're gone, they're gone. Go early, don't skip this one.

**2. The Double at The Commodore (Williamsburg)**
The Commodore is a bar first — dark, wood-paneled, excellent jukebox — but the kitchen is taken seriously. The double smash burger is messy, juicy, and exactly what you want at 1am. Open until 4am, which is a public service.

**3. Smash Burger at Pies 'n' Thighs (Williamsburg)**
The smash burger at Pies 'n' Thighs gets overlooked because the fried chicken gets all the attention. Don't make that mistake. Flat-top cooked, pickles, yellow mustard, American cheese — Southern precision applied to a diner classic.

**4. Lunch Burger at Peter Luger (Williamsburg)**
One of New York's greatest insider secrets: Peter Luger serves a lunch burger made from dry-aged beef trimmings. It's available weekdays only and frequently sells out. The most storied burger in Brooklyn.

**5. Half-Pound at Black Swan (Crown Heights)**
A half-pound patty with sharp cheddar, bacon, and house sauce. The brioche bun holds together. The beer list is exceptional. One of Brooklyn's great bar experiences.`,
    faqs: [
      { q: 'What is the best burger in Brooklyn?', a: 'The Emmy Burger at Emily in Clinton Hill is widely considered the best burger in Brooklyn. The dry-aged beef and caramelized onion combination is exceptional, though they sell out quickly.' },
      { q: 'Where can I get a great late-night burger in Brooklyn?', a: 'The Commodore in Williamsburg is open until 4am and serves one of Brooklyn\'s best bar burgers. A genuine late-night landmark.' },
      { q: 'Is there a good burger in Park Slope?', a: 'Burger Supreme on 5th Ave is the Park Slope staple — no frills, honest ingredients, crinkle fries. Shake Shack near Barclays is also excellent for a fast-casual option.' },
    ],
  },
  {
    id: 'best-bars-brooklyn',
    title: 'Best Bars in Brooklyn by Neighborhood (2026)',
    category: 'bars',
    tag: 'BAR GUIDE',
    description: 'Dive bars, cocktail dens, beer gardens, and rooftop views — the complete guide to Brooklyn\'s bar scene by neighborhood.',
    content: `Brooklyn's bar scene is one of the most varied in New York City. Within a few square miles you can find a world-class absinthe bar, a century-old longshoreman's dive, a rooftop beer garden with skyline views, and a cocktail bar doing things nobody else is doing. Here's how it breaks down by neighborhood.

**Williamsburg**
Maison Premiere is the crown jewel — a New Orleans-inspired oyster and absinthe bar that would hold its own in any city in the world. The garden in summer is one of Brooklyn's great pleasures. Hotel Delmano is the most atmospheric bar in the neighborhood — Belle Époque mirrors, marble counters, and cocktails that match the setting. Union Pool is the outdoor institution: a fire pit patio and taco truck that has been a Williamsburg staple for years.

**Carroll Gardens**
Clover Club on Smith Street is one of Brooklyn's best cocktail bars — historically informed, technically precise, and genuinely beautiful. Worth a special trip.

**Red Hook**
Sunny's Bar is Brooklyn history. A century-old longshoreman's bar that survived Sandy and keeps getting better. The Saturday bluegrass nights are a genuine New York experience. Go before it changes.

**Gowanus**
Threes Brewing is the neighborhood anchor — a massive taproom with an excellent rotating beer list and a kitchen that competes on its own terms. The backyard fills up the moment weather permits.

**Bushwick**
The Narrows is the cocktail bar Bushwick needed: intimate, inventive, and without the neighborhood's occasional try-hard quality. Featherweight handles natural wine with real expertise for a different kind of evening.`,
    faqs: [
      { q: 'What is the best bar in Brooklyn?', a: 'Maison Premiere in Williamsburg is often cited as one of the best bars in America, not just Brooklyn. The absinthe program and oyster list are extraordinary.' },
      { q: 'Where is the best rooftop bar in Brooklyn?', a: 'Berry Park in Williamsburg has the best rooftop views — a beer garden setting with Manhattan skyline views. Gets packed on weekends but the views justify the crowd.' },
      { q: 'What\'s the best dive bar in Brooklyn?', a: "Sunny's Bar in Red Hook is Brooklyn's most beloved dive bar — over a century old with legendary Saturday night bluegrass jams." },
    ],
  },
  {
    id: 'best-bakeries-brooklyn',
    title: 'Hidden Bakery Gems in Brooklyn Worth Seeking Out',
    category: 'bakeries',
    tag: 'BAKERY GUIDE',
    description: 'The best bread, pastries, and baked goods in Brooklyn — from award-winning sourdough to creative cookies that sell out by 10am.',
    content: `Brooklyn's bakery scene has reached extraordinary levels. The borough now has multiple bakeries that would rank among the best in the country, and the range — from technically precise French pastry to creative American baking — is remarkable.

**The bread benchmark: Bien Cuit (Cobble Hill)**
Bien Cuit is the standard against which Brooklyn bread is measured. The country loaves are the result of a multi-day process that produces a crust and crumb of genuine complexity. The croissants are laminated to perfection. If you're serious about bread, this is where you start.

**The pie destination: Four & Twenty Blackbirds (Gowanus)**
The Elsen sisters have built the most celebrated pie shop in America right in Gowanus. The Salted Caramel Apple is a year-round benchmark, and the seasonal specials are always worth trying.

**The creative standout: Ovenly (Williamsburg)**
Ovenly's salty chocolate chip cookie has been on New York's best cookie lists for years, and for good reason — it shouldn't work as well as it does, but it absolutely does.

**The Belgian option: Colson Patisserie (Park Slope)**
The Liège waffle at Colson is the best version in Brooklyn. Dense, caramelized at the edges, studded with pearl sugar — it's the real thing, not an imitation.

**The institution: Baked (Red Hook)**
Baked's Sweet and Salty brownie is the most copied baked good in Brooklyn, but the original is still the best.

**The old-school original: Peter Pan Donuts (Greenpoint)**
Open since 1953 and still cash only. The crullers are exceptional and the staff in pink uniforms haven't changed the menu in decades. A genuine piece of Brooklyn history.`,
    faqs: [
      { q: 'What is the best bakery in Brooklyn?', a: 'Bien Cuit in Cobble Hill is widely considered the best bakery in Brooklyn for bread and pastry quality. The country loaf and croissants are benchmarks.' },
      { q: 'Where can I find good croissants in Brooklyn?', a: 'Bien Cuit, Almondine in DUMBO, and Colson Patisserie all make excellent croissants. Almondine has been doing it for over twenty years.' },
      { q: 'What is the best brownie in Brooklyn?', a: "Baked in Red Hook makes Brooklyn's most famous brownie — the Sweet and Salty has been widely imitated but the original is still the best." },
    ],
  },
  {
    id: 'williamsburg-food-guide',
    title: 'The Complete Williamsburg Food & Drink Guide (2026)',
    category: 'coffee',
    tag: 'NEIGHBORHOOD',
    description: 'Everything worth eating and drinking in Williamsburg — coffee, bars, bakeries, and burgers in Brooklyn\'s most food-dense neighborhood.',
    content: `Williamsburg has more great food and drink per square mile than almost anywhere in New York City. The neighborhood's transformation over the past two decades has produced a remarkably varied scene — from serious cocktail bars to casual coffee shops to creative bakeries.

**Coffee**
Start at Devoción on Grand Street for the most beautiful coffee space in the neighborhood. Oslo Coffee Roasters on Roebling is the original Williamsburg specialty coffee pioneer. Toby's Estate on North 6th brings the Australian flat white tradition. Sweatshop on Kent Avenue is the wildcard — a laundromat café that's been operating since 2009 with genuinely excellent espresso.

**Bars**
Maison Premiere on Bedford Avenue is the destination — a New Orleans-inspired absinthe and oyster bar that's one of the finest in the country. Hotel Delmano on Berry Street is the most atmospheric option for a classic cocktail evening. Union Pool has the best outdoor fire pit setup. Extra Fancy on Metropolitan does seafood-focused cocktails unlike anywhere else.

**Burgers**
The Commodore on Metropolitan Avenue serves Brooklyn's best bar burger until 4am. Peter Luger on Broadway does the most storied lunch burger in the city — dry-aged beef trimmings, cash only, worth the effort.

**Brunch**
Sunday in Brooklyn on Wythe Avenue has the best pancakes in the neighborhood. Egg on North 3rd Street has been doing Southern breakfast right for over twenty years. Café Mogador on Wythe brings Moroccan brunch including the borough's best shakshuka.`,
    faqs: [
      { q: 'What is Williamsburg known for food?', a: 'Williamsburg is known for its exceptional coffee scene, craft cocktail bars, and diverse dining options. Maison Premiere, Devoción, and The Commodore are among the neighborhood\'s most celebrated spots.' },
      { q: 'What are the best restaurants in Williamsburg Brooklyn?', a: 'For coffee: Devoción and Toby\'s Estate. For bars: Maison Premiere and Hotel Delmano. For burgers: The Commodore. For brunch: Sunday in Brooklyn and Egg.' },
    ],
  },
  {
    id: 'park-slope-food-guide',
    title: "Park Slope's Best Spots for Coffee, Food & Drinks",
    category: 'coffee',
    tag: 'NEIGHBORHOOD',
    description: 'The best coffee, bakeries, bars, and burgers in Park Slope — one of Brooklyn\'s most consistently excellent neighborhoods for food.',
    content: `Park Slope has been one of Brooklyn's most reliable food neighborhoods for decades. The tree-lined streets and residential character have attracted a concentration of quality independent businesses that hold up year after year.

**Coffee**
Café Grumpy on 7th Avenue is the neighborhood standard — twenty years in and still getting it right. Gorilla Coffee on 5th Avenue is the original Park Slope roaster, with bold roasts and a loyal following that predates the specialty coffee wave.

**Bakeries**
Colson Patisserie on 9th Street is the Park Slope gem — Belgian pastry technique applied with genuine care. The Liège waffle and fruit tarts are essential.

**Burgers**
Burger Supreme on 5th Avenue is a neighborhood classic for an honest, no-frills burger at fair prices. Shake Shack near Barclays Center is the fast-casual option that consistently delivers.`,
    faqs: [
      { q: 'What is the best coffee shop in Park Slope?', a: 'Café Grumpy on 7th Avenue is the Park Slope staple — consistent, welcoming, and reliable for over twenty years. Gorilla Coffee on 5th Ave is the neighborhood original for bold roasts.' },
      { q: 'What is the best bakery in Park Slope?', a: 'Colson Patisserie on 9th Street is the standout — the Liège waffle and seasonal tarts are exceptional.' },
    ],
  },
  {
    id: 'dumbo-brooklyn-guide',
    title: 'The Best Spots in DUMBO, Brooklyn',
    category: 'coffee',
    tag: 'NEIGHBORHOOD',
    description: 'Coffee, bakeries, and food worth seeking out in DUMBO — Brooklyn\'s most photogenic neighborhood has more than just views.',
    content: `DUMBO gets most of its attention for the Manhattan Bridge views and cobblestone streets, but the neighborhood has built a legitimate food and drink scene worth knowing.

**Coffee**
Partners Coffee on Plymouth Street occupies a stunning converted warehouse with soaring ceilings and exceptional natural light. The espresso program is tight and the food selection is better than average for a coffee shop. The best coffee experience in DUMBO by a wide margin.

**Bakeries**
Almondine Bakery on Water Street is the neighborhood's French pastry institution — over twenty years of exceptional croissants, tarts, and breads in a small shop near the waterfront. One Girl Cookies on Dean Street is one of Brooklyn's oldest artisan bakeries — the sandwich cookies are iconic.

**Brunch**
Vinegar Hill House, just minutes from DUMBO in the tiny Vinegar Hill neighborhood, offers one of Brooklyn's most intimate and well-sourced weekend brunches. Worth the short walk.`,
    faqs: [
      { q: 'What is the best coffee shop in DUMBO Brooklyn?', a: 'Partners Coffee on Plymouth Street is the best coffee in DUMBO — a beautifully converted warehouse space with an excellent espresso program.' },
      { q: 'What should I do in DUMBO Brooklyn for food?', a: 'Start with coffee at Partners Coffee, visit Almondine for French pastry, and consider the walk to Vinegar Hill House for weekend brunch.' },
    ],
  },
  {
    id: 'bushwick-food-guide',
    title: 'Bushwick Food Guide: Coffee, Bars & More',
    category: 'bars',
    tag: 'NEIGHBORHOOD',
    description: 'The best coffee and bars in Bushwick — Brooklyn\'s most creative neighborhood has a food scene that matches its artistic reputation.',
    content: `Bushwick's food scene has grown alongside its arts community — creative, unpretentious, and full of spots that would get more attention if they were anywhere else.

**Coffee**
Sey Coffee on Grattan Street is simply one of the best coffee shops in New York City, not just Bushwick. The in-house roasting operation is meticulous and the pour overs are exceptional. Worth a trip from anywhere in the city.

**Bars**
The Narrows on Flushing Avenue is the cocktail bar the neighborhood needed — intimate, inventive, and seasonal. Featherweight on Graham Avenue is the natural wine bar done right. Pine Box Rock Shop on Grattan Street is the fun, vegan-friendly dive bar in a converted coffin factory that only makes sense in Bushwick.

**Burgers**
Roberta's on Moore Street is primarily the most famous pizza in Brooklyn, but the lunch burger is a genuine insider move — built from the same sourcing rigor as the pizza program.`,
    faqs: [
      { q: 'What is the best coffee shop in Bushwick?', a: 'Sey Coffee on Grattan Street is the best coffee shop in Bushwick and one of the best in all of Brooklyn, known for its exceptional single-origin pour overs and in-house roasting.' },
      { q: 'What are the best bars in Bushwick?', a: 'The Narrows is the standout cocktail bar. Featherweight is best for natural wine. Pine Box Rock Shop is the most fun late-night option in the neighborhood.' },
    ],
  },
  {
    id: 'brooklyn-date-night',
    title: 'Best Date Night Spots in Brooklyn (2026)',
    category: 'bars',
    tag: 'DATE NIGHT',
    description: 'The most romantic and impressive spots in Brooklyn for a date — from intimate cocktail bars to unforgettable dinner experiences.',
    content: `Brooklyn has become one of the best cities in the world for a date night. The combination of intimate spaces, serious cocktail programs, and restaurants that don't take themselves too seriously makes the borough ideal.

**For drinks: Maison Premiere (Williamsburg)**
The garden at Maison Premiere on a warm evening is one of the most romantic spots in New York City. The absinthe service is theatrical in the best way, and the oysters are an excellent excuse to linger.

**For atmosphere: Hotel Delmano (Williamsburg)**
Belle Époque mirrors, candlelight, marble counters, and cocktails that match the setting. Hotel Delmano is the intimate cocktail bar date nights were made for.

**For cocktails: Clover Club (Carroll Gardens)**
Historically-informed cocktails in a beautiful room on Smith Street. The wine list is also excellent, giving you options across the evening.

**For dessert: Butter & Scotch (Crown Heights)**
A bakery-bar that serves excellent pies with thoughtfully matched cocktails. Open late, casual, and genuinely fun. The ideal ending to a Brooklyn evening.`,
    faqs: [
      { q: 'What is the best date night bar in Brooklyn?', a: 'Maison Premiere in Williamsburg is the most romantic bar in Brooklyn — the garden setting, absinthe service, and oyster program make it a special experience. Hotel Delmano is the most atmospheric for cocktails.' },
      { q: 'Where should I take a date in Brooklyn?', a: 'Start with cocktails at Hotel Delmano or The Narrows, then dinner somewhere in Williamsburg. For a special occasion, the Maison Premiere garden in summer is hard to beat anywhere in New York.' },
    ],
  },
  {
    id: 'crown-heights-food-guide',
    title: 'Crown Heights Food & Drink Guide (2026)',
    category: 'bars',
    tag: 'NEIGHBORHOOD',
    description: 'The best coffee, bars, bakeries, and burgers in Crown Heights — one of Brooklyn\'s most underrated food neighborhoods.',
    content: `Crown Heights is Brooklyn's most underrated food neighborhood. The combination of longtime institutions and newer arrivals has created a scene that rewards exploration.

**Coffee**
Variety Coffee Roasters on Kingston Avenue is the anchor — excellent quality at genuinely fair prices, with a neighborhood feel that's increasingly rare in Brooklyn.

**Bars**
Black Swan on Atlantic Avenue is Crown Heights' best bar — 30 taps of well-curated craft beer, a half-pound burger that has become a neighborhood staple, and a welcoming room that works whether you're going solo or with a group.

**Bakeries**
Butter & Scotch on Franklin Avenue is a completely original concept — a bakery-bar where the pies and the cocktails are equally serious. Open late, informal, and one of Brooklyn's genuinely fun spots.`,
    faqs: [
      { q: 'What is the best bar in Crown Heights Brooklyn?', a: 'Black Swan on Atlantic Avenue is the best bar in Crown Heights — 30 craft beer taps, an excellent burger, and a welcoming atmosphere.' },
      { q: 'What are the best restaurants in Crown Heights?', a: 'Variety Coffee for your morning coffee, Black Swan for drinks and a burger, and Butter & Scotch for pie and cocktails in the evening.' },
    ],
  },
  // ── NEW ARTICLES ──
  {
    id: 'famous-bakeries-brooklyn',
    title: 'Famous Bakeries in Brooklyn You Need to Visit',
    category: 'bakeries',
    tag: 'BAKERY GUIDE',
    description: 'The most celebrated and iconic bakeries in Brooklyn — from nationally recognized pie shops to old-school Italian pastry counters that have been here for generations.',
    content: `Brooklyn's most famous bakeries have earned their reputations through decades of consistent craft. Some of them have been written up in every major food publication in the country. Others are known only to the neighborhood. Both categories are worth your time.

**Bien Cuit — Cobble Hill**
The most technically accomplished bakery in Brooklyn. Chef Zachary Golper's country loaves and croissants are benchmarks for the form. If you're serious about bread, this is the first stop.

**Four & Twenty Blackbirds — Gowanus**
The most celebrated pie shop in America, and it's in Gowanus. The Elsen sisters' Salted Caramel Apple pie has been on food writers' best lists for years. The rotating seasonal specials are always worth the trip.

**Baked — Red Hook**
Famous nationwide for the Sweet and Salty Brownie — a dense, fudgy slab with a pretzel crust and sea salt that's been copied across the country. The Red Hook original is still the best.

**Peter Pan Donut & Pastry Shop — Greenpoint**
Open since 1953, cash only, staff in pink uniforms, and crullers that haven't changed in decades. One of the great old-school New York donut shops.

**Almondine — DUMBO**
Over twenty years of exceptional French pastry on Water Street. The croissants are consistently among the best in Brooklyn. A neighborhood institution that proves longevity and quality can coexist.

**Court Pastry Shop — Carroll Gardens**
A multigenerational Italian-American pastry shop that has been serving the Carroll Gardens community for decades. The sfogliatelle and cannoli are made with traditional technique and genuine pride.`,
    faqs: [
      { q: 'What is the most famous bakery in Brooklyn?', a: 'Bien Cuit in Cobble Hill and Four & Twenty Blackbirds in Gowanus are consistently cited as Brooklyn\'s most celebrated bakeries. Baked in Red Hook is famous for its Sweet and Salty Brownie.' },
      { q: 'Where can I find the best pie in Brooklyn?', a: 'Four & Twenty Blackbirds in Gowanus is the definitive pie destination in Brooklyn — the Salted Caramel Apple and Black Bottom Oat are the most celebrated, but the seasonal specials are always worth trying.' },
      { q: 'Are there good old-school bakeries in Brooklyn?', a: 'Yes — Peter Pan Donut in Greenpoint has been open since 1953, Damascus Bakery in Brooklyn Heights since 1930, and Court Pastry Shop in Carroll Gardens for multiple generations.' },
    ],
  },
  {
    id: 'best-coffee-park-slope',
    title: 'Best Coffee Shops in Park Slope, Brooklyn',
    category: 'coffee',
    tag: 'NEIGHBORHOOD',
    description: 'The definitive guide to coffee in Park Slope — from neighborhood institutions to specialty roasters along 5th and 7th Avenue.',
    content: `Park Slope has one of Brooklyn's most settled and reliable coffee scenes. The neighborhood's residential character attracts the kind of independent café operators who are in it for the long haul — which means fewer trendy openings and closings, and more places you can count on year after year.

**The neighborhood standard: Café Grumpy (7th Ave)**
Café Grumpy has been the Park Slope morning ritual for twenty years. The espresso is reliably excellent, the room fills with regulars, and the relaxed pace makes it easy to linger. The drip coffee is always fresh. The pastries rotate with the seasons. This is what a neighborhood café is supposed to be.

**The original roaster: Gorilla Coffee (5th Ave)**
Gorilla Coffee predates the specialty coffee wave in Brooklyn. The roasts are bold and full-bodied — built for people who want to taste the coffee, not a delicate fruit note. Two decades of operation on 5th Avenue makes it a Park Slope institution.

**After coffee: Colson Patisserie (9th St)**
Not technically a coffee shop, but the café side of the operation is excellent, and the Liège waffle and seasonal tarts are the best pastries in the neighborhood. A natural extension of any Park Slope morning.

**Quick stop: Shake Shack (Flatbush Ave)**
Not coffee, but the ShackBurger at the Barclays location is the perfect companion to any caffeine-fueled Park Slope afternoon.`,
    faqs: [
      { q: 'What is the best coffee shop in Park Slope?', a: 'Café Grumpy on 7th Avenue is the Park Slope standard — twenty years of consistent quality and a warm neighborhood atmosphere.' },
      { q: 'Is Gorilla Coffee still open in Park Slope?', a: 'Yes, Gorilla Coffee on 5th Avenue is still operating and remains one of Park Slope\'s original specialty roasters. The bold roasts have a loyal following.' },
      { q: 'Where can I get good pastries with my coffee in Park Slope?', a: 'Colson Patisserie on 9th Street is the best pastry destination in Park Slope — the Liège waffle and seasonal tarts are exceptional.' },
    ],
  },
  {
    id: 'best-brunch-brooklyn',
    title: 'Best Brunch Spots in Brooklyn (2026)',
    category: 'brunch',
    tag: 'BRUNCH GUIDE',
    description: 'From ricotta hotcakes in Greenpoint to shakshuka in Williamsburg — the complete guide to Brooklyn\'s best weekend brunch spots.',
    content: `Brooklyn does brunch better than most places in the world. The combination of neighborhood cafés that have been doing it for years, restaurant kitchens that take morning service seriously, and a borough full of people who treat the weekend meal as an event produces something genuinely special.

**The benchmark: Five Leaves (Greenpoint)**
The ricotta hotcakes with honeycomb butter are among the most celebrated breakfast dishes in New York City. Five Leaves has been drawing weekend lines down Bedford Avenue since 2008, and the quality has never wavered. Expect a wait; it's worth it.

**Best pancakes: Sunday in Brooklyn (Williamsburg)**
The malted pancakes with hazelnut maple syrup are the best pancakes in Brooklyn. The beautiful Wythe Avenue space and full bar make it the most complete brunch experience in Williamsburg.

**Best for a special occasion: Reynard at The Wythe (Williamsburg)**
The Wythe Hotel's restaurant brings seasonal American cooking and an impressive room to weekend brunch. When you need to impress someone or want brunch to feel like an event.

**Best BBQ brunch: Mable's Smokehouse (Williamsburg)**
The pulled pork Benedict and brisket hash are exceptions to the rule that BBQ and brunch don't belong together. They absolutely do. Lines on weekends but worth the wait.

**Best for Moroccan: Café Mogador (Williamsburg)**
The shakshuka at Café Mogador has been refined over decades. The Moroccan breakfast plate and fresh mint tea make it the most distinctive brunch menu in the neighborhood.

**Best neighborhood option: Northeast Kingdom (Bushwick)**
A Vermont-inspired cozy room with seasonal sourcing and genuine warmth. The best antidote to the louder side of Bushwick.`,
    faqs: [
      { q: 'What is the best brunch in Brooklyn?', a: 'Five Leaves in Greenpoint is consistently considered the best brunch in Brooklyn — the ricotta hotcakes are iconic. Sunday in Brooklyn in Williamsburg is a close second for the malted pancakes.' },
      { q: 'Where can I get the best pancakes in Brooklyn?', a: 'Sunday in Brooklyn on Wythe Avenue has the best pancakes in Brooklyn — malted, with hazelnut maple syrup and whipped butter.' },
      { q: 'What is the best shakshuka in Brooklyn?', a: 'Café Mogador in Williamsburg has the best shakshuka in Brooklyn — a recipe refined over decades of service at the original East Village location.' },
    ],
  },
  {
    id: 'best-ramen-brooklyn',
    title: 'Best Ramen in Brooklyn by Neighborhood',
    category: 'ramen',
    tag: 'RAMEN GUIDE',
    description: 'From Downtown Brooklyn tonkotsu to Williamsburg tsukemen — the definitive guide to every great ramen bowl in Brooklyn.',
    content: `Brooklyn's ramen scene has developed into something genuinely interesting. Where a few years ago the options were limited, the borough now has a range of styles, sensibilities, and dining formats that make it worth mapping out before you eat.

**The best overall: Okiboru (Williamsburg)**
Okiboru makes the most technically serious ramen in Brooklyn. The noodles are made in-house daily, the tsukemen broth is built over many hours, and the result is a bowl with a depth of flavor that takes patience to achieve. The lines are real and justified.

**Best experience: Ichiran (Williamsburg)**
The solo booth concept, 24-hour operation, and customizable tonkotsu make Ichiran the most distinctive ramen experience in Brooklyn. The quality matches the concept — the Hakata-style tonkotsu is exceptional.

**Best neighborhood ramen: Ganso (Downtown Brooklyn)**
A full izakaya with a ramen program that takes itself seriously. The 18-hour tonkotsu is excellent and the robata-grilled skewers make it a complete destination rather than just a bowl.

**Most creative: Chuko (Prospect Heights)**
The shoyu at Chuko is among the cleanest and most thoughtful in Brooklyn, and the seasonal specials regularly incorporate ingredients outside the traditional ramen playbook. The vegetarian bowl is exceptional.

**The wild card: Shalom Japan (South Williamsburg)**
The matzo ball ramen is a genuine original — Japanese broth, matzo ball, and a kitchen that approaches both cuisines with real knowledge. One of Brooklyn's most unique culinary experiences.`,
    faqs: [
      { q: 'What is the best ramen in Brooklyn?', a: 'Okiboru in Williamsburg is the most technically accomplished ramen in Brooklyn — the house-made noodles and tsukemen are exceptional. Ichiran is the most unique experience.' },
      { q: 'Where can I get 24-hour ramen in Brooklyn?', a: 'Ichiran in Williamsburg is open 24 hours and serves customizable Hakata-style tonkotsu in individual solo booths.' },
      { q: 'Is there good vegetarian ramen in Brooklyn?', a: 'Chuko in Prospect Heights has the best vegetarian ramen in Brooklyn — the broth and toppings are treated with the same care as the meat-based options.' },
    ],
  },
  {
    id: 'best-bars-williamsburg',
    title: 'Best Bars in Williamsburg, Brooklyn (2026)',
    category: 'bars',
    tag: 'BAR GUIDE',
    description: 'The complete guide to every great bar in Williamsburg — from world-class cocktail destinations to rooftop beer gardens and beloved late-night dives.',
    content: `Williamsburg has the densest concentration of excellent bars in Brooklyn, and arguably in New York City. In a few blocks you can move from a world-class absinthe bar to a rooftop beer garden to a bar serving cocktails based on the sea. Here's how to navigate it.

**The destination: Maison Premiere**
A New Orleans-inspired absinthe and oyster bar that would be remarkable in any city in the world. The cocktail menu draws from pre-Prohibition tradition with genuine knowledge. The garden in summer is unmissable. Book in advance for garden seating.

**The most atmospheric: Hotel Delmano**
Belle Époque mirrors, marble counters, warm candlelight, and a serious cocktail program. Hotel Delmano is the bar you take someone when you want the evening to feel special. The oyster program is compact but well-sourced.

**The outdoor institution: Union Pool**
The fire pit patio in a converted pool supply store is one of Brooklyn's great outdoor bar experiences. The taco truck parked outside is genuinely good. Late night here is reliably fun.

**The rooftop: Berry Park**
The rooftop beer garden with Manhattan skyline views is the best view from a bar in Brooklyn. The German beer and pretzel concept works exactly as intended.

**The seafood cocktail bar: Extra Fancy**
A seafood-focused cocktail bar where the clam chowder punch is real and excellent. The most original bar concept in the neighborhood.

**Late night: The Commodore**
Open until 4am and serving Brooklyn's best bar burger. The dark, wood-paneled room and excellent jukebox make it a neighborhood anchor at any hour.`,
    faqs: [
      { q: 'What is the best bar in Williamsburg?', a: 'Maison Premiere is the best bar in Williamsburg and one of the best in America — the absinthe and oyster program is extraordinary. For cocktails in a beautiful room, Hotel Delmano is the alternative.' },
      { q: 'What bars are open late in Williamsburg?', a: 'The Commodore is open until 4am and serves food throughout. Union Pool runs late on weekends. Maison Premiere is open until 2am Friday and Saturday.' },
      { q: 'Where is the best rooftop bar in Williamsburg?', a: 'Berry Park on Berry Street has the best rooftop views in Williamsburg — a German beer garden format with Manhattan skyline views.' },
    ],
  },
]

const NEIGHBORHOODS = [
  { name: 'Williamsburg', slug: 'williamsburg' },
  { name: 'Park Slope', slug: 'park-slope' },
  { name: 'DUMBO', slug: 'dumbo' },
  { name: 'Crown Heights', slug: 'crown-heights' },
  { name: 'Bushwick', slug: 'bushwick' },
  { name: 'Cobble Hill', slug: 'cobble-hill' },
  { name: 'Red Hook', slug: 'red-hook' },
  { name: 'Gowanus', slug: 'gowanus' },
  { name: 'Clinton Hill', slug: 'clinton-hill' },
  { name: 'Fort Greene', slug: 'fort-greene' },
  { name: 'Greenpoint', slug: 'greenpoint' },
  { name: 'Carroll Gardens', slug: 'carroll-gardens' },
  { name: 'Prospect Heights', slug: 'prospect-heights' },
]

// ─── URL ROUTING ──────────────────────────────────────────────────────────────
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const s = {
  wrap: { maxWidth: 780, margin: '0 auto', padding: '0 20px' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `0.5px solid ${T.border}` },
  wordmark: { fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none' },
  wordmarkDot: { width: 8, height: 8, borderRadius: '50%', background: T.coral, flexShrink: 0 },
  navLinks: { display: 'flex', gap: 20, alignItems: 'center' },
  navLink: { fontSize: 13, color: T.textMid, cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontFamily: "'DM Sans', sans-serif" },
  footer: { borderTop: `0.5px solid ${T.border}`, padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  footerLinks: { display: 'flex', gap: 20 },
  footerLink: { fontSize: 12, color: T.textMuted, cursor: 'pointer', textDecoration: 'none' },
  breadcrumb: { fontSize: 12, color: T.textMid, padding: '14px 0', display: 'flex', gap: 6, alignItems: 'center', borderBottom: `0.5px solid ${T.border}`, flexWrap: 'wrap' },
  bcLink: { cursor: 'pointer', color: T.textMid, textDecoration: 'none' },
  sectionLabel: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textMuted, fontWeight: 500, margin: '28px 0 14px' },
  tag: { fontSize: 11, background: '#f0f0ec', color: T.textMid, padding: '3px 8px', borderRadius: 4 },
  colorBar: { height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${T.coral}, ${T.coralBorder} 60%, transparent)`, margin: '10px 0 16px', width: 60 },
}

function Nav({ navigate }) {
  return (
    <nav style={s.nav}>
      <div style={s.wordmark} onClick={() => navigate('home')}>
        <div style={s.wordmarkDot} />
        BestSpotsNearMe
      </div>
      <div style={s.navLinks}>
        <button style={s.navLink} onClick={() => navigate('brooklyn/coffee')}>Browse</button>
        <button style={s.navLink} onClick={() => navigate('guides')}>Guides</button>
        <button style={s.navLink} onClick={() => navigate('about')}>About</button>
      </div>
    </nav>
  )
}

function Footer({ navigate }) {
  return (
    <footer style={s.footer}>
      <div style={{ ...s.wordmark, fontSize: 14 }} onClick={() => navigate('home')}>
        <div style={{ ...s.wordmarkDot, width: 6, height: 6 }} />
        BestSpotsNearMe
      </div>
      <div style={s.footerLinks}>
        <span style={s.footerLink} onClick={() => navigate('about')}>About</span>
        <span style={s.footerLink} onClick={() => navigate('contact')}>Contact</span>
        <span style={s.footerLink} onClick={() => navigate('privacy')}>Privacy</span>
        <span style={s.footerLink} onClick={() => navigate('affiliate-disclosure')}>Affiliate Disclosure</span>
      </div>
    </footer>
  )
}

function AdBanner({ slot }) {
  return (
    <div style={{ background: '#f8f8f4', border: `0.5px dashed ${T.border}`, borderRadius: 8, padding: '12px 16px', textAlign: 'center', fontSize: 11, color: T.textMuted, margin: '24px 0' }}>
      Advertisement · {slot}
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <span style={{ color: '#BA7517', fontSize: 12, marginRight: 3 }}>{'★'.repeat(Math.round(rating))}</span>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ navigate }) {
  const [activeBorough, setActiveBorough] = useState('Brooklyn')
  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx']
  const guideLinks = [
    { label: 'Best coffee in Brooklyn →', color: GUIDE_COLORS[0], id: 'best-coffee-brooklyn' },
    { label: 'Top burger spots, ranked →', color: GUIDE_COLORS[1], id: 'best-burgers-brooklyn' },
    { label: 'Best bars by neighborhood →', color: GUIDE_COLORS[2], id: 'best-bars-brooklyn' },
    { label: 'Hidden bakery gems →', color: GUIDE_COLORS[3], id: 'best-bakeries-brooklyn' },
    { label: 'Best brunch spots →', color: GUIDE_COLORS[4], id: 'best-brunch-brooklyn' },
    { label: 'Best ramen in Brooklyn →', color: GUIDE_COLORS[0], id: 'best-ramen-brooklyn' },
  ]
  const hoodSpotCounts = {}
  LISTINGS.forEach(l => { hoodSpotCounts[l.neighborhood] = (hoodSpotCounts[l.neighborhood] || 0) + 1 })
  const catCounts = {}
  LISTINGS.forEach(l => { catCounts[l.category] = (catCounts[l.category] || 0) + 1 })

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: '44px 0 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, background: T.coralLight, color: '#B83218', padding: '5px 12px', borderRadius: 20, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.coral }} />
          Brooklyn · Queens · Manhattan · Bronx
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 36, fontWeight: 500, lineHeight: 1.18, letterSpacing: -0.5, color: T.text, marginBottom: 16 }}>
          The best local spots,<br />
          <em style={{ fontStyle: 'normal', color: T.coral }}>handpicked</em> by neighborhood.
        </h1>
        <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>
          No ads. No fake reviews. Real places curated by category — with directions straight to Google Maps.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {boroughs.map(b => (
            <button key={b} onClick={() => setActiveBorough(b)}
              style={{ padding: '8px 18px', borderRadius: 20, border: `1.5px solid ${activeBorough === b ? T.navy : T.border}`, background: activeBorough === b ? T.navy : T.bg, fontSize: 13, color: activeBorough === b ? T.navyText : T.textMid, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: 'all 0.15s' }}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <AdBanner slot="homepage-top" />

      <div style={s.sectionLabel}>Choose a category</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 32 }}>
        {Object.entries(CAT).map(([key, cat]) => (
          <div key={key} onClick={() => navigate(`brooklyn/${key}`)}
            style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: '22px 18px', cursor: 'pointer', position: 'relative', transition: 'filter 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.96)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>{cat.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: cat.text, marginBottom: 3, textTransform: 'capitalize' }}>{key}</div>
            <div style={{ fontSize: 12, color: cat.count }}>{catCounts[key] || 0} spots</div>
            <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 14, opacity: 0.35, color: cat.text }}>→</div>
          </div>
        ))}
      </div>

      <div style={s.sectionLabel}>Browse by neighborhood</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 32 }}>
        {NEIGHBORHOODS.slice(0, 6).map((hood, i) => (
          <div key={hood.name}
            style={{ background: HOOD_COLORS[i].bg, border: `1.5px solid ${HOOD_COLORS[i].border}`, borderRadius: 8, padding: '14px 16px', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{hood.name}</div>
            <div style={{ fontSize: 11, color: T.textMid }}>{hoodSpotCounts[hood.name] || 0} spots</div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `0.5px solid ${T.border}`, paddingTop: 20, paddingBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {guideLinks.map((g, i) => (
          <div key={i} onClick={() => navigate(`guides/${g.id}`)}
            style={{ fontSize: 12, padding: '7px 14px', borderRadius: 20, cursor: 'pointer', fontWeight: 500, background: g.color.bg, color: g.color.color, border: `1.5px solid ${g.color.border}` }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
            {g.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CATEGORY PAGE ────────────────────────────────────────────────────────────
function CategoryPage({ category, navigate }) {
  const [activeHood, setActiveHood] = useState('All')
  const cat = CAT[category]
  const listings = LISTINGS.filter(l => l.category === category)
  const hoods = ['All', ...new Set(listings.map(l => l.neighborhood))]
  const filtered = activeHood === 'All' ? listings : listings.filter(l => l.neighborhood === activeHood)
  const catName = category.charAt(0).toUpperCase() + category.slice(1)
  const relatedArticle = ARTICLES.find(a => a.category === category)

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={s.bcLink}>Brooklyn</span>
        <span>›</span>
        <span style={{ color: T.text }}>{catName}</span>
      </div>

      <div style={{ padding: '18px 0 0' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, marginBottom: 4, color: T.text }}>
          {cat.icon} {catName} in <span style={{ color: T.coral }}>Brooklyn</span>
        </h1>
        <div style={s.colorBar} />
        <p style={{ fontSize: 13, color: T.textMid, marginBottom: 18 }}>{filtered.length} curated spots · Updated March 2026</p>
      </div>

      <AdBanner slot={`category-${category}-top`} />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22, paddingBottom: 16, borderBottom: `0.5px solid ${T.border}` }}>
        {hoods.map(h => (
          <button key={h} onClick={() => setActiveHood(h)}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeHood === h ? T.navy : T.border}`, background: activeHood === h ? T.navy : T.bg, cursor: 'pointer', color: activeHood === h ? T.navyText : T.textMid, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            {h}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
        {filtered.sort((a,b) => b.featured - a.featured).map(listing => (
          <div key={listing.id} onClick={() => navigate(`listing/${listing.id}`)}
            style={{ border: `1.5px solid ${listing.featured ? T.coral : T.border}`, borderRadius: 12, padding: 18, cursor: 'pointer', background: listing.featured ? '#FFFAF9' : T.bg, transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = listing.featured ? T.coral : T.borderMid}
            onMouseLeave={e => e.currentTarget.style.borderColor = listing.featured ? T.coral : T.border}>
            {listing.featured && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, background: T.coralLight, color: '#993C1D', padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.coral }} />
                Featured
              </div>
            )}
            <div style={{ fontSize: 15, fontWeight: 500, color: T.text, marginBottom: 3 }}>{listing.name}</div>
            <div style={{ fontSize: 12, color: T.textMid, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.border }} />
              {listing.neighborhood}
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
              {listing.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
            </div>
            <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>
              <StarRating rating={listing.rating} />
              {listing.rating} <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 400 }}>· {listing.reviewCount.toLocaleString()} reviews</span>
            </div>
          </div>
        ))}
      </div>

      {relatedArticle && (
        <div style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: 20, marginBottom: 24, cursor: 'pointer' }}
          onClick={() => navigate(`guides/${relatedArticle.id}`)}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: cat.count, fontWeight: 600, marginBottom: 6 }}>Related guide</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: cat.text }}>{relatedArticle.title} →</div>
        </div>
      )}
    </div>
  )
}

// ─── LISTING PAGE ─────────────────────────────────────────────────────────────
function ListingPage({ listingId, navigate }) {
  const listing = LISTINGS.find(l => l.id === listingId)
  if (!listing) return <div style={{ padding: 40, textAlign: 'center', color: T.textMuted }}>Listing not found.</div>

  const cat = CAT[listing.category]
  const catName = listing.category.charAt(0).toUpperCase() + listing.category.slice(1)
  const nearby = LISTINGS.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 4)
  const relatedArticle = ARTICLES.find(a => a.category === listing.category)

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={s.bcLink} onClick={() => navigate(`brooklyn/${listing.category}`)}>Brooklyn · {catName}</span>
        <span>›</span>
        <span style={{ color: T.text }}>{listing.name}</span>
      </div>

      <div style={{ padding: '18px 0 22px', borderBottom: `0.5px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {listing.featured && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, background: T.coralLight, color: '#993C1D', padding: '3px 9px', borderRadius: 4, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.coral }} />
              Featured spot
            </div>
          )}
          <span style={{ fontSize: 12, color: T.textMid }}>{cat.icon} {catName} · {listing.neighborhood}, Brooklyn</span>
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 30, fontWeight: 500, letterSpacing: -0.4, marginBottom: 5, color: T.text }}>{listing.name}</h1>
        <p style={{ fontSize: 13, color: T.textMid, marginBottom: 16, lineHeight: 1.5 }}>
          <StarRating rating={listing.rating} />
          {listing.rating} stars · {listing.reviewCount.toLocaleString()} reviews · {listing.priceRange}
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={listing.mapsUrl} target="_blank" rel="noopener noreferrer"
            style={{ padding: '10px 20px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
            Open in Google Maps
          </a>
          {listing.yelpUrl && (
            <a href={listing.yelpUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '10px 18px', background: T.bg, color: T.text, border: `1.5px solid ${T.borderMid}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
              View on Yelp
            </a>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, paddingTop: 22 }}>
        <div>
          <AdBanner slot={`listing-${listing.id}-top`} />

          <div style={{ marginBottom: 22 }}>
            <div style={s.sectionLabel}>About this spot</div>
            <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>{listing.description}</p>
          </div>

          <div style={{ background: '#FFF8F0', border: `1.5px solid #F5D5A8`, borderRadius: 12, padding: 16, marginBottom: 22 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B4A00', fontWeight: 600, marginBottom: 6 }}>Why we picked it</div>
            <p style={{ fontSize: 13, color: '#5A3000', lineHeight: 1.65 }}>{listing.whyWePicked}</p>
          </div>

          <div style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: 16, marginBottom: 22 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: cat.count, fontWeight: 600, marginBottom: 6 }}>Best for</div>
            <p style={{ fontSize: 13, color: cat.text, lineHeight: 1.65 }}>{listing.bestFor}</p>
          </div>

          {relatedArticle && (
            <div style={{ marginBottom: 22, padding: 16, border: `0.5px solid ${T.border}`, borderRadius: 12, cursor: 'pointer' }}
              onClick={() => navigate(`guides/${relatedArticle.id}`)}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.textMuted, fontWeight: 600, marginBottom: 6 }}>Read the guide</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.coral }}>{relatedArticle.title} →</div>
            </div>
          )}

          <div style={{ marginBottom: 22 }}>
            <div style={s.sectionLabel}>More spots in this category</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {nearby.map(n => (
                <div key={n.id} onClick={() => navigate(`listing/${n.id}`)}
                  style={{ border: `1.5px solid ${T.border}`, borderRadius: 8, padding: 12, cursor: 'pointer', background: T.bg }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.coral}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{n.name}</div>
                  <div style={{ fontSize: 11, color: T.textMid }}>{n.neighborhood}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 18, background: T.bg, marginBottom: 12 }}>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 14 }}>Spot info</div>
            {[
              ['Neighborhood', listing.neighborhood],
              ['Category', catName],
              ['Rating', `★ ${listing.rating} · ${listing.reviewCount.toLocaleString()} reviews`],
              ['Hours', listing.hours],
              ['Address', listing.address],
              ['Best for', listing.bestFor],
              ['Price range', listing.priceRange],
              listing.phone ? ['Phone', listing.phone] : null,
            ].filter(Boolean).map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: `0.5px solid ${T.border}` }}>
                <span style={{ color: T.textMid }}>{label}</span>
                <span style={{ color: T.text, fontWeight: 500, textAlign: 'right', maxWidth: 200, fontSize: 12 }}>{val}</span>
              </div>
            ))}
          </div>

          {listing.website && (
            <a href={listing.website} target="_blank" rel="noopener noreferrer sponsored"
              style={{ display: 'block', textAlign: 'center', padding: '10px', background: T.bgSoft, border: `0.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textMid, textDecoration: 'none', marginBottom: 8 }}>
              Visit website →
            </a>
          )}

          <div style={{ background: T.bgSoft, border: `0.5px dashed ${T.border}`, borderRadius: 8, padding: '14px', textAlign: 'center', fontSize: 11, color: T.textMuted }}>
            Map preview · Google Maps embed goes here
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── GUIDES PAGE ──────────────────────────────────────────────────────────────
function GuidesPage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>Guides</span>
      </div>

      <div style={{ padding: '18px 0 24px' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>
          Brooklyn Food & Drink Guides
        </h1>
        <div style={s.colorBar} />
        <p style={{ fontSize: 14, color: T.textMid, marginBottom: 24 }}>{ARTICLES.length} guides · Updated March 2026</p>
      </div>

      <AdBanner slot="guides-index-top" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ARTICLES.map((article, i) => {
          const color = GUIDE_COLORS[i % GUIDE_COLORS.length]
          return (
            <div key={article.id} onClick={() => navigate(`guides/${article.id}`)}
              style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 18, cursor: 'pointer', background: T.bg }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.coral}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ display: 'inline-block', fontSize: 10, background: color.bg, color: color.color, padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', border: `1px solid ${color.border}` }}>
                {article.tag}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.4, marginBottom: 8 }}>{article.title}</div>
              <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>{article.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────
function ArticlePage({ articleId, navigate }) {
  const article = ARTICLES.find(a => a.id === articleId)
  if (!article) return <div style={{ padding: 40, textAlign: 'center', color: T.textMuted }}>Article not found.</div>

  const cat = CAT[article.category] || CAT.coffee
  const relatedListings = LISTINGS.filter(l => l.category === article.category).slice(0, 4)
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3)

  const renderContent = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**')) {
        const [bold, ...rest] = para.split('\n')
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, color: T.text, fontSize: 15, marginBottom: 6 }}>{bold.replace(/\*\*/g, '')}</div>
            {rest.map((line, j) => <p key={j} style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 8 }}>{line}</p>)}
          </div>
        )
      }
      return <p key={i} style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>{para}</p>
    })
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={s.bcLink} onClick={() => navigate('guides')}>Guides</span>
        <span>›</span>
        <span style={{ color: T.text }}>{article.title}</span>
      </div>

      <div style={{ padding: '18px 0 24px', borderBottom: `0.5px solid ${T.border}` }}>
        <div style={{ display: 'inline-block', fontSize: 10, background: cat.bg, color: cat.count, padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase', border: `1px solid ${cat.border}` }}>
          {article.tag}
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 8, lineHeight: 1.25 }}>{article.title}</h1>
        <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.55 }}>{article.description}</p>
      </div>

      <AdBanner slot={`article-${article.id}-top`} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, paddingTop: 24 }}>
        <div>
          {renderContent(article.content)}

          {article.faqs && (
            <div style={{ marginTop: 32 }}>
              <div style={{ ...s.sectionLabel, marginTop: 0 }}>Frequently asked questions</div>
              {article.faqs.map((faq, i) => (
                <div key={i} style={{ borderTop: `0.5px solid ${T.border}`, padding: '16px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 8 }}>{faq.q}</div>
                  <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          )}

          <AdBanner slot={`article-${article.id}-bottom`} />
        </div>

        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 12 }}>Spots in this guide</div>
            {relatedListings.map(listing => (
              <div key={listing.id} onClick={() => navigate(`listing/${listing.id}`)}
                style={{ padding: '12px 0', borderBottom: `0.5px solid ${T.border}`, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{listing.name}</div>
                <div style={{ fontSize: 11, color: T.textMid }}>{listing.neighborhood}</div>
              </div>
            ))}
            <div onClick={() => navigate(`brooklyn/${article.category}`)}
              style={{ fontSize: 12, color: T.coral, paddingTop: 12, cursor: 'pointer', fontWeight: 500 }}>
              See all {article.category} spots →
            </div>
          </div>

          <div>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 12 }}>More guides</div>
            {relatedArticles.map(a => (
              <div key={a.id} onClick={() => navigate(`guides/${a.id}`)}
                style={{ padding: '12px 0', borderBottom: `0.5px solid ${T.border}`, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.textMuted, fontWeight: 500, marginBottom: 4 }}>{a.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, lineHeight: 1.4 }}>{a.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── STATIC PAGES ─────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>About</span>
      </div>
      <div style={{ maxWidth: 560, paddingTop: 24 }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>About BestSpotsNearMe</h1>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>BestSpotsNearMe is a curated directory of the best local spots in Brooklyn and New York City. Every listing is handpicked — we don't accept user submissions or unverified entries.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>Our goal is simple: help you find genuinely great spots in your neighborhood without wading through fake reviews, sponsored results, or algorithmic noise.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>Listings link directly to Google Maps so you always get the most current hours, photos, and directions.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Have a spot we should know about? <span style={{ color: T.coral, cursor: 'pointer' }} onClick={() => navigate('contact')}>Drop us a line.</span></p>
      </div>
    </div>
  )
}

function PrivacyPage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>Privacy Policy</span>
      </div>
      <div style={{ maxWidth: 560, paddingTop: 24 }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>BestSpotsNearMe does not collect personal data beyond standard server logs and analytics. We use Google Analytics to understand traffic patterns. We do not sell your data.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>This site displays Google AdSense advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Last updated: March 2026.</p>
      </div>
    </div>
  )
}

function AffiliateDisclosurePage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>Affiliate Disclosure</span>
      </div>
      <div style={{ maxWidth: 560, paddingTop: 24 }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Affiliate Disclosure</h1>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>Some links on BestSpotsNearMe — including links to OpenTable, Yelp, and featured listings — may be affiliate links. If you make a reservation or purchase through these links, we may earn a small commission at no additional cost to you.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>Our editorial recommendations are not influenced by affiliate relationships. Every spot is listed because it's genuinely worth visiting.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Last updated: March 2026.</p>
      </div>
    </div>
  )
}

function ContactPage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>Contact</span>
      </div>
      <div style={{ maxWidth: 480, paddingTop: 24 }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Contact</h1>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 24 }}>Have a spot we should add? Found a listing error? Interested in a featured placement? We'd love to hear from you.</p>
        <p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Email us at: <a href="mailto:hello@bestspotsnearme.com" style={{ color: T.coral }}>hello@bestspotsnearme.com</a></p>
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => urlToPage(window.location.pathname))

  useEffect(() => {
    const handlePop = () => setPage(urlToPage(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (newPage) => {
    window.history.pushState({}, '', pageToUrl(newPage))
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const titles = {
      home: 'BestSpotsNearMe — Handpicked Local Spots in Brooklyn & NYC',
      guides: 'Brooklyn Food & Drink Guides — BestSpotsNearMe',
      about: 'About — BestSpotsNearMe',
      contact: 'Contact — BestSpotsNearMe',
      privacy: 'Privacy Policy — BestSpotsNearMe',
      'affiliate-disclosure': 'Affiliate Disclosure — BestSpotsNearMe',
    }
    if (page.startsWith('brooklyn/')) {
      const cat = page.split('/')[1]
      document.title = `Best ${cat.charAt(0).toUpperCase() + cat.slice(1)} in Brooklyn — BestSpotsNearMe`
    } else if (page.startsWith('listing/')) {
      const id = page.split('/')[1]
      const l = LISTINGS.find(x => x.id === id)
      document.title = l ? `${l.name} — BestSpotsNearMe` : 'BestSpotsNearMe'
    } else if (page.startsWith('guides/')) {
      const id = page.split('/')[1]
      const a = ARTICLES.find(x => x.id === id)
      document.title = a ? `${a.title} — BestSpotsNearMe` : 'BestSpotsNearMe'
    } else {
      document.title = titles[page] || 'BestSpotsNearMe'
    }
  }, [page])

  const renderPage = () => {
    if (page === 'home') return <HomePage navigate={navigate} />
    if (page.startsWith('brooklyn/')) {
      const cat = page.split('/')[1]
      if (CAT[cat]) return <CategoryPage category={cat} navigate={navigate} />
    }
    if (page.startsWith('listing/')) {
      const id = page.replace('listing/', '')
      return <ListingPage listingId={id} navigate={navigate} />
    }
    if (page === 'guides') return <GuidesPage navigate={navigate} />
    if (page.startsWith('guides/')) {
      const id = page.replace('guides/', '')
      return <ArticlePage articleId={id} navigate={navigate} />
    }
    if (page === 'about') return <AboutPage navigate={navigate} />
    if (page === 'privacy') return <PrivacyPage navigate={navigate} />
    if (page === 'affiliate-disclosure') return <AffiliateDisclosurePage navigate={navigate} />
    if (page === 'contact') return <ContactPage navigate={navigate} />
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 24, color: T.text, marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 14, color: T.textMid, marginBottom: 24 }}>The spot you're looking for doesn't exist.</p>
        <button onClick={() => navigate('home')} style={{ padding: '10px 24px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Back to home</button>
      </div>
    )
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <div style={s.wrap}>
        <Nav navigate={navigate} />
        <main>{renderPage()}</main>
        <Footer navigate={navigate} />
      </div>
    </div>
  )
}
