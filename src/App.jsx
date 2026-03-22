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
    description: 'Sey Coffee is a specialty roaster and café in the heart of Bushwick, beloved for its minimal aesthetic and exceptional single-origin pour overs. Beans are roasted in-house, and every cup reflects a near-obsessive commitment to quality. The bright, airy space feels welcoming whether you\'re a seasoned coffee nerd or just looking for a seriously good flat white.',
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
    description: 'Devoción sources its Colombian beans farm-to-cup in record time — often just days from harvest to your cup. Set inside a stunning converted factory space with a living green wall, it\'s arguably the most photographed coffee shop in Brooklyn. But the coffee is the real story: bright, fruity, and unlike anything else in the borough.',
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
    description: 'Café Grumpy started in Greenpoint and has become a Brooklyn institution over twenty years. The Park Slope outpost is the neighborhood\'s living room — warm, unhurried, and packed with regulars. The espresso is reliably excellent, the drip coffee is always fresh, and the pastries rotate with the seasons.',
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
    description: 'Oslo brought Scandinavian-style light roast coffee to Williamsburg before it was fashionable. The roasting operation is visible through the window, and the resulting cups are clean, bright, and nuanced. One of the original specialty coffee pioneers in Brooklyn.',
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
    description: 'Partners Coffee sits in a beautifully converted warehouse in DUMBO, with soaring ceilings and enough natural light to make any morning feel cinematic. The espresso program is tight, the food selection punches above its weight, and the crowd is a mix of creative types and tourists who accidentally found the best coffee near the bridge.',
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
    description: 'Variety is the coffee shop Crown Heights deserves — welcoming, unpretentious, and genuinely excellent. The Crown Heights location has a distinct neighborhood feel, and the rotating single-origins on drip are some of the most interesting in the borough at a price point that won\'t make you wince.',
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
    description: 'Half laundromat, half café — Sweatshop has been a Williamsburg institution since 2009. You can drop off your laundry and drink excellent espresso while you wait. The vintage furniture, exposed brick, and eclectic art make it one of the most visually interesting coffee spots in the borough. The coffee is genuinely good, not just gimmicky.',
    whyWePicked: 'There\'s nothing else quite like it in Brooklyn. The laundromat concept should be weird but it works perfectly. The espresso is excellent and the vibe is unmatched.',
    bestFor: 'Espresso, laundry day, people watching',
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
    description: 'Bien Cuit is the bakery benchmark in Brooklyn. Chef Zachary Golper\'s bread and pastry program is technically extraordinary — the country loaves have a crackling crust and a complex, deeply developed crumb that takes days to achieve. The croissants are laminated to perfection, and the seasonal pastries rival anything you\'d find in Paris.',
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
    description: 'Ovenly is known for pushing flavors in unexpected directions — salty chocolate chip cookies, salted caramel brownies, and seasonal specials that routinely sell out by 10am. The bakers are creative without being gimmicky, and the resulting pastries consistently surprise. Their vegan options are genuinely as good as the rest.',
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
    description: 'Colson brings a distinctly Belgian perspective to Brooklyn baking. The Liège waffles — dense, caramelized at the edges, studded with pearl sugar — are some of the best in the city. The pastry case rotates seasonally and the tarts and cakes are made with an attention to detail you\'d expect from a Paris pâtisserie.',
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
    description: 'One Girl Cookies has been a beloved Brooklyn institution for nearly two decades. Named for the sandwich cookies that started it all, the bakery has evolved into a full pastry and cake destination. The space is warm and distinctly un-commercial, and the baked goods reflect that same unhurried care — seasonal, hand-crafted, and genuinely delicious.',
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
    description: 'Baked in Red Hook is where the brownie was reinvented. Their signature Sweet and Salty brownie — a dense, fudgy slab with pretzel crust and sea salt — has been copied across the country, but the original is still the best. The bakery also does excellent cookies, cakes, and bars that lean into American comfort baking with serious technical chops.',
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
    description: 'Maison Premiere is one of the finest bars in New York City, let alone Brooklyn. The absinthe program is unmatched in the US, the oyster list runs deep with thoughtfully sourced bivalves, and the cocktail menu draws from New Orleans tradition with genuine craft. The garden in warm months is one of the most romantic spots in the borough.',
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
    description: "Sunny's is the soul of Red Hook — a century-old longshoreman's bar that somehow survived gentrification, Hurricane Sandy, and the death of its founder, emerging each time more beloved. The Saturday night bluegrass jams are Brooklyn legend. The crowd is mixed, the drinks are cheap, and the atmosphere is irreplaceable.",
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
    description: 'Threes Brewing is Gowanus\' anchor taproom — an enormous, welcoming space with an exceptional rotating beer list, a kitchen that genuinely competes on its own merits, and a backyard that fills up the moment weather permits. The beers are brewed in-house and consistently excellent across every style.',
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
    description: 'The Narrows is the cocktail bar Bushwick needed — intimate, inventive, and without a whiff of the neighborhood\'s occasional try-hard quality. The bar program rotates seasonally and focuses on layered, spirit-forward cocktails that reward attention. The low lighting and tight seating make it ideal for dates or small groups.',
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
    description: 'Emily is primarily known for its wood-fired pizza, but the Emmy Burger has become one of the most talked-about burgers in New York City. Dry-aged beef, caramelized onions, American cheese, and special sauce on a potato bun — it sounds simple but the execution is extraordinary. They make a limited number each night and when they\'re gone, they\'re gone.',
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
    description: "Pies 'n' Thighs built its name on fried chicken and biscuits, but the burger is a legitimate revelation. It's a double smash cooked on a flat-top with pickles, yellow mustard, and American cheese — diner-style but executed with Southern precision. The brunch service adds buttermilk pancakes and biscuit sandwiches to the mix. One of Williamsburg's most beloved spots.",
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
    id: 'no7-burger', name: 'No. 7 Burger', category: 'burgers', neighborhood: 'DUMBO',
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
      { q: 'Where can I find the best espresso in Brooklyn?', a: 'Sey Coffee, Café Grumpy, and Partners Coffee all run excellent espresso programs. For the most technically precise espresso, Sey is the standard.' },
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

