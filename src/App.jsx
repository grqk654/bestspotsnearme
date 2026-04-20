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

const EVENT_PILL_COLORS = [
  { bg: '#FFF8F0', border: '#F5D5A8', color: '#8B4A00' },
  { bg: '#F0F7FF', border: '#B8D4F5', color: '#1A4A8B' },
  { bg: '#F3F0FF', border: '#C8B8F5', color: '#4A1A8B' },
  { bg: '#FFF0ED', border: '#F5B8AA', color: '#8B2210' },
  { bg: '#F0FBF7', border: '#9FE1CB', color: '#085041' },
  { bg: '#FAEEDA', border: '#FAC775', color: '#633806' },
]

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS = [
  // ── COFFEE ──
  { id: 'sey-coffee', name: 'Sey Coffee', category: 'coffee', neighborhood: 'Bushwick', rating: 4.7, reviewCount: 430, featured: true, tags: ['Specialty', 'Pour over', 'In-house roaster'], address: '18 Grattan St, Brooklyn, NY 11206', hours: 'Mon–Fri 7am–6pm, Sat–Sun 8am–6pm', phone: '(347) 689-4552', website: 'https://seycoffee.com', mapsUrl: 'https://maps.google.com/?q=Sey+Coffee+Brooklyn', yelpUrl: 'https://yelp.com/biz/sey-coffee-brooklyn', description: 'Sey Coffee is a specialty roaster and café in the heart of Bushwick, beloved for its minimal aesthetic and exceptional single-origin pour overs. Beans are roasted in-house, and every cup reflects a near-obsessive commitment to quality. The bright, airy space feels welcoming whether you\'re a seasoned coffee nerd or just looking for a seriously good flat white.', whyWePicked: 'One of the few Brooklyn roasters with a dedicated cupping program. Consistent quality across every brew method, and the space is a genuine pleasure to spend time in.', bestFor: 'Pour over, espresso, bag of beans to take home', priceRange: '$$' },
  { id: 'devocion', name: 'Devoción', category: 'coffee', neighborhood: 'Williamsburg', rating: 4.6, reviewCount: 812, featured: false, tags: ['Specialty', 'Colombian beans', 'Beautiful space'], address: '69 Grand St, Brooklyn, NY 11249', hours: 'Daily 8am–6pm', phone: '(718) 285-6180', website: 'https://devocion.com', mapsUrl: 'https://maps.google.com/?q=Devocion+Brooklyn', yelpUrl: 'https://yelp.com/biz/devocion-brooklyn', description: 'Devoción sources its Colombian beans farm-to-cup in record time — often just days from harvest to your cup. Set inside a stunning converted factory space with a living green wall, it\'s arguably the most photographed coffee shop in Brooklyn. But the coffee is the real story: bright, fruity, and unlike anything else in the borough.', whyWePicked: 'Freshest Colombian beans in the city by a wide margin. The space is genuinely beautiful. A must-visit for anyone who thinks coffee is just coffee.', bestFor: 'Filter coffee, cortado, gifting a bag', priceRange: '$$' },
  { id: 'cafe-grumpy', name: 'Café Grumpy', category: 'coffee', neighborhood: 'Park Slope', rating: 4.5, reviewCount: 623, featured: false, tags: ['Cozy', 'Work-friendly', 'Neighborhood staple'], address: '383 7th Ave, Brooklyn, NY 11215', hours: 'Daily 7am–7pm', phone: '(718) 499-4404', website: 'https://cafegrumpy.com', mapsUrl: 'https://maps.google.com/?q=Cafe+Grumpy+Park+Slope+Brooklyn', yelpUrl: 'https://yelp.com/biz/cafe-grumpy-brooklyn-4', description: 'Café Grumpy started in Greenpoint and has become a Brooklyn institution over twenty years. The Park Slope outpost is the neighborhood\'s living room — warm, unhurried, and packed with regulars. The espresso is reliably excellent, the drip coffee is always fresh, and the pastries rotate with the seasons.', whyWePicked: 'One of those rare places where consistency actually means something. Great for a laptop afternoon or catching up with a friend over a long coffee.', bestFor: 'Espresso, latte, working remotely', priceRange: '$$' },
  { id: 'oslo-coffee', name: 'Oslo Coffee Roasters', category: 'coffee', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 394, featured: false, tags: ['Light roast', 'Roaster', 'Scandinavian style'], address: '133 Roebling St, Brooklyn, NY 11211', hours: 'Daily 7:30am–6pm', phone: '(718) 782-0332', website: 'https://oslocoffee.com', mapsUrl: 'https://maps.google.com/?q=Oslo+Coffee+Roasters+Williamsburg', yelpUrl: 'https://yelp.com/biz/oslo-coffee-roasters-brooklyn-2', description: 'Oslo brought Scandinavian-style light roast coffee to Williamsburg before it was fashionable. The roasting operation is visible through the window, and the resulting cups are clean, bright, and nuanced. One of the original specialty coffee pioneers in Brooklyn.', whyWePicked: 'The light roasts are some of the cleanest in Brooklyn. A great introduction to third-wave coffee without the pretension.', bestFor: 'Pour over, Chemex, buying whole beans', priceRange: '$$' },
  { id: 'partners-coffee', name: 'Partners Coffee', category: 'coffee', neighborhood: 'DUMBO', rating: 4.6, reviewCount: 541, featured: false, tags: ['Bright space', 'Specialty', 'Great pastries'], address: '125 Plymouth St, Brooklyn, NY 11201', hours: 'Mon–Fri 7am–6pm, Sat–Sun 8am–6pm', phone: '(347) 987-4551', website: 'https://partnerscoffee.com', mapsUrl: 'https://maps.google.com/?q=Partners+Coffee+DUMBO+Brooklyn', yelpUrl: 'https://yelp.com/biz/partners-coffee-brooklyn-2', description: 'Partners Coffee sits in a beautifully converted warehouse in DUMBO, with soaring ceilings and enough natural light to make any morning feel cinematic. The espresso program is tight, the food selection punches above its weight, and the crowd is a mix of creative types and tourists who accidentally found the best coffee near the bridge.', whyWePicked: 'One of the best coffee + space combinations in all of Brooklyn. The DUMBO location is especially good on a weekend morning.', bestFor: 'Cappuccino, avocado toast, weekend brunch vibes', priceRange: '$$' },
  { id: 'variety-coffee', name: 'Variety Coffee Roasters', category: 'coffee', neighborhood: 'Crown Heights', rating: 4.4, reviewCount: 312, featured: false, tags: ['Community', 'Neighborhood gem', 'Affordable'], address: '1 Kingston Ave, Brooklyn, NY 11213', hours: 'Daily 7am–7pm', phone: '(347) 915-1680', website: 'https://varietycoffeeroasters.com', mapsUrl: 'https://maps.google.com/?q=Variety+Coffee+Roasters+Crown+Heights', yelpUrl: 'https://yelp.com/biz/variety-coffee-roasters-brooklyn-3', description: 'Variety is the coffee shop Crown Heights deserves — welcoming, unpretentious, and genuinely excellent. The rotating single-origins on drip are some of the most interesting in the borough at a price point that won\'t make you wince.', whyWePicked: 'The rare spot that\'s both highly accessible and genuinely high quality. A Crown Heights anchor that the whole neighborhood relies on.', bestFor: 'Drip coffee, espresso, staying awhile', priceRange: '$' },
  { id: 'sweatshop', name: 'Sweatshop', category: 'coffee', neighborhood: 'Williamsburg', rating: 4.4, reviewCount: 287, featured: false, tags: ['Vintage', 'Laundromat café', 'Unique'], address: '325 Kent Ave, Brooklyn, NY 11249', hours: 'Daily 7am–9pm', phone: '(718) 388-4600', website: 'https://sweatshopbk.com', mapsUrl: 'https://maps.google.com/?q=Sweatshop+Brooklyn', yelpUrl: 'https://yelp.com/biz/sweatshop-brooklyn', description: 'Half laundromat, half café — Sweatshop has been a Williamsburg institution since 2009. You can drop off your laundry and drink excellent espresso while you wait. The coffee is genuinely good, not just gimmicky.', whyWePicked: 'There\'s nothing else quite like it in Brooklyn. The espresso is excellent and the vibe is unmatched.', bestFor: 'Espresso, laundry day, people watching', priceRange: '$$' },
  { id: 'tobys-estate', name: "Toby's Estate Coffee", category: 'coffee', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 502, featured: false, tags: ['Australian', 'Specialty', 'Flat white'], address: '125 N 6th St, Brooklyn, NY 11249', hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–7pm', phone: '(347) 457-6160', website: 'https://tobysestate.com', mapsUrl: 'https://maps.google.com/?q=Toby+Estate+Coffee+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/tobys-estate-coffee-brooklyn', description: 'Toby\'s Estate arrived from Sydney with a distinctly Australian approach to espresso — precise, drinkable, and built around milk-forward coffees done right. The flat white is arguably the best in Brooklyn.', whyWePicked: 'The flat white benchmark in Brooklyn. Australian coffee culture translated perfectly to Williamsburg. Reliable at any hour of the day.', bestFor: 'Flat white, cold brew, single-origin filter', priceRange: '$$' },
  { id: 'gorilla-coffee', name: 'Gorilla Coffee', category: 'coffee', neighborhood: 'Park Slope', rating: 4.4, reviewCount: 387, featured: false, tags: ['Bold roasts', 'Independent', 'Park Slope icon'], address: '97 5th Ave, Brooklyn, NY 11217', hours: 'Daily 7am–8pm', phone: '(718) 230-3243', website: 'https://gorillacoffee.com', mapsUrl: 'https://maps.google.com/?q=Gorilla+Coffee+Park+Slope+Brooklyn', yelpUrl: 'https://yelp.com/biz/gorilla-coffee-brooklyn', description: 'Gorilla Coffee has been roasting in Park Slope for over two decades, predating the specialty coffee wave. The roasts lean bold — full-bodied, direct, and built for people who want to taste the coffee.', whyWePicked: 'A true Park Slope original. The bold roast philosophy produces cups with real character. Two decades of consistency earns a spot on any list.', bestFor: 'Bold espresso, drip coffee, classic latte', priceRange: '$' },
  // ── BAKERIES ──
  { id: 'bien-cuit', name: 'Bien Cuit', category: 'bakeries', neighborhood: 'Cobble Hill', rating: 4.7, reviewCount: 568, featured: true, tags: ['Sourdough', 'French pastries', 'Award-winning'], address: '120 Smith St, Brooklyn, NY 11201', hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–7pm', phone: '(718) 852-0200', website: 'https://biencuit.com', mapsUrl: 'https://maps.google.com/?q=Bien+Cuit+Brooklyn', yelpUrl: 'https://yelp.com/biz/bien-cuit-brooklyn', description: 'Bien Cuit is the bakery benchmark in Brooklyn. The country loaves have a crackling crust and deeply developed crumb that takes days to achieve. The croissants are laminated to perfection, and the seasonal pastries rival anything you\'d find in Paris.', whyWePicked: 'The best bread in Brooklyn, full stop. Worth a trip from anywhere in the city. Buy an extra loaf — you\'ll be glad you did.', bestFor: 'Country loaf, croissant, kouign-amann', priceRange: '$$' },
  { id: 'four-and-twenty-blackbirds', name: 'Four & Twenty Blackbirds', category: 'bakeries', neighborhood: 'Gowanus', rating: 4.6, reviewCount: 512, featured: false, tags: ['Pies', 'Seasonal', 'Nationally recognized'], address: '439 3rd Ave, Brooklyn, NY 11215', hours: 'Mon–Fri 8am–8pm, Sat–Sun 9am–8pm', phone: '(718) 499-2917', website: 'https://birdsblack.com', mapsUrl: 'https://maps.google.com/?q=Four+Twenty+Blackbirds+Brooklyn', yelpUrl: 'https://yelp.com/biz/four-and-twenty-blackbirds-brooklyn', description: 'Four & Twenty Blackbirds has become the most celebrated pie shop in America. The Salted Caramel Apple and Black Bottom Oat are year-round signatures, and the rotating seasonal specials are the real reason to keep coming back.', whyWePicked: 'The most celebrated pie shop in the country, and it lives in Brooklyn. The Salted Caramel Apple is a benchmark.', bestFor: 'Salted caramel apple pie, Black Bottom Oat, seasonal specials', priceRange: '$$' },
  { id: 'ovenly', name: 'Ovenly', category: 'bakeries', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 431, featured: false, tags: ['Creative flavors', 'Cookies', 'Seasonal'], address: '31 Greenpoint Ave, Brooklyn, NY 11222', hours: 'Mon–Fri 7am–5pm, Sat–Sun 8am–5pm', phone: '(888) 899-2276', website: 'https://oven.ly', mapsUrl: 'https://maps.google.com/?q=Ovenly+Brooklyn', yelpUrl: 'https://yelp.com/biz/ovenly-brooklyn', description: 'Ovenly is known for pushing flavors in unexpected directions — salty chocolate chip cookies, salted caramel brownies, and seasonal specials that routinely sell out by 10am.', whyWePicked: 'The salty chocolate chip cookie alone is worth the trip. Creative but never weird for weird\'s sake.', bestFor: 'Salty cookies, seasonal tarts, gift boxes', priceRange: '$$' },
  { id: 'almondine', name: 'Almondine Bakery', category: 'bakeries', neighborhood: 'DUMBO', rating: 4.6, reviewCount: 445, featured: false, tags: ['French', 'Croissants', 'DUMBO institution'], address: '85 Water St, Brooklyn, NY 11201', hours: 'Mon–Sat 7am–7pm, Sun 8am–6pm', phone: '(718) 797-5026', website: 'https://almondinebakery.com', mapsUrl: 'https://maps.google.com/?q=Almondine+Bakery+DUMBO+Brooklyn', yelpUrl: 'https://yelp.com/biz/almondine-bakery-brooklyn', description: 'Almondine has been producing classic French pastry in DUMBO for over two decades. The croissants are butter-laminated and properly caramelized, and the pain au chocolat and tarts are all executed with quiet confidence.', whyWePicked: 'Two decades of French pastry excellence in DUMBO. The croissants are consistently among the best in Brooklyn.', bestFor: 'Croissant, pain au chocolat, seasonal tart', priceRange: '$$' },
  { id: 'peter-pan-donuts', name: 'Peter Pan Donut & Pastry Shop', category: 'bakeries', neighborhood: 'Greenpoint', rating: 4.6, reviewCount: 1240, featured: false, tags: ['Classic donuts', 'Cash only', 'Old school'], address: '727 Manhattan Ave, Brooklyn, NY 11222', hours: 'Mon–Fri 4:30am–8pm, Sat–Sun 5am–8pm', phone: '(718) 389-3676', mapsUrl: 'https://maps.google.com/?q=Peter+Pan+Donut+Greenpoint+Brooklyn', yelpUrl: 'https://yelp.com/biz/peter-pan-donut-and-pastry-shop-brooklyn', description: 'Peter Pan has been frying donuts in Greenpoint since 1953. The donuts are old-school New York — yeast-raised, glossy with glaze. Cash only, arrive early.', whyWePicked: 'One of the great old-school donut shops in New York City. The cruller is exceptional. Cash only, arrive early.', bestFor: 'Crullers, glazed donuts, red velvet donut', priceRange: '$' },
  { id: 'baked', name: 'Baked', category: 'bakeries', neighborhood: 'Red Hook', rating: 4.5, reviewCount: 478, featured: false, tags: ['Brownies', 'American classics', 'Iconic'], address: '359 Van Brunt St, Brooklyn, NY 11231', hours: 'Mon–Fri 8am–6pm, Sat–Sun 9am–6pm', phone: '(718) 222-0345', website: 'https://bakednyc.com', mapsUrl: 'https://maps.google.com/?q=Baked+Red+Hook+Brooklyn', yelpUrl: 'https://yelp.com/biz/baked-brooklyn-2', description: 'Baked\'s Sweet and Salty brownie — a dense, fudgy slab with pretzel crust and sea salt — has been copied across the country, but the original is still the best.', whyWePicked: 'The best brownie in New York City. The Sweet and Salty brownie alone justifies the trip to Red Hook.', bestFor: 'Sweet and Salty brownie, cookies, birthday cakes', priceRange: '$$' },
  { id: 'butter-and-scotch', name: 'Butter & Scotch', category: 'bakeries', neighborhood: 'Crown Heights', rating: 4.4, reviewCount: 256, featured: false, tags: ['Bar + bakery', 'Cocktails', 'Pies'], address: '818 Franklin Ave, Brooklyn, NY 11225', hours: 'Mon–Thu 4pm–midnight, Fri 2pm–2am, Sat–Sun 11am–2am', phone: '(347) 350-8899', website: 'https://butterandscotch.com', mapsUrl: 'https://maps.google.com/?q=Butter+and+Scotch+Brooklyn', yelpUrl: 'https://yelp.com/biz/butter-and-scotch-brooklyn', description: 'Butter & Scotch is Brooklyn\'s only bakery-bar hybrid. Come for the pie and stay for the cocktails. The weekend brunch is legendary, and the late-night baked goods situation means you can have a slice of cake at midnight.', whyWePicked: 'An entirely original concept done brilliantly. The pies are excellent and the cocktails match.', bestFor: 'Seasonal pie, cocktails, late-night cake', priceRange: '$$' },
  { id: 'colson-patisserie', name: 'Colson Patisserie', category: 'bakeries', neighborhood: 'Park Slope', rating: 4.6, reviewCount: 389, featured: false, tags: ['Belgian', 'Waffles', 'Fine pastries'], address: '374 9th St, Brooklyn, NY 11215', hours: 'Daily 7am–7pm', phone: '(718) 965-6400', website: 'https://colsonpatisserie.com', mapsUrl: 'https://maps.google.com/?q=Colson+Patisserie+Brooklyn', yelpUrl: 'https://yelp.com/biz/colson-patisserie-brooklyn', description: 'Colson brings a distinctly Belgian perspective to Brooklyn baking. The Liège waffles — dense, caramelized at the edges, studded with pearl sugar — are some of the best in the city.', whyWePicked: 'The Liège waffle is the best version in Brooklyn. The tarts are extraordinary.', bestFor: 'Liège waffle, fruit tarts, croissant', priceRange: '$$' },
  // ── BARS ──
  { id: 'maison-premiere', name: 'Maison Premiere', category: 'bars', neighborhood: 'Williamsburg', rating: 4.6, reviewCount: 892, featured: true, tags: ['Oyster bar', 'Craft cocktails', 'New Orleans vibe'], address: '298 Bedford Ave, Brooklyn, NY 11249', hours: 'Mon–Thu 4pm–midnight, Fri–Sat 2pm–2am, Sun 2pm–midnight', phone: '(347) 335-0446', website: 'https://maisonpremiere.com', mapsUrl: 'https://maps.google.com/?q=Maison+Premiere+Brooklyn', yelpUrl: 'https://yelp.com/biz/maison-premiere-brooklyn', description: 'Maison Premiere is one of the finest bars in New York City. The absinthe program is unmatched in the US, the oyster list runs deep, and the cocktail menu draws from New Orleans tradition with genuine craft. The garden in warm months is one of the most romantic spots in the borough.', whyWePicked: 'One of the best bars in America, not just Brooklyn. The absinthe service and oyster program are extraordinary.', bestFor: 'Absinthe, oysters, classic cocktails, garden dining', priceRange: '$$$' },
  { id: 'sunnys-bar', name: "Sunny's Bar", category: 'bars', neighborhood: 'Red Hook', rating: 4.7, reviewCount: 531, featured: false, tags: ['Dive bar', 'Live music', 'Legendary'], address: '253 Conover St, Brooklyn, NY 11231', hours: 'Thu–Sun 5pm–late', phone: '(718) 625-8211', website: 'https://sunnysredhook.com', mapsUrl: "https://maps.google.com/?q=Sunny's+Bar+Red+Hook+Brooklyn", yelpUrl: "https://yelp.com/biz/sunnys-red-hook-brooklyn", description: "Sunny's is the soul of Red Hook — a century-old longshoreman's bar that survived gentrification and Hurricane Sandy. The Saturday bluegrass jams are Brooklyn legend.", whyWePicked: "An irreplaceable piece of Brooklyn history. The Saturday bluegrass night is a genuine New York experience.", bestFor: 'Cold beer, bluegrass nights, falling in love with Brooklyn', priceRange: '$' },
  { id: 'hotel-delmano', name: 'Hotel Delmano', category: 'bars', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 489, featured: false, tags: ['Belle Époque', 'Craft cocktails', 'Date night'], address: '82 Berry St, Brooklyn, NY 11249', hours: 'Daily 5pm–2am', phone: '(718) 387-1945', website: 'https://hoteldelmano.com', mapsUrl: 'https://maps.google.com/?q=Hotel+Delmano+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/hotel-delmano-brooklyn', description: 'Hotel Delmano is one of Williamsburg\'s most atmospheric bars — a Belle Époque-inspired interior with marble counters, antique mirrors, and warm candlelight. The cocktail program is serious and changes seasonally.', whyWePicked: 'The most atmospheric bar in Williamsburg. The cocktails are excellent and the room is genuinely beautiful.', bestFor: 'Classic cocktails, oysters, date night', priceRange: '$$$' },
  { id: 'clover-club', name: 'Clover Club', category: 'bars', neighborhood: 'Carroll Gardens', rating: 4.6, reviewCount: 521, featured: false, tags: ['Craft cocktails', 'Sophisticated', 'Carroll Gardens gem'], address: '210 Smith St, Brooklyn, NY 11201', hours: 'Daily 4pm–2am', phone: '(718) 855-7939', website: 'https://cloverclubny.com', mapsUrl: 'https://maps.google.com/?q=Clover+Club+Carroll+Gardens+Brooklyn', yelpUrl: 'https://yelp.com/biz/clover-club-brooklyn', description: 'Clover Club is one of Brooklyn\'s most accomplished cocktail bars — a Smith Street anchor with a serious, historically-informed drinks program and an interior that feels both grand and comfortable.', whyWePicked: 'One of Brooklyn\'s best cocktail bars by any measure. The historical approach to the drinks program produces results you won\'t find elsewhere.', bestFor: 'Pre-Prohibition cocktails, whiskey, a proper evening out', priceRange: '$$$' },
  { id: 'threes-brewing', name: 'Threes Brewing', category: 'bars', neighborhood: 'Gowanus', rating: 4.5, reviewCount: 743, featured: false, tags: ['Craft beer', 'Taproom', 'Food'], address: '333 Douglass St, Brooklyn, NY 11217', hours: 'Mon–Thu 4pm–midnight, Fri 2pm–1am, Sat–Sun noon–1am', phone: '(718) 522-2110', website: 'https://threesbrewing.com', mapsUrl: 'https://maps.google.com/?q=Threes+Brewing+Gowanus+Brooklyn', yelpUrl: 'https://yelp.com/biz/threes-brewing-brooklyn', description: 'Threes Brewing is Gowanus\' anchor taproom — an enormous, welcoming space with an exceptional rotating beer list, a kitchen that genuinely competes, and a backyard that fills up the moment weather permits.', whyWePicked: 'The best all-around taproom in Brooklyn. The beer quality is high, the food is legitimately good.', bestFor: 'IPA, saison, taproom food, groups', priceRange: '$$' },
  { id: 'the-narrows', name: 'The Narrows', category: 'bars', neighborhood: 'Bushwick', rating: 4.4, reviewCount: 412, featured: false, tags: ['Craft cocktails', 'Intimate', 'Hidden gem'], address: '1037 Flushing Ave, Brooklyn, NY 11237', hours: 'Tue–Sun 6pm–2am', phone: '(718) 386-8833', website: 'https://thenarrowsbar.com', mapsUrl: 'https://maps.google.com/?q=The+Narrows+Bushwick+Brooklyn', yelpUrl: 'https://yelp.com/biz/the-narrows-brooklyn', description: 'The Narrows is the cocktail bar Bushwick needed — intimate, inventive, and without a whiff of the neighborhood\'s occasional try-hard quality. The bar program rotates seasonally.', whyWePicked: 'Consistently one of the most interesting cocktail menus in Brooklyn. A true neighborhood gem.', bestFor: 'Seasonal cocktails, mezcal, date night', priceRange: '$$' },
  { id: 'union-pool', name: 'Union Pool', category: 'bars', neighborhood: 'Williamsburg', rating: 4.3, reviewCount: 768, featured: false, tags: ['Outdoor fire pit', 'Live music', 'Iconic'], address: '484 Union Ave, Brooklyn, NY 11211', hours: 'Daily 5pm–4am', phone: '(718) 609-0484', website: 'https://union-pool.com', mapsUrl: 'https://maps.google.com/?q=Union+Pool+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/union-pool-brooklyn', description: 'Union Pool\'s back patio with its fire pit is one of Brooklyn\'s most beloved outdoor bar spaces. The taco truck parked outside is genuinely good, and the rotating live music makes it a Williamsburg institution.', whyWePicked: 'The fire pit patio is one of Brooklyn\'s great outdoor bar experiences. A Williamsburg landmark.', bestFor: 'Fire pit drinks, outdoor hanging, live music nights', priceRange: '$$' },
  { id: 'berry-park', name: 'Berry Park', category: 'bars', neighborhood: 'Williamsburg', rating: 4.3, reviewCount: 654, featured: false, tags: ['Rooftop', 'Beer garden', 'Skyline views'], address: '4 Berry St, Brooklyn, NY 11249', hours: 'Mon–Fri 5pm–2am, Sat–Sun noon–2am', phone: '(718) 782-2829', website: 'https://berryparkbk.com', mapsUrl: 'https://maps.google.com/?q=Berry+Park+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/berry-park-brooklyn-2', description: 'Berry Park occupies a converted warehouse with a rooftop beer garden offering some of the best skyline views in Brooklyn. The beer list leans German and the pretzel situation is exactly what you want with a stein.', whyWePicked: 'The rooftop views of Manhattan are genuinely special. The German beer garden concept is executed better here than almost anywhere.', bestFor: 'Rooftop beers, skyline views, pretzel and wurst', priceRange: '$$' },
  // ── BURGERS ──
  { id: 'emily-brooklyn', name: 'Emily', category: 'burgers', neighborhood: 'Clinton Hill', rating: 4.7, reviewCount: 1024, featured: true, tags: ['Emmy Burger', 'Wood-fired', 'Must-visit'], address: '919 Fulton St, Brooklyn, NY 11238', hours: 'Mon–Thu 5pm–10pm, Fri–Sat 5pm–11pm, Sun 5pm–9pm', phone: '(347) 844-9588', website: 'https://pizzalovesemily.com', mapsUrl: 'https://maps.google.com/?q=Emily+Brooklyn+Clinton+Hill', yelpUrl: 'https://yelp.com/biz/emily-brooklyn-2', description: 'The Emmy Burger has become one of the most talked-about burgers in New York City. Dry-aged beef, caramelized onions, American cheese, and special sauce on a potato bun. They make a limited number each night.', whyWePicked: 'The Emmy Burger is genuinely one of the top five burgers in New York City. Go early — they sell out.', bestFor: 'Emmy Burger, dry-aged beef, date night', priceRange: '$$$' },
  { id: 'the-commodore', name: 'The Commodore', category: 'burgers', neighborhood: 'Williamsburg', rating: 4.4, reviewCount: 687, featured: false, tags: ['Bar burger', 'Late night', 'Smash'], address: '366 Metropolitan Ave, Brooklyn, NY 11211', hours: 'Daily noon–4am', phone: '(718) 218-7632', website: 'https://thecommodorebar.com', mapsUrl: 'https://maps.google.com/?q=The+Commodore+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/the-commodore-brooklyn', description: 'The Commodore is where you go when you want a great burger and you don\'t want to make a thing of it. The double smash burger is messy, juicy, and absolutely delicious. Open until 4am.', whyWePicked: 'Brooklyn\'s best bar burger. The late-night kitchen is a public service.', bestFor: 'Double smash burger, late-night eating, cold beer', priceRange: '$$' },
  { id: 'pies-n-thighs', name: "Pies 'n' Thighs", category: 'burgers', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 812, featured: false, tags: ['Southern', 'Smash burger', 'Brunch too'], address: '166 S 4th St, Brooklyn, NY 11211', hours: 'Mon–Fri 9am–4pm, Sat–Sun 9am–5pm', phone: '(347) 529-6090', website: 'https://piesnthighs.com', mapsUrl: "https://maps.google.com/?q=Pies+n+Thighs+Brooklyn", yelpUrl: "https://yelp.com/biz/pies-n-thighs-brooklyn", description: "The burger at Pies 'n' Thighs is a double smash cooked on a flat-top with pickles, yellow mustard, and American cheese — diner-style but executed with Southern precision.", whyWePicked: 'The smash burger is one of the most underrated in Brooklyn. Consistent and genuinely excellent.', bestFor: 'Smash burger, fried chicken, weekend brunch', priceRange: '$$' },
  { id: 'black-swan', name: 'Black Swan', category: 'burgers', neighborhood: 'Crown Heights', rating: 4.5, reviewCount: 423, featured: false, tags: ['Craft beer', 'Bar burger', 'Neighborhood spot'], address: '1206 Atlantic Ave, Brooklyn, NY 11216', hours: 'Mon–Thu 4pm–midnight, Fri–Sat noon–2am, Sun noon–midnight', phone: '(347) 915-1682', website: 'https://blackswanbk.com', mapsUrl: 'https://maps.google.com/?q=Black+Swan+Crown+Heights+Brooklyn', yelpUrl: 'https://yelp.com/biz/black-swan-brooklyn', description: 'Black Swan is Crown Heights\' best bar. A half-pound patty with sharp cheddar, bacon, and house sauce on a brioche bun. The 30-tap draft system runs deep with local craft beers.', whyWePicked: 'The perfect bar burger — big, flavorful, well-constructed. Paired with the best beer list in Crown Heights.', bestFor: 'Half-pound burger, craft beer, neighborhood hang', priceRange: '$$' },
  { id: 'peter-luger-lunch', name: 'Peter Luger Steak House', category: 'burgers', neighborhood: 'Williamsburg', rating: 4.6, reviewCount: 3241, featured: false, tags: ['Legendary', 'Lunch only', 'Steak house burger'], address: '178 Broadway, Brooklyn, NY 11211', hours: 'Mon–Thu noon–9:45pm, Fri–Sat noon–10:45pm, Sun 1pm–9:45pm', phone: '(718) 387-7400', website: 'https://peterluger.com', mapsUrl: 'https://maps.google.com/?q=Peter+Luger+Steak+House+Brooklyn', yelpUrl: 'https://yelp.com/biz/peter-luger-steak-house-brooklyn', description: 'Peter Luger\'s lunch burger is made from dry-aged beef trimmings — the same beef aging for the legendary porterhouse. Available only at lunch, cash only, served with thick-cut bacon.', whyWePicked: 'The most famous steakhouse in New York does a lunch burger made from dry-aged trimmings. Worth every penny.', bestFor: 'Dry-aged lunch burger, bacon, a taste of old New York', priceRange: '$$$' },
  { id: 'no7-burger', name: 'No. 7 Burger', category: 'burgers', neighborhood: 'Fort Greene', rating: 4.4, reviewCount: 289, featured: false, tags: ['Creative toppings', 'Broccoli burger', 'Inventive'], address: '7 Greene Ave, Brooklyn, NY 11238', hours: 'Tue–Sun 11:30am–9pm', phone: '(718) 522-6370', website: 'https://no7restaurant.com', mapsUrl: 'https://maps.google.com/?q=No7+Burger+Brooklyn', yelpUrl: 'https://yelp.com/biz/no-7-burger-brooklyn', description: 'No. 7 Burger made its name with creative burger combinations — the Broccoli Burger, loaded with roasted broccoli, cheddar, and pickle, has been on New York\'s best burger lists for years.', whyWePicked: 'The most creative burger menu in Brooklyn. The Broccoli Burger should not be as good as it is.', bestFor: 'Broccoli burger, creative combinations, vegetarian options', priceRange: '$$' },
  // ── RAMEN ──
  { id: 'okiboru', name: 'Okiboru', category: 'ramen', neighborhood: 'Williamsburg', rating: 4.7, reviewCount: 389, featured: true, tags: ['House-made noodles', 'Tsukemen', 'Acclaimed'], address: '136 Division Ave, Brooklyn, NY 11211', hours: 'Wed–Mon noon–9pm', phone: '(929) 367-3688', website: 'https://okiboru.com', mapsUrl: 'https://maps.google.com/?q=Okiboru+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/okiboru-brooklyn', description: 'Okiboru is the most technically serious ramen operation in Brooklyn. The noodles are made in-house daily, the broths are multi-day projects, and the tsukemen is among the best in New York City.', whyWePicked: 'The best ramen in Brooklyn. The house-made noodles and tsukemen are exceptional. Expect a wait — it\'s worth it.', bestFor: 'Tsukemen, house-made noodles, classic shoyu', priceRange: '$$' },
  { id: 'chuko-ramen', name: 'Chuko', category: 'ramen', neighborhood: 'Prospect Heights', rating: 4.6, reviewCount: 531, featured: false, tags: ['Creative', 'Vegetarian-friendly', 'Seasonal'], address: '552 Vanderbilt Ave, Brooklyn, NY 11238', hours: 'Tue–Sun noon–10pm', phone: '(718) 576-6701', website: 'https://barchuko.com', mapsUrl: 'https://maps.google.com/?q=Chuko+Ramen+Prospect+Heights+Brooklyn', yelpUrl: 'https://yelp.com/biz/chuko-brooklyn', description: 'Chuko is Prospect Heights\' neighborhood ramen spot. The shoyu broth is clean and complex, and the vegetarian option is genuinely excellent — rare in a ramen context.', whyWePicked: 'The most inventive ramen in Brooklyn. The shoyu is exceptional and the vegetarian option is the best of its kind.', bestFor: 'Shoyu ramen, vegetarian bowl, cocktails', priceRange: '$$' },
  { id: 'ichiran-williamsburg', name: 'Ichiran', category: 'ramen', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 1845, featured: false, tags: ['Solo booth', 'Tonkotsu', 'Japanese chain'], address: '374 Johnson Ave, Brooklyn, NY 11206', hours: 'Daily 24 hours', website: 'https://ichiranusa.com', mapsUrl: 'https://maps.google.com/?q=Ichiran+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/ichiran-brooklyn', description: 'Ichiran\'s concept: order via vending machine, sit in a private solo booth, receive a perfectly calibrated Hakata-style tonkotsu. You specify spice, richness, garlic, noodle firmness. Open 24 hours.', whyWePicked: 'The most distinctive ramen experience in Brooklyn. The solo booth and customizable tonkotsu create something genuinely unique.', bestFor: 'Tonkotsu solo experience, late-night ramen', priceRange: '$$' },
  { id: 'ganso-ramen', name: 'Ganso', category: 'ramen', neighborhood: 'Downtown Brooklyn', rating: 4.5, reviewCount: 672, featured: false, tags: ['Tonkotsu', 'Japanese izakaya', 'Craft beer'], address: '25 Bond St, Brooklyn, NY 11201', hours: 'Mon–Thu noon–10pm, Fri–Sat noon–11pm, Sun noon–10pm', phone: '(718) 403-0900', website: 'https://ganso-nyc.com', mapsUrl: 'https://maps.google.com/?q=Ganso+Ramen+Downtown+Brooklyn', yelpUrl: 'https://yelp.com/biz/ganso-brooklyn', description: 'Ganso is Downtown Brooklyn\'s definitive ramen destination. The tonkotsu is milky, rich, and built on bones simmered for 18 hours. The craft beer list is curated thoughtfully.', whyWePicked: 'The best all-around ramen experience in Downtown Brooklyn. The tonkotsu is exceptional.', bestFor: 'Tonkotsu ramen, spicy miso, robata skewers, craft beer', priceRange: '$$' },
  { id: 'shalom-japan', name: 'Shalom Japan', category: 'ramen', neighborhood: 'South Williamsburg', rating: 4.5, reviewCount: 487, featured: false, tags: ['Japanese-Jewish fusion', 'Matzo ball ramen', 'Creative'], address: '310 S 4th St, Brooklyn, NY 11211', hours: 'Wed–Mon 5:30pm–10pm, Sat–Sun 11am–3pm', phone: '(718) 388-4012', website: 'https://shalomjapannyc.com', mapsUrl: 'https://maps.google.com/?q=Shalom+Japan+Brooklyn', yelpUrl: 'https://yelp.com/biz/shalom-japan-brooklyn', description: 'Shalom Japan is a Japanese-Jewish fusion restaurant that has no right being as good as it is. The matzo ball ramen — a Japanese broth with a matzo ball in place of the noodle — is a cult dish.', whyWePicked: 'The most unique ramen experience in Brooklyn. The matzo ball ramen is a genuine original.', bestFor: 'Matzo ball ramen, fusion specials, weekend brunch ramen', priceRange: '$$$' },
  // ── BRUNCH ──
  { id: 'five-leaves', name: 'Five Leaves', category: 'brunch', neighborhood: 'Greenpoint', rating: 4.6, reviewCount: 892, featured: true, tags: ['Australian', 'Ricotta hotcakes', 'Always a line'], address: '18 Bedford Ave, Brooklyn, NY 11222', hours: 'Daily 8am–midnight', phone: '(718) 383-5345', website: 'https://fiveleavesny.com', mapsUrl: 'https://maps.google.com/?q=Five+Leaves+Greenpoint+Brooklyn', yelpUrl: 'https://yelp.com/biz/five-leaves-brooklyn-2', description: 'Five Leaves is the Brooklyn brunch institution. The Australian-influenced menu produces the ricotta hotcakes with honeycomb butter that are among the most photographed brunches in New York City.', whyWePicked: 'The definitive Brooklyn brunch. The ricotta hotcakes alone justify the wait. A genuinely great Australian café.', bestFor: 'Ricotta hotcakes, grain bowl, excellent coffee', priceRange: '$$' },
  { id: 'sunday-in-brooklyn', name: 'Sunday in Brooklyn', category: 'brunch', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 743, featured: false, tags: ['Malted pancakes', 'Beautiful space', 'Full bar'], address: '348 Wythe Ave, Brooklyn, NY 11249', hours: 'Mon–Fri 9am–4pm, Sat–Sun 9am–5pm', phone: '(347) 222-6722', website: 'https://sundayinbrooklyn.com', mapsUrl: 'https://maps.google.com/?q=Sunday+in+Brooklyn+Williamsburg', yelpUrl: 'https://yelp.com/biz/sunday-in-brooklyn-brooklyn', description: 'The malted pancakes with hazelnut maple syrup and whipped butter are the signature — thick, nutty, and decadent. The beautifully designed space and full bar make it the most complete brunch experience in Williamsburg.', whyWePicked: 'The malted pancakes are the best pancakes in Brooklyn. The standard-setter for Williamsburg brunch.', bestFor: 'Malted pancakes, brunch cocktails, eggs Benedict', priceRange: '$$$' },
  { id: 'egg-restaurant', name: 'Egg', category: 'brunch', neighborhood: 'Williamsburg', rating: 4.5, reviewCount: 921, featured: false, tags: ['Southern breakfast', 'Biscuits', 'Long-running'], address: '109 N 3rd St, Brooklyn, NY 11249', hours: 'Daily 8am–6pm', phone: '(718) 302-5151', website: 'https://eggrestaurant.com', mapsUrl: 'https://maps.google.com/?q=Egg+Restaurant+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/egg-brooklyn', description: 'Egg has been serving the Williamsburg morning crowd since 2003 with an approach so consistent it borders on principled. Southern-influenced American breakfast — biscuits, farm eggs, grits — done with care.', whyWePicked: 'One of Williamsburg\'s original neighborhood restaurants, still going strong after two decades.', bestFor: 'Southern biscuits, farm eggs, grits, classic brunch', priceRange: '$$' },
  { id: 'cafe-mogador-brooklyn', name: 'Café Mogador', category: 'brunch', neighborhood: 'Williamsburg', rating: 4.4, reviewCount: 687, featured: false, tags: ['Moroccan', 'Shakshuka', 'Long-running'], address: '133 Wythe Ave, Brooklyn, NY 11249', hours: 'Daily 9am–midnight', phone: '(718) 486-9800', website: 'https://cafemogador.com', mapsUrl: 'https://maps.google.com/?q=Cafe+Mogador+Williamsburg+Brooklyn', yelpUrl: 'https://yelp.com/biz/cafe-mogador-brooklyn', description: 'Café Mogador brought its beloved Moroccan brunch from the East Village to Williamsburg. The shakshuka is the signature — eggs poached in a spiced tomato-pepper sauce refined over decades.', whyWePicked: 'The best shakshuka in Brooklyn. The Moroccan breakfast plate and fresh mint tea make it the most distinctive brunch in the neighborhood.', bestFor: 'Shakshuka, Moroccan breakfast plate, fresh mint tea', priceRange: '$$' },
  { id: 'mables-smokehouse', name: "Mable's Smokehouse", category: 'brunch', neighborhood: 'Williamsburg', rating: 4.4, reviewCount: 478, featured: false, tags: ['BBQ brunch', 'Biscuits', 'Southern'], address: '44 Berry St, Brooklyn, NY 11249', hours: 'Sat–Sun 11am–4pm', phone: '(718) 218-6655', website: 'https://mablessmokehouse.com', mapsUrl: "https://maps.google.com/?q=Mable's+Smokehouse+Williamsburg+Brooklyn", yelpUrl: "https://yelp.com/biz/mables-smokehouse-brooklyn", description: "Mable's Smokehouse applies real Southern BBQ technique to weekend brunch. The smoked brisket hash, buttermilk biscuits, and pulled pork Benedict are exactly as good as they sound.", whyWePicked: 'The best BBQ brunch in Brooklyn by a wide margin. The brisket hash and pulled pork Benedict are exceptional.', bestFor: 'Brisket hash, pulled pork Benedict, buttermilk biscuits', priceRange: '$$' },
]

const ARTICLES = [
  { id: 'best-coffee-brooklyn', title: 'Best Coffee Shops in Brooklyn (2026)', category: 'coffee', tag: 'COFFEE GUIDE', description: 'From specialty roasters to cozy neighborhood staples — the definitive guide to Brooklyn\'s coffee scene by neighborhood.', content: `Brooklyn's coffee scene has matured from a novelty into one of the best in the country.\n\n**The best overall: Sey Coffee (Bushwick)**\nIf you had to name one Brooklyn coffee shop that represents everything the borough does right, Sey would be it. The in-house roasting operation is meticulous, the space is beautiful, and the baristas treat every cup with the same care.\n\n**Best for the space: Devoción (Williamsburg)**\nDevoción's farm-to-cup Colombian sourcing is remarkable, but the real showstopper is the space — a converted factory with a soaring green wall.\n\n**Best neighborhood café: Café Grumpy (Park Slope)**\nTwenty years in, Café Grumpy is still getting it right. The espresso is consistent and the room fills up with regulars who've been coming for years.`, faqs: [{ q: 'What is the best coffee shop in Brooklyn?', a: 'Sey Coffee in Bushwick is consistently considered the best overall. Devoción in Williamsburg is a close second.' }, { q: 'Where can I find the best espresso in Brooklyn?', a: 'Sey Coffee, Café Grumpy, and Toby\'s Estate all run excellent espresso programs.' }] },
  { id: 'best-burgers-brooklyn', title: 'The 10 Best Burgers in Brooklyn, Ranked', category: 'burgers', tag: 'BURGER GUIDE', description: 'From dry-aged beef masterpieces to perfect late-night smash burgers — every great burger in Brooklyn, ranked and reviewed.', content: `Brooklyn takes its burgers seriously.\n\n**1. The Emmy Burger at Emily (Clinton Hill)**\nThe Emmy Burger is genuinely one of the five best burgers in New York City. Dry-aged beef, perfectly caramelized onions, American cheese, and a special sauce. They make a limited number each service.\n\n**2. The Double at The Commodore (Williamsburg)**\nThe double smash burger is messy, juicy, and exactly what you want at 1am. Open until 4am.\n\n**3. Lunch Burger at Peter Luger (Williamsburg)**\nOne of New York's greatest insider secrets: Peter Luger serves a lunch burger made from dry-aged beef trimmings.`, faqs: [{ q: 'What is the best burger in Brooklyn?', a: 'The Emmy Burger at Emily in Clinton Hill is widely considered the best burger in Brooklyn.' }, { q: 'Where can I get a great late-night burger?', a: 'The Commodore in Williamsburg is open until 4am and serves one of Brooklyn\'s best bar burgers.' }] },
  { id: 'best-bars-brooklyn', title: 'Best Bars in Brooklyn by Neighborhood (2026)', category: 'bars', tag: 'BAR GUIDE', description: 'Dive bars, cocktail dens, beer gardens, and rooftop views — the complete guide to Brooklyn\'s bar scene.', content: `Brooklyn's bar scene is one of the most varied in New York City.\n\n**Williamsburg**\nMaison Premiere is the crown jewel — a New Orleans-inspired oyster and absinthe bar. Hotel Delmano is the most atmospheric for a classic cocktail evening.\n\n**Red Hook**\nSunny's Bar is Brooklyn history. A century-old longshoreman's bar with legendary Saturday bluegrass nights.\n\n**Gowanus**\nThrees Brewing is the neighborhood anchor — a massive taproom with an excellent rotating beer list.`, faqs: [{ q: 'What is the best bar in Brooklyn?', a: 'Maison Premiere in Williamsburg is often cited as one of the best bars in America.' }, { q: 'What\'s the best dive bar in Brooklyn?', a: "Sunny's Bar in Red Hook is Brooklyn's most beloved dive bar." }] },
  { id: 'best-bakeries-brooklyn', title: 'Hidden Bakery Gems in Brooklyn Worth Seeking Out', category: 'bakeries', tag: 'BAKERY GUIDE', description: 'The best bread, pastries, and baked goods in Brooklyn.', content: `Brooklyn's bakery scene has reached extraordinary levels.\n\n**The bread benchmark: Bien Cuit (Cobble Hill)**\nBien Cuit is the standard against which Brooklyn bread is measured. The country loaves are the result of a multi-day process.\n\n**The pie destination: Four & Twenty Blackbirds (Gowanus)**\nThe most celebrated pie shop in America. The Salted Caramel Apple is a year-round benchmark.\n\n**Old-school: Peter Pan Donuts (Greenpoint)**\nOpen since 1953, cash only. The crullers are exceptional.`, faqs: [{ q: 'What is the best bakery in Brooklyn?', a: 'Bien Cuit in Cobble Hill is widely considered the best bakery in Brooklyn for bread and pastry quality.' }, { q: 'What is the best brownie in Brooklyn?', a: "Baked in Red Hook makes Brooklyn's most famous brownie — the Sweet and Salty." }] },
  { id: 'best-brunch-brooklyn', title: 'Best Brunch Spots in Brooklyn (2026)', category: 'brunch', tag: 'BRUNCH GUIDE', description: 'From ricotta hotcakes in Greenpoint to shakshuka in Williamsburg — the complete guide to Brooklyn\'s best weekend brunch.', content: `Brooklyn does brunch better than most places in the world.\n\n**The benchmark: Five Leaves (Greenpoint)**\nThe ricotta hotcakes with honeycomb butter are among the most celebrated breakfast dishes in New York City.\n\n**Best pancakes: Sunday in Brooklyn (Williamsburg)**\nThe malted pancakes with hazelnut maple syrup are the best pancakes in Brooklyn.\n\n**Best shakshuka: Café Mogador (Williamsburg)**\nThe shakshuka at Café Mogador has been refined over decades.`, faqs: [{ q: 'What is the best brunch in Brooklyn?', a: 'Five Leaves in Greenpoint is consistently considered the best brunch in Brooklyn.' }, { q: 'What is the best shakshuka in Brooklyn?', a: 'Café Mogador in Williamsburg has the best shakshuka in Brooklyn.' }] },
  { id: 'best-ramen-brooklyn', title: 'Best Ramen in Brooklyn by Neighborhood', category: 'ramen', tag: 'RAMEN GUIDE', description: 'From Downtown Brooklyn tonkotsu to Williamsburg tsukemen — the definitive guide to every great ramen bowl in Brooklyn.', content: `Brooklyn's ramen scene has developed into something genuinely interesting.\n\n**The best overall: Okiboru (Williamsburg)**\nOkiboru makes the most technically serious ramen in Brooklyn. The noodles are made in-house daily and the tsukemen is extraordinary.\n\n**Best experience: Ichiran (Williamsburg)**\nThe solo booth concept, 24-hour operation, and customizable tonkotsu make Ichiran the most distinctive ramen experience in Brooklyn.\n\n**Most creative: Shalom Japan (South Williamsburg)**\nThe matzo ball ramen is a genuine original.`, faqs: [{ q: 'What is the best ramen in Brooklyn?', a: 'Okiboru in Williamsburg is the most technically accomplished ramen in Brooklyn.' }, { q: 'Where can I get 24-hour ramen in Brooklyn?', a: 'Ichiran in Williamsburg is open 24 hours.' }] },
  { id: 'williamsburg-food-guide', title: 'The Complete Williamsburg Food & Drink Guide (2026)', category: 'coffee', tag: 'NEIGHBORHOOD', description: 'Everything worth eating and drinking in Williamsburg.', content: `Williamsburg has more great food and drink per square mile than almost anywhere in New York City.\n\n**Coffee**\nDevoción for the most beautiful space. Oslo Coffee for original light roasts. Toby's Estate for the best flat white. Sweatshop for the laundromat café experience.\n\n**Bars**\nMaison Premiere is the destination. Hotel Delmano for the most atmospheric cocktails. Union Pool for the fire pit patio.\n\n**Brunch**\nSunday in Brooklyn for the malted pancakes. Egg for Southern breakfast done right. Café Mogador for the best shakshuka.`, faqs: [{ q: 'What is Williamsburg known for food?', a: 'Williamsburg is known for its exceptional coffee scene, craft cocktail bars, and diverse dining.' }] },
  { id: 'brooklyn-date-night', title: 'Best Date Night Spots in Brooklyn (2026)', category: 'bars', tag: 'DATE NIGHT', description: 'The most romantic and impressive spots in Brooklyn for a date.', content: `Brooklyn has become one of the best cities in the world for a date night.\n\n**For drinks: Maison Premiere (Williamsburg)**\nThe garden at Maison Premiere on a warm evening is one of the most romantic spots in New York City.\n\n**For atmosphere: Hotel Delmano (Williamsburg)**\nBelle Époque mirrors, candlelight, marble counters, and cocktails that match the setting.\n\n**For cocktails: Clover Club (Carroll Gardens)**\nHistorically-informed cocktails in a beautiful room on Smith Street.`, faqs: [{ q: 'What is the best date night bar in Brooklyn?', a: 'Maison Premiere in Williamsburg is the most romantic bar in Brooklyn.' }] },
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

const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page

const s = {
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '0 32px' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `0.5px solid ${T.border}` },
  wordmark: { fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  wordmarkDot: { width: 8, height: 8, borderRadius: '50%', background: T.coral, flexShrink: 0 },
  navLinks: { display: 'flex', gap: 20, alignItems: 'center' },
  navLink: { fontSize: 13, color: T.textMid, cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontFamily: "'DM Sans', sans-serif" },
  footer: { borderTop: `0.5px solid ${T.border}`, padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  footerLinks: { display: 'flex', gap: 20 },
  footerLink: { fontSize: 12, color: T.textMuted, cursor: 'pointer', textDecoration: 'none' },
  breadcrumb: { fontSize: 12, color: T.textMid, padding: '14px 0', display: 'flex', gap: 6, alignItems: 'center', borderBottom: `0.5px solid ${T.border}`, flexWrap: 'wrap' },
  bcLink: { cursor: 'pointer', color: T.textMid },
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
  return <span style={{ color: '#BA7517', fontSize: 12, marginRight: 3 }}>{'★'.repeat(Math.round(rating))}</span>
}

// ─── EVENTBRITE EVENTS WIDGET (Homepage Strip) ────────────────────────────────
function EventsWidget({ navigate }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events?category=all&page_size=6')
      .then(r => r.json())
      .then(data => { if (data.events) setEvents(data.events.slice(0, 6)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const fmtDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  if (loading || events.length === 0) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={s.sectionLabel}>Upcoming in Brooklyn</div>
        <button onClick={() => navigate('events')} style={{ fontSize: 12, color: T.coral, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
          See all events →
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {events.map((ev, i) => {
          const pill = EVENT_PILL_COLORS[i % EVENT_PILL_COLORS.length]
          const venue = ev.venue?.name || 'Brooklyn'
          const catName = ev.category?.name || 'Event'
          return (
            <a key={ev.id} href={ev.url} target="_blank" rel="noopener noreferrer"
              style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 16, background: T.bg, textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.coral}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: pill.bg, color: pill.color, border: `1px solid ${pill.border}`, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {catName}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.35, marginBottom: 6 }}>
                {(ev.name?.text || '').slice(0, 55)}{(ev.name?.text || '').length > 55 ? '…' : ''}
              </div>
              <div style={{ fontSize: 11, color: T.textMid, marginBottom: 4 }}>📅 {fmtDate(ev.start?.local)}</div>
              <div style={{ fontSize: 11, color: T.textMuted }}>📍 {venue.slice(0, 30)}{venue.length > 30 ? '…' : ''}</div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

// ─── EVENTS PAGE ─────────────────────────────────────────────────────────────
function EventsPage({ navigate }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCat, setActiveCat] = useState('all')

  const EB_CATS = { all: 'All Events', '103': '🎵 Music', '110': '🍕 Food & Drink', '113': '🤝 Community', '105': '🎭 Performing Arts', '116': '⚽ Sports & Fitness' }

  useEffect(() => {
    setLoading(true)
    fetch(`/api/events?category=${activeCat}`)
      .then(r => r.json())
      .then(data => { if (data.events) setEvents(data.events); else setError(true); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [activeCat])

  const fmtDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}>
        <span style={s.bcLink} onClick={() => navigate('home')}>Home</span>
        <span>›</span>
        <span style={{ color: T.text }}>Events</span>
      </div>
      <div style={{ padding: '18px 0 0' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, marginBottom: 4, color: T.text }}>
          🎟️ Upcoming Events in <span style={{ color: T.coral }}>Brooklyn</span>
        </h1>
        <div style={s.colorBar} />
        <p style={{ fontSize: 13, color: T.textMid, marginBottom: 18 }}>Live events, concerts, and experiences happening near you — powered by Eventbrite.</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22, paddingBottom: 16, borderBottom: `0.5px solid ${T.border}` }}>
        {Object.entries(EB_CATS).map(([id, label]) => (
          <button key={id} onClick={() => setActiveCat(id)}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeCat === id ? T.navy : T.border}`, background: activeCat === id ? T.navy : T.bg, cursor: 'pointer', color: activeCat === id ? T.navyText : T.textMid, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            {label}
          </button>
        ))}
      </div>
      <AdBanner slot="events-page-top" />
      {loading && <div style={{ textAlign: 'center', padding: '48px 20px', color: T.textMuted, fontSize: 14 }}>Loading Brooklyn events…</div>}
      {error && !loading && <div style={{ textAlign: 'center', padding: '48px 20px', color: T.textMuted, fontSize: 14 }}>Couldn't load events right now. Check back soon.</div>}
      {!loading && !error && events.length === 0 && <div style={{ textAlign: 'center', padding: '48px 20px', color: T.textMuted, fontSize: 14 }}>No upcoming events found in this category.</div>}
      {!loading && events.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {events.map((ev, i) => {
            const pill = EVENT_PILL_COLORS[i % EVENT_PILL_COLORS.length]
            const venue = ev.venue?.name || 'Brooklyn'
            const catName = ev.category?.name || 'Event'
            return (
              <a key={ev.id} href={ev.url} target="_blank" rel="noopener noreferrer sponsored"
                style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 18, background: T.bg, textDecoration: 'none', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.coral}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: pill.bg, color: pill.color, border: `1px solid ${pill.border}`, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{catName}</div>
                  {ev.is_free && <div style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#F0FBF7', color: '#085041', border: '1px solid #9FE1CB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Free</div>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.35, marginBottom: 8 }}>
                  {(ev.name?.text || '').slice(0, 65)}{(ev.name?.text || '').length > 65 ? '…' : ''}
                </div>
                <div style={{ fontSize: 12, color: T.textMid, marginBottom: 4 }}>📅 {fmtDate(ev.start?.local)}</div>
                <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 12 }}>📍 {venue.slice(0, 35)}{venue.length > 35 ? '…' : ''}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.coral }}>Get tickets →</div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── DISCOVER WIDGET ─────────────────────────────────────────────────────────
function DiscoverWidget({ navigate }) {
  const [tab, setTab] = useState('quick')
  const [selCat, setSelCat] = useState('any')
  const [quickHood, setQuickHood] = useState('any')
  const [dayHood, setDayHood] = useState('any')
  const [dayTime, setDayTime] = useState('fullday')
  const [quickResult, setQuickResult] = useState(null)
  const [dayPlan, setDayPlan] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const rand = arr => arr[Math.floor(Math.random() * arr.length)]
  const hoods = ['any', 'Williamsburg', 'Park Slope', 'Bushwick', 'Crown Heights', 'DUMBO', 'Red Hook', 'Gowanus', 'Clinton Hill', 'Fort Greene', 'Greenpoint', 'Carroll Gardens', 'Cobble Hill', 'Prospect Heights', 'Downtown Brooklyn']
  const handleQuickPick = () => {
    let pool = LISTINGS
    if (selCat !== 'any') pool = pool.filter(l => l.category === selCat)
    if (quickHood !== 'any') pool = pool.filter(l => l.neighborhood === quickHood)
    if (!pool.length) { setQuickResult('empty'); return }
    setAnimKey(k => k + 1); setQuickResult(rand(pool))
  }
  const handlePlanDay = () => {
    const getFrom = (cats, hoodPref) => {
      let pool = LISTINGS.filter(l => cats.includes(l.category))
      if (hoodPref !== 'any') { const local = pool.filter(l => l.neighborhood === hoodPref); if (local.length) pool = local }
      return rand(pool)
    }
    const slots = { morning: [{ label: 'Start here', cats: ['coffee', 'bakeries'] }], afternoon: [{ label: 'Grab a bite', cats: ['burgers', 'ramen'] }], evening: [{ label: 'Wind down', cats: ['bars', 'brunch'] }], fullday: [{ label: 'Start here', cats: ['coffee', 'bakeries'] }, { label: 'Grab a bite', cats: ['burgers', 'ramen'] }, { label: 'Wind down', cats: ['bars', 'brunch'] }] }
    const plan = (slots[dayTime] || slots.fullday).map((slot, i) => ({ time: ['Morning', 'Afternoon', 'Evening'][i] || slot.label, label: slot.label, listing: getFrom(slot.cats, dayHood) }))
    setAnimKey(k => k + 1); setDayPlan(plan)
  }
  const CAT_LABELS = { any: 'Any', coffee: 'Coffee', bakeries: 'Bakeries', bars: 'Bars', burgers: 'Burgers', ramen: 'Ramen', brunch: 'Brunch' }
  const pillStyle = (key) => {
    const isActive = selCat === key; const catColor = CAT[key]
    if (!isActive) return { padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${T.border}`, background: T.bg, color: T.textMid, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }
    if (catColor) return { padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${catColor.border}`, background: catColor.bg, color: catColor.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }
    return { padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${T.navy}`, background: T.navy, color: T.navyText, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }
  }
  const timeBtnStyle = (key) => ({ flex: 1, padding: '9px 8px', borderRadius: 8, border: `1.5px solid ${dayTime === key ? T.navy : T.border}`, background: dayTime === key ? T.navy : T.bg, color: dayTime === key ? T.navyText : T.textMid, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" })
  const selectStyle = { flex: 1, padding: '9px 12px', border: `0.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, color: T.text, fontFamily: "'DM Sans', sans-serif" }
  const ResultCard = ({ listing, stopMeta }) => {
    const cat = CAT[listing.category] || {}
    return (
      <div key={listing.id} style={{ border: `1.5px solid ${listing.featured ? T.coral : T.border}`, borderRadius: 12, padding: 16, background: listing.featured ? '#FFFAF9' : T.bg, marginBottom: 10 }}>
        {stopMeta && (<div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 10, borderBottom: `0.5px solid ${T.border}` }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMuted }}>{stopMeta.time}</span><div style={{ width: 3, height: 3, borderRadius: '50%', background: T.border }} /><span style={{ fontSize: 11, color: T.textMuted }}>{stopMeta.label}</span></div>)}
        {listing.featured && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, background: T.coralLight, color: '#993C1D', padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: T.coral }} />Featured</div>)}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 500, color: T.text, lineHeight: 1.25 }}>{listing.name}</div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'capitalize' }}>{cat.icon} {listing.category}</span>
        </div>
        <div style={{ fontSize: 12, color: T.textMid, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ color: '#BA7517' }}>{'★'.repeat(Math.round(listing.rating))}</span><span>{listing.rating}</span><span style={{ opacity: 0.4 }}>·</span><span>{listing.neighborhood}, Brooklyn</span></div>
        <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65, marginBottom: 14 }}>{listing.description.slice(0, 160)}…</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={listing.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: T.coral, color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Get directions</a>
          <button onClick={() => navigate(`listing/${listing.id}`)} style={{ padding: '8px 14px', background: T.bg, color: T.text, border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>View spot →</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 22, background: T.bgSoft, margin: '0 0 32px', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 500, color: T.text, marginBottom: 3 }}>Find your next spot</div>
        <div style={{ fontSize: 13, color: T.textMid }}>Quick pick a spot or plan a full Brooklyn day.</div>
      </div>
      <div style={{ display: 'flex', border: `1.5px solid ${T.border}`, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
        {['quick', 'day'].map((t, i) => (<button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '9px 16px', fontSize: 13, fontWeight: 500, background: tab === t ? T.navy : T.bg, color: tab === t ? T.navyText : T.textMid, border: 'none', borderRight: i === 0 ? `1px solid ${T.border}` : 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{t === 'quick' ? 'Quick pick' : 'Plan my day'}</button>))}
      </div>
      {tab === 'quick' && (<div><div style={s.sectionLabel}>Category</div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>{Object.keys(CAT_LABELS).map(key => (<button key={key} onClick={() => setSelCat(key)} style={pillStyle(key)}>{key !== 'any' && CAT[key] ? `${CAT[key].icon} ` : ''}{CAT_LABELS[key]}</button>))}</div><div style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'center' }}><select value={quickHood} onChange={e => setQuickHood(e.target.value)} style={selectStyle}>{hoods.map(h => <option key={h} value={h}>{h === 'any' ? 'Any neighborhood' : h}</option>)}</select><button onClick={handleQuickPick} style={{ padding: '10px 20px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>Find a spot</button></div>{quickResult && quickResult !== 'empty' && (<div key={animKey} style={{ marginTop: 18 }}><ResultCard listing={quickResult} /><button onClick={handleQuickPick} style={{ width: '100%', padding: '9px', background: 'transparent', border: `0.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textMid, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Try another spot →</button></div>)}{quickResult === 'empty' && (<div style={{ marginTop: 16, padding: 20, border: `0.5px dashed ${T.border}`, borderRadius: 10, textAlign: 'center', fontSize: 13, color: T.textMuted }}>No spots found for that combo — try a different neighborhood or category.</div>)}</div>)}
      {tab === 'day' && (<div><div style={s.sectionLabel}>When are you going?</div><div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>{[['fullday', 'Full day'], ['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']].map(([key, label]) => (<button key={key} onClick={() => setDayTime(key)} style={timeBtnStyle(key)}>{label}</button>))}</div><div style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'center' }}><select value={dayHood} onChange={e => setDayHood(e.target.value)} style={selectStyle}>{hoods.map(h => <option key={h} value={h}>{h === 'any' ? 'Any neighborhood' : h}</option>)}</select><button onClick={handlePlanDay} style={{ padding: '10px 20px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>Plan it</button></div>{dayPlan && (<div key={animKey} style={{ marginTop: 18 }}>{dayPlan.map((stop, i) => (<ResultCard key={i} listing={stop.listing} stopMeta={{ time: stop.time, label: stop.label }} />))}<button onClick={handlePlanDay} style={{ width: '100%', padding: '9px', background: 'transparent', border: `0.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textMid, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Remix this day →</button></div>)}</div>)}
    </div>
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
    { label: 'Best brunch spots →', color: GUIDE_COLORS[3], id: 'best-brunch-brooklyn' },
    { label: 'Best ramen in Brooklyn →', color: GUIDE_COLORS[4], id: 'best-ramen-brooklyn' },
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
          The best local spots,<br /><em style={{ fontStyle: 'normal', color: T.coral }}>handpicked</em> by neighborhood.
        </h1>
        <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>No ads. No fake reviews. Real places curated by category — with directions straight to Google Maps.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {boroughs.map(b => (<button key={b} onClick={() => setActiveBorough(b)} style={{ padding: '8px 18px', borderRadius: 20, border: `1.5px solid ${activeBorough === b ? T.navy : T.border}`, background: activeBorough === b ? T.navy : T.bg, fontSize: 13, color: activeBorough === b ? T.navyText : T.textMid, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{b}</button>))}
        </div>
      </div>
      <DiscoverWidget navigate={navigate} />
      <EventsWidget navigate={navigate} />
      <AdBanner slot="homepage-top" />
      <div style={s.sectionLabel}>Choose a category</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 32 }}>
        {Object.entries(CAT).map(([key, cat]) => (
          <div key={key} onClick={() => navigate(`brooklyn/${key}`)} style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: '22px 18px', cursor: 'pointer', position: 'relative' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.96)'} onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
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
          <div key={hood.name} style={{ background: HOOD_COLORS[i].bg, border: `1.5px solid ${HOOD_COLORS[i].border}`, borderRadius: 8, padding: '14px 16px', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'} onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{hood.name}</div>
            <div style={{ fontSize: 11, color: T.textMid }}>{hoodSpotCounts[hood.name] || 0} spots</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `0.5px solid ${T.border}`, paddingTop: 20, paddingBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {guideLinks.map((g, i) => (<div key={i} onClick={() => navigate(`guides/${g.id}`)} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 20, cursor: 'pointer', fontWeight: 500, background: g.color.bg, color: g.color.color, border: `1.5px solid ${g.color.border}` }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'} onMouseLeave={e => e.currentTarget.style.filter = 'none'}>{g.label}</div>))}
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
      <div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={s.bcLink}>Brooklyn</span><span>›</span><span style={{ color: T.text }}>{catName}</span></div>
      <div style={{ padding: '18px 0 0' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, marginBottom: 4, color: T.text }}>{cat.icon} {catName} in <span style={{ color: T.coral }}>Brooklyn</span></h1>
        <div style={s.colorBar} />
        <p style={{ fontSize: 13, color: T.textMid, marginBottom: 18 }}>{filtered.length} curated spots · Updated April 2026</p>
      </div>
      <AdBanner slot={`category-${category}-top`} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22, paddingBottom: 16, borderBottom: `0.5px solid ${T.border}` }}>
        {hoods.map(h => (<button key={h} onClick={() => setActiveHood(h)} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeHood === h ? T.navy : T.border}`, background: activeHood === h ? T.navy : T.bg, cursor: 'pointer', color: activeHood === h ? T.navyText : T.textMid, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{h}</button>))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
        {filtered.sort((a,b) => b.featured - a.featured).map(listing => (
          <div key={listing.id} onClick={() => navigate(`listing/${listing.id}`)} style={{ border: `1.5px solid ${listing.featured ? T.coral : T.border}`, borderRadius: 12, padding: 18, cursor: 'pointer', background: listing.featured ? '#FFFAF9' : T.bg }} onMouseEnter={e => e.currentTarget.style.borderColor = listing.featured ? T.coral : T.borderMid} onMouseLeave={e => e.currentTarget.style.borderColor = listing.featured ? T.coral : T.border}>
            {listing.featured && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, background: T.coralLight, color: '#993C1D', padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: T.coral }} />Featured</div>)}
            <div style={{ fontSize: 15, fontWeight: 500, color: T.text, marginBottom: 3 }}>{listing.name}</div>
            <div style={{ fontSize: 12, color: T.textMid, marginBottom: 10 }}>{listing.neighborhood}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>{listing.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}</div>
            <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}><StarRating rating={listing.rating} />{listing.rating} <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 400 }}>· {listing.reviewCount.toLocaleString()} reviews</span></div>
          </div>
        ))}
      </div>
      {relatedArticle && (<div style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: 20, marginBottom: 24, cursor: 'pointer' }} onClick={() => navigate(`guides/${relatedArticle.id}`)}><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: cat.count, fontWeight: 600, marginBottom: 6 }}>Related guide</div><div style={{ fontSize: 14, fontWeight: 500, color: cat.text }}>{relatedArticle.title} →</div></div>)}
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
      <div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={s.bcLink} onClick={() => navigate(`brooklyn/${listing.category}`)}>Brooklyn · {catName}</span><span>›</span><span style={{ color: T.text }}>{listing.name}</span></div>
      <div style={{ padding: '18px 0 22px', borderBottom: `0.5px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {listing.featured && (<div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, background: T.coralLight, color: '#993C1D', padding: '3px 9px', borderRadius: 4, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: T.coral }} />Featured spot</div>)}
          <span style={{ fontSize: 12, color: T.textMid }}>{cat.icon} {catName} · {listing.neighborhood}, Brooklyn</span>
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 30, fontWeight: 500, letterSpacing: -0.4, marginBottom: 5, color: T.text }}>{listing.name}</h1>
        <p style={{ fontSize: 13, color: T.textMid, marginBottom: 16 }}><StarRating rating={listing.rating} />{listing.rating} stars · {listing.reviewCount.toLocaleString()} reviews · {listing.priceRange}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={listing.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Open in Google Maps</a>
          {listing.yelpUrl && (<a href={listing.yelpUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: T.bg, color: T.text, border: `1.5px solid ${T.borderMid}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>View on Yelp</a>)}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, paddingTop: 22 }}>
        <div>
          <AdBanner slot={`listing-${listing.id}-top`} />
          <div style={{ marginBottom: 22 }}><div style={s.sectionLabel}>About this spot</div><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>{listing.description}</p></div>
          <div style={{ background: '#FFF8F0', border: `1.5px solid #F5D5A8`, borderRadius: 12, padding: 16, marginBottom: 22 }}><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B4A00', fontWeight: 600, marginBottom: 6 }}>Why we picked it</div><p style={{ fontSize: 13, color: '#5A3000', lineHeight: 1.65 }}>{listing.whyWePicked}</p></div>
          <div style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 12, padding: 16, marginBottom: 22 }}><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: cat.count, fontWeight: 600, marginBottom: 6 }}>Best for</div><p style={{ fontSize: 13, color: cat.text, lineHeight: 1.65 }}>{listing.bestFor}</p></div>
          {relatedArticle && (<div style={{ marginBottom: 22, padding: 16, border: `0.5px solid ${T.border}`, borderRadius: 12, cursor: 'pointer' }} onClick={() => navigate(`guides/${relatedArticle.id}`)}><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.textMuted, fontWeight: 600, marginBottom: 6 }}>Read the guide</div><div style={{ fontSize: 13, fontWeight: 500, color: T.coral }}>{relatedArticle.title} →</div></div>)}
          <div style={{ marginBottom: 22 }}><div style={s.sectionLabel}>More spots in this category</div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>{nearby.map(n => (<div key={n.id} onClick={() => navigate(`listing/${n.id}`)} style={{ border: `1.5px solid ${T.border}`, borderRadius: 8, padding: 12, cursor: 'pointer', background: T.bg }} onMouseEnter={e => e.currentTarget.style.borderColor = T.coral} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}><div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{n.name}</div><div style={{ fontSize: 11, color: T.textMid }}>{n.neighborhood}</div></div>))}</div></div>
        </div>
        <div>
          <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 18, background: T.bg, marginBottom: 12 }}>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 14 }}>Spot info</div>
            {[['Neighborhood', listing.neighborhood], ['Category', catName], ['Rating', `★ ${listing.rating} · ${listing.reviewCount.toLocaleString()} reviews`], ['Hours', listing.hours], ['Address', listing.address], ['Best for', listing.bestFor], ['Price range', listing.priceRange], listing.phone ? ['Phone', listing.phone] : null].filter(Boolean).map(([label, val]) => (<div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: `0.5px solid ${T.border}` }}><span style={{ color: T.textMid }}>{label}</span><span style={{ color: T.text, fontWeight: 500, textAlign: 'right', maxWidth: 200, fontSize: 12 }}>{val}</span></div>))}
          </div>
          {listing.website && (<a href={listing.website} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textAlign: 'center', padding: '10px', background: T.bgSoft, border: `0.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textMid, textDecoration: 'none', marginBottom: 8 }}>Visit website →</a>)}
          <div style={{ background: T.bgSoft, border: `0.5px dashed ${T.border}`, borderRadius: 8, padding: '14px', textAlign: 'center', fontSize: 11, color: T.textMuted }}>Map preview · Google Maps embed goes here</div>
        </div>
      </div>
    </div>
  )
}

// ─── GUIDES PAGE ──────────────────────────────────────────────────────────────
function GuidesPage({ navigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={{ color: T.text }}>Guides</span></div>
      <div style={{ padding: '18px 0 24px' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>Brooklyn Food & Drink Guides</h1>
        <div style={s.colorBar} />
        <p style={{ fontSize: 14, color: T.textMid, marginBottom: 24 }}>{ARTICLES.length} guides · Updated April 2026</p>
      </div>
      <AdBanner slot="guides-index-top" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ARTICLES.map((article, i) => {
          const color = GUIDE_COLORS[i % GUIDE_COLORS.length]
          return (<div key={article.id} onClick={() => navigate(`guides/${article.id}`)} style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, padding: 18, cursor: 'pointer', background: T.bg }} onMouseEnter={e => e.currentTarget.style.borderColor = T.coral} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}><div style={{ display: 'inline-block', fontSize: 10, background: color.bg, color: color.color, padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', border: `1px solid ${color.border}` }}>{article.tag}</div><div style={{ fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.4, marginBottom: 8 }}>{article.title}</div><div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>{article.description}</div></div>)
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
  const renderContent = (text) => text.split('\n\n').map((para, i) => {
    if (para.startsWith('**')) {
      const [bold, ...rest] = para.split('\n')
      return (<div key={i} style={{ marginBottom: 20 }}><div style={{ fontWeight: 600, color: T.text, fontSize: 15, marginBottom: 6 }}>{bold.replace(/\*\*/g, '')}</div>{rest.map((line, j) => <p key={j} style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 8 }}>{line}</p>)}</div>)
    }
    return <p key={i} style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>{para}</p>
  })
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={s.bcLink} onClick={() => navigate('guides')}>Guides</span><span>›</span><span style={{ color: T.text }}>{article.title}</span></div>
      <div style={{ padding: '18px 0 24px', borderBottom: `0.5px solid ${T.border}` }}>
        <div style={{ display: 'inline-block', fontSize: 10, background: cat.bg, color: cat.count, padding: '3px 9px', borderRadius: 4, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase', border: `1px solid ${cat.border}` }}>{article.tag}</div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 8, lineHeight: 1.25 }}>{article.title}</h1>
        <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.55 }}>{article.description}</p>
      </div>
      <AdBanner slot={`article-${article.id}-top`} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, paddingTop: 24 }}>
        <div>
          {renderContent(article.content)}
          {article.faqs && (<div style={{ marginTop: 32 }}><div style={{ ...s.sectionLabel, marginTop: 0 }}>Frequently asked questions</div>{article.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `0.5px solid ${T.border}`, padding: '16px 0' }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 8 }}>{faq.q}</div><div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65 }}>{faq.a}</div></div>))}</div>)}
          <AdBanner slot={`article-${article.id}-bottom`} />
        </div>
        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 12 }}>Spots in this guide</div>
            {relatedListings.map(listing => (<div key={listing.id} onClick={() => navigate(`listing/${listing.id}`)} style={{ padding: '12px 0', borderBottom: `0.5px solid ${T.border}`, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}><div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{listing.name}</div><div style={{ fontSize: 11, color: T.textMid }}>{listing.neighborhood}</div></div>))}
            <div onClick={() => navigate(`brooklyn/${article.category}`)} style={{ fontSize: 12, color: T.coral, paddingTop: 12, cursor: 'pointer', fontWeight: 500 }}>See all {article.category} spots →</div>
          </div>
          <div>
            <div style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 12 }}>More guides</div>
            {relatedArticles.map(a => (<div key={a.id} onClick={() => navigate(`guides/${a.id}`)} style={{ padding: '12px 0', borderBottom: `0.5px solid ${T.border}`, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}><div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.textMuted, fontWeight: 500, marginBottom: 4 }}>{a.tag}</div><div style={{ fontSize: 13, fontWeight: 500, color: T.text, lineHeight: 1.4 }}>{a.title}</div></div>))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── STATIC PAGES ─────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (<div style={{ fontFamily: "'DM Sans', sans-serif" }}><div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={{ color: T.text }}>About</span></div><div style={{ maxWidth: 560, paddingTop: 24 }}><h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>About BestSpotsNearMe</h1><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>BestSpotsNearMe is a curated directory of the best local spots in Brooklyn and New York City. Every listing is handpicked — we don't accept user submissions or unverified entries.</p><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>Our goal is simple: help you find genuinely great spots in your neighborhood without wading through fake reviews, sponsored results, or algorithmic noise.</p><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Have a spot we should know about? <span style={{ color: T.coral, cursor: 'pointer' }} onClick={() => navigate('contact')}>Drop us a line.</span></p></div></div>)
}

function PrivacyPage({ navigate }) {
  return (<div style={{ fontFamily: "'DM Sans', sans-serif" }}><div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={{ color: T.text }}>Privacy Policy</span></div><div style={{ maxWidth: 560, paddingTop: 24 }}><h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Privacy Policy</h1><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>BestSpotsNearMe does not collect personal data beyond standard server logs and analytics. We do not sell your data.</p><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Last updated: April 2026.</p></div></div>)
}

function AffiliateDisclosurePage({ navigate }) {
  return (<div style={{ fontFamily: "'DM Sans', sans-serif" }}><div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={{ color: T.text }}>Affiliate Disclosure</span></div><div style={{ maxWidth: 560, paddingTop: 24 }}><h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Affiliate Disclosure</h1><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 12 }}>Some links on BestSpotsNearMe may be affiliate links. If you make a purchase through these links, we may earn a small commission at no additional cost to you.</p><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Last updated: April 2026.</p></div></div>)
}

function ContactPage({ navigate }) {
  return (<div style={{ fontFamily: "'DM Sans', sans-serif" }}><div style={s.breadcrumb}><span style={s.bcLink} onClick={() => navigate('home')}>Home</span><span>›</span><span style={{ color: T.text }}>Contact</span></div><div style={{ maxWidth: 480, paddingTop: 24 }}><h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.3, color: T.text, marginBottom: 16 }}>Contact</h1><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75, marginBottom: 24 }}>Have a spot we should add? Interested in a featured placement?</p><p style={{ fontSize: 14, color: T.text, lineHeight: 1.75 }}>Email us at: <a href="mailto:hello@bestspotsnearme.com" style={{ color: T.coral }}>hello@bestspotsnearme.com</a></p></div></div>)
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
    const titles = { home: 'BestSpotsNearMe — Handpicked Local Spots in Brooklyn & NYC', guides: 'Brooklyn Food & Drink Guides — BestSpotsNearMe', events: 'Upcoming Events in Brooklyn — BestSpotsNearMe', about: 'About — BestSpotsNearMe', contact: 'Contact — BestSpotsNearMe', privacy: 'Privacy Policy — BestSpotsNearMe', 'affiliate-disclosure': 'Affiliate Disclosure — BestSpotsNearMe' }
    if (page.startsWith('brooklyn/')) { const cat = page.split('/')[1]; document.title = `Best ${cat.charAt(0).toUpperCase() + cat.slice(1)} in Brooklyn — BestSpotsNearMe` }
    else if (page.startsWith('listing/')) { const l = LISTINGS.find(x => x.id === page.split('/')[1]); document.title = l ? `${l.name} — BestSpotsNearMe` : 'BestSpotsNearMe' }
    else if (page.startsWith('guides/')) { const a = ARTICLES.find(x => x.id === page.replace('guides/', '')); document.title = a ? `${a.title} — BestSpotsNearMe` : 'BestSpotsNearMe' }
    else document.title = titles[page] || 'BestSpotsNearMe'
  }, [page])

  const renderPage = () => {
    if (page === 'home') return <HomePage navigate={navigate} />
    if (page.startsWith('brooklyn/')) { const cat = page.split('/')[1]; if (CAT[cat]) return <CategoryPage category={cat} navigate={navigate} /> }
    if (page.startsWith('listing/')) return <ListingPage listingId={page.replace('listing/', '')} navigate={navigate} />
    if (page === 'events') return <EventsPage navigate={navigate} />
    if (page === 'guides') return <GuidesPage navigate={navigate} />
    if (page.startsWith('guides/')) return <ArticlePage articleId={page.replace('guides/', '')} navigate={navigate} />
    if (page === 'about') return <AboutPage navigate={navigate} />
    if (page === 'privacy') return <PrivacyPage navigate={navigate} />
    if (page === 'affiliate-disclosure') return <AffiliateDisclosurePage navigate={navigate} />
    if (page === 'contact') return <ContactPage navigate={navigate} />
    return (<div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'DM Sans', sans-serif" }}><div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div><h1 style={{ fontFamily: "'Lora', serif", fontSize: 24, color: T.text, marginBottom: 12 }}>Page not found</h1><button onClick={() => navigate('home')} style={{ padding: '10px 24px', background: T.coral, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>Back to home</button></div>)
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