**4. Half-Pound at Black Swan (Crown Heights)**
A half-pound patty with sharp cheddar, bacon, and house sauce. The brioche bun holds together. The beer list is exceptional. One of Brooklyn's great bar experiences.`,
    faqs: [
      { q: 'What is the best burger in Brooklyn?', a: 'The Emmy Burger at Emily in Clinton Hill is widely considered the best burger in Brooklyn. The dry-aged beef and caramelized onion combination is exceptional, though they sell out quickly.' },
      { q: 'Where can I get a great late-night burger in Brooklyn?', a: 'The Commodore in Williamsburg is open until 4am and serves one of Brooklyn\'s best bar burgers. A genuine late-night landmark.' },
      { q: 'Is there a good burger in Park Slope?', a: 'Burger Supreme on 5th Ave is the Park Slope staple — no frills, honest ingredients, crinkle fries. For something more creative, No. 7 Burger is worth the trip.' },
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
Maison Premiere is the crown jewel — a New Orleans-inspired oyster and absinthe bar that would hold its own in any city in the world. The garden in summer is one of Brooklyn's great pleasures. Extra Fancy is the wild card: a seafood cocktail bar where the clam chowder punch is genuinely good. Berry Park gives you the rooftop beer garden with Manhattan views.

**Red Hook**
Sunny's Bar is Brooklyn history. A century-old longshoreman's bar that survived Sandy and keeps getting better. The Saturday bluegrass nights are a genuine New York experience. Go before it changes.

**Gowanus**
Threes Brewing is the neighborhood anchor — a massive taproom with an excellent rotating beer list and a kitchen that competes on its own terms. The backyard fills up the moment weather permits.

**Bushwick**
The Narrows is the cocktail bar Bushwick needed: intimate, inventive, and without the neighborhood's occasional try-hard quality. The seasonally rotating menu is consistently interesting.`,
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

**The creative standout: Ovenly (Williamsburg)**
Ovenly's salty chocolate chip cookie has been on New York's best cookie lists for years, and for good reason — it shouldn't work as well as it does, but it absolutely does. The seasonal pastries routinely sell out before 10am.

**The Belgian option: Colson Patisserie (Park Slope)**
The Liège waffle at Colson is the best version in Brooklyn. Dense, caramelized at the edges, studded with pearl sugar — it's the real thing, not an imitation. The tarts and cakes match the waffle's technical precision.

**The institution: Baked (Red Hook)**
Baked's Sweet and Salty brownie is the most copied baked good in Brooklyn, but the original is still the best. Dense, fudgy, with a pretzel crust and sea salt that makes the whole thing sing. Worth the Red Hook trip.`,
    faqs: [
      { q: 'What is the best bakery in Brooklyn?', a: 'Bien Cuit in Cobble Hill is widely considered the best bakery in Brooklyn for bread and pastry quality. The country loaf and croissants are benchmarks.' },
      { q: 'Where can I find good croissants in Brooklyn?', a: 'Bien Cuit and Colson Patisserie both make excellent croissants. Bien Cuit is more classically French, while Colson brings a Belgian perspective.' },
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
Start at Devoción on Grand Street for the most beautiful coffee space in the neighborhood — the living green wall and farm-to-cup Colombian sourcing make it genuinely special. Oslo Coffee Roasters on Roebling is the original Williamsburg specialty coffee pioneer; the light roasts are some of the cleanest in Brooklyn. Sweatshop on Kent Avenue is the wildcard — a laundromat café that's been operating since 2009 with genuinely excellent espresso.

**Bars**
Maison Premiere on Bedford Avenue is the destination — a New Orleans-inspired absinthe and oyster bar that's one of the finest in the country. The garden in summer is unmissable. Extra Fancy on Metropolitan offers something completely different: a seafood-focused cocktail bar where the clam chowder punch is not a joke. Berry Park on Berry Street gives you the rooftop beer garden with Manhattan views.

**Burgers**
The Commodore on Metropolitan Avenue serves Brooklyn's best bar burger until 4am. The smash at Pies 'n' Thighs on South 4th — often overlooked because the fried chicken dominates — is one of the neighborhood's great meals.`,
    faqs: [
      { q: 'What is Williamsburg known for food?', a: 'Williamsburg is known for its exceptional coffee scene, craft cocktail bars, and diverse dining options. Maison Premiere, Devoción, and The Commodore are among the neighborhood\'s most celebrated spots.' },
      { q: 'What are the best restaurants in Williamsburg Brooklyn?', a: 'For coffee: Devoción and Oslo Coffee. For bars: Maison Premiere and Extra Fancy. For burgers: The Commodore. Williamsburg is one of NYC\'s most food-rich neighborhoods.' },
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
Café Grumpy on 7th Avenue is the neighborhood standard — twenty years in and still getting it right. The espresso program is consistent and the room fills with regulars every morning.

**Bakeries**
Colson Patisserie on 9th Street is the Park Slope gem — Belgian pastry technique applied with genuine care. The Liège waffle and fruit tarts are essential. Nearby, Burger Supreme on 5th Avenue is a neighborhood classic for an honest, no-frills burger at fair prices.`,
    faqs: [
      { q: 'What is the best coffee shop in Park Slope?', a: 'Café Grumpy on 7th Avenue is the Park Slope staple — consistent, welcoming, and reliable for over twenty years.' },
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
One Girl Cookies, tucked away on Dean Street, is one of Brooklyn's oldest artisan bakeries — nearly two decades of consistent craft. The namesake sandwich cookies are iconic, and the cakes are excellent for special occasions.

**Burgers**
No. 7 Burger brings the most creative menu in the neighborhood — the Broccoli Burger in particular has been on New York's best burger lists for years. A great option if you're with a group with different preferences.`,
    faqs: [
      { q: 'What is the best coffee shop in DUMBO Brooklyn?', a: 'Partners Coffee on Plymouth Street is the best coffee in DUMBO — a beautifully converted warehouse space with an excellent espresso program.' },
      { q: 'What should I do in DUMBO Brooklyn for food?', a: 'Start with coffee at Partners Coffee, visit One Girl Cookies for pastries, and try No. 7 Burger for one of the more creative burgers in the neighborhood.' },
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
The Narrows on Flushing Avenue is the cocktail bar the neighborhood needed — intimate, inventive, and seasonal. The rotating menu focuses on spirit-forward drinks that reward attention. One of Brooklyn's most interesting bar programs in a neighborhood known for interesting things.`,
    faqs: [
      { q: 'What is the best coffee shop in Bushwick?', a: 'Sey Coffee on Grattan Street is the best coffee shop in Bushwick and one of the best in all of Brooklyn, known for its exceptional single-origin pour overs and in-house roasting.' },
      { q: 'What are the best bars in Bushwick?', a: 'The Narrows is the standout cocktail bar in Bushwick — intimate, creative, and with a seasonally rotating menu that\'s consistently interesting.' },
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
The garden at Maison Premiere on a warm evening is one of the most romantic spots in New York City. The absinthe service is theatrical in the best way, and the oysters are an excellent excuse to linger. Book in advance for garden seating.

**For cocktails: The Narrows (Bushwick)**
The Narrows is the intimate cocktail bar that date nights were made for — low lighting, seasonal drinks, and bartenders who understand hospitality. The kind of place where two hours feel like twenty minutes.

**For coffee before: Devoción (Williamsburg)**
If you're starting with coffee, Devoción's gorgeous space is impressive without trying too hard. The perfect opening move.

**For dessert: Butter & Scotch (Crown Heights)**
A bakery-bar that serves excellent pies with thoughtfully matched cocktails. Open late, casual, and genuinely fun. The ideal ending to a Brooklyn evening.`,
    faqs: [
      { q: 'What is the best date night bar in Brooklyn?', a: 'Maison Premiere in Williamsburg is the most romantic bar in Brooklyn — the garden setting, absinthe service, and oyster program make it a special experience.' },
      { q: 'Where should I take a date in Brooklyn?', a: 'Start with cocktails at The Narrows in Bushwick, then dinner in Williamsburg. For a special occasion, the Maison Premiere garden in summer is hard to beat anywhere in New York.' },
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
Variety Coffee Roasters on Kingston Avenue is the anchor — excellent quality at genuinely fair prices, with a neighborhood feel that's increasingly rare in Brooklyn. The drip coffee is sourced thoughtfully and the rotating single-origins are some of the most interesting in the borough.

**Bars**
Black Swan on Atlantic Avenue is Crown Heights' best bar — 30 taps of well-curated craft beer, a half-pound burger that has become a neighborhood staple, and a welcoming room that works whether you're going solo or with a group.

**Bakeries**
Butter & Scotch on Franklin Avenue is a completely original concept — a bakery-bar where the pies and the cocktails are equally serious. Open late, informal, and one of Brooklyn's genuinely fun spots.`,
    faqs: [
      { q: 'What is the best bar in Crown Heights Brooklyn?', a: 'Black Swan on Atlantic Avenue is the best bar in Crown Heights — 30 craft beer taps, an excellent burger, and a welcoming atmosphere.' },
      { q: 'What are the best restaurants in Crown Heights?', a: 'Variety Coffee for your morning coffee, Black Swan for drinks and a burger, and Butter & Scotch for pie and cocktails in the evening.' },
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
]

// ─── URL ROUTING ──────────────────────────────────────────────────────────────
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const s = {
  // Layout
  wrap: { maxWidth: 780, margin: '0 auto', padding: '0 20px' },
  // Nav
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `0.5px solid ${T.border}` },
  wordmark: { fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none' },
  wordmarkDot: { width: 8, height: 8, borderRadius: '50%', background: T.coral, flexShrink: 0 },
  navLinks: { display: 'flex', gap: 20, alignItems: 'center' },
  navLink: { fontSize: 13, color: T.textMid, cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontFamily: "'DM Sans', sans-serif" },
  // Footer
  footer: { borderTop: `0.5px solid ${T.border}`, padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  footerLinks: { display: 'flex', gap: 20 },
  footerLink: { fontSize: 12, color: T.textMuted, cursor: 'pointer', textDecoration: 'none' },
  // Breadcrumb
  breadcrumb: { fontSize: 12, color: T.textMid, padding: '14px 0', display: 'flex', gap: 6, alignItems: 'center', borderBottom: `0.5px solid ${T.border}`, flexWrap: 'wrap' },
  bcLink: { cursor: 'pointer', color: T.textMid, textDecoration: 'none' },
  // Misc
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
    { label: 'Williamsburg food guide →', color: GUIDE_COLORS[4], id: 'williamsburg-food-guide' },
  ]
  const hoodSpotCounts = {}
  LISTINGS.forEach(l => { hoodSpotCounts[l.neighborhood] = (hoodSpotCounts[l.neighborhood] || 0) + 1 })
  const catCounts = {}
  LISTINGS.forEach(l => { catCounts[l.category] = (catCounts[l.category] || 0) + 1 })

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
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
        {/* Borough selector */}
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

      {/* Category cards */}
      <div style={s.sectionLabel}>Choose a category</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 32 }}>
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

      {/* Neighborhood grid */}
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

      {/* Guide pills */}
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

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22, paddingBottom: 16, borderBottom: `0.5px solid ${T.border}` }}>
        {hoods.map(h => (
          <button key={h} onClick={() => setActiveHood(h)}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeHood === h ? T.navy : T.border}`, background: activeHood === h ? T.navy : T.bg, cursor: 'pointer', color: activeHood === h ? T.navyText : T.textMid, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            {h}
          </button>
        ))}
      </div>

      {/* Listing cards */}
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

      {/* Related guide */}
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
  if (!listing) return <div style={{ padding: 40, textAlign: 'center', color: T.textMid }}>Listing not found.</div>

  const cat = CAT[listing.category]
  const catName = listing.category.charAt(0).toUpperCase() + listing.category.slice(1)
  const nearby = LISTINGS.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 4)

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={s.bcLink} onClick={() => navigate(`brooklyn/${listing.category}`)}>Brooklyn · {catName}</span>
        <span>›</span>
        <span style={{ color: T.text }}>{listing.name}</span>
      </div>

      {/* Header */}
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

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, paddingTop: 22 }}>
        {/* Left */}
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

        {/* Right — Info card */}
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
          const cat = CAT[article.category] || CAT.coffee
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
  if (!article) return <div style={{ padding: 40, textAlign: 'center', color: T.textMid }}>Article not found.</div>

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
        {/* Article body */}
        <div>
          {renderContent(article.content)}

          {/* FAQ */}
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

        {/* Sidebar */}
        <div>
          {/* Related listings */}
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

          {/* Related articles */}
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

// ─── SIMPLE STATIC PAGES ──────────────────────────────────────────────────────
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

  // Update document title per page
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
    // 404
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
