export const PRODUCT_CATEGORIES = ['Fruits', 'Vegetables', 'Oilseeds'];
export const CATEGORIES = ['All', ...PRODUCT_CATEGORIES];

export const PRODUCT_DATA = [
  // Fruits (4 products)
  {
    name: 'Pineapple',
    category: 'Fruits',
    desc: 'Sourced from Madhupur, the "Pineapple Capital" of Bangladesh, prized for its red-soil sweetness.',
    tags: ['Jun–Aug harvest', 'Madhupur & Tangail'],
    bg: 'linear-gradient(140deg,#DD8F2A,#a85f13)',
    image: '/pineapple/pineapple_top.png',
    details: {
      overview: `Pineapples are among the world’s most popular tropical fruits, valued for their sweet flavour, refreshing taste and remarkable versatility. Rich in vitamin C, antioxidants, manganese and bromelain—a natural enzyme associated with digestive benefits—pineapples are widely enjoyed in fresh produce markets and used throughout the processed food industry.

Bangladesh produces more than 234,865 metric tons of pineapples annually. Tangail district, particularly Madhupur upazila, serves as the country’s principal pineapple-producing region, accounting for a substantial share of national production.

Pineapples in Bangladesh are a major tropical crop, famously led by the Geographically Indication (GI)-certified pineapples from Madhupur in Tangail.
Production and Regions.
Top Growing Hub: Madhupur (Tangail) is the most famous region, known for massive markets like Jalchhatra.
Other Areas: Rangamati, Sylhet, and Chattogram also produce large quantities of varieties like the Giant Kew and Honey Queen.
Harvest Season: Peak harvesting typically occurs during the summer and monsoon months (around June to August).`,
      varieties: [
        {
          name: 'Honey Queen pineapple',
          description: `The Honey Queen pineapple is a small, exceptionally sweet variety known for its bright yellow flesh, rich aroma, and tapered shape.

Key Characteristics
Appearance: Smaller and more tapered than the Giant Kew variety, featuring an orangish-yellow skin when ripe and thorny leaves.
Taste and Quality: Highly sweet with high total soluble solids (TSS) and a drier, very flavorful flesh.
Average Weight: Around 1 kg per fruit.
Farming and Cultivation Regions: Widely grown in Bangladesh, particularly in the Chittagong Hilly Zone, Tangail (Madhupur), and Narsingdi (Polash upazila).
Yield: A single bigha of land can yield between 1,000 and 1,200 pineapples annually.
Harvesting: The harvest season generally starts in April.
Reference: Detailed botanical and agricultural descriptions can be found at the Honey Queen Digital Herbarium.`,
          specifications: [
            { label: 'pH', value: '4.383' },
            { label: 'TSS (°Brix)', value: '15.967° (Highest sweetness)' },
            { label: 'Total Sugar', value: '10.700' },
            { label: 'Titrable Acidity (TA)', value: '0.413' },
            { label: 'Vitamin C', value: '8.733' },
            { label: 'Sweetness Index', value: '14.667' },
          ],
        },
        {
          name: 'Giant Kew',
          images: ['/pineapple/giantkew.png', '/pineapple/giantkew1.png'],
          description: `The "Giant Q" (or Giant Kew) is the most widely cultivated large-sized pineapple variety in Bangladesh, primarily grown in the red-soil hill tracts of Madhupur Upazila in the Tangail district.

Key Facts About Madhupur's Giant Pineapples
The Pineapple Capital: Madhupur in Tangail is the heartland of pineapple production in Bangladesh, accounting for thousands of hectares of farming.
Giant Q Variety: Also, locally known as Kalender, the Giant Q variety makes up about 85% of the local harvest due to its large size and juicy sweetness.
Geographical Indication (GI): The famous pineapples of the Madhupur Garh region officially earned GI recognition for their unique regional heritage and quality.
History: Commercial pineapple farming in the area started back in 1942 when a local Garo community member Mizi Dayamoyi Sangma brought 750 saplings from neighboring Meghalaya, India.`,
          specifications: [
            { label: 'pH', value: '4.343' },
            { label: 'TSS (°Brix)', value: '13.267°' },
            { label: 'Total Sugar', value: '9.167' },
            { label: 'Titratable Acidity (TA)', value: '0.547' },
            { label: 'Vitamin C', value: '11.567' },
            { label: 'Sweetness Index', value: '12.133' },
          ],
        },
        {
          name: 'Red Spanish (Ghorashal) pineapple',
          image: '/pineapple/redspanish.png',
          description: `The Red Spanish (Ghorashal) pineapple is a traditional, highly-acclaimed variety of pineapple grown extensively in the Ghorashal and Palash Upazila regions of Narsingdi District in Bangladesh.

Ghorashal`,
          specifications: [
            { label: 'pH', value: '~4.360' },
            { label: 'TSS (°Brix)', value: '~14.360°' },
            { label: 'Total Sugar', value: '10.200' },
            { label: 'Titrable Acidity (TA)', value: '0.458 (Low to moderate).' },
            { label: 'Vitamin C', value: '9.890' },
            { label: 'Sweetness Index', value: '13.200' },
          ],
        },
      ],
    },
  },
  {
    name: 'Guava',
    category: 'Fruits',
    desc: 'Fresh guavas are popular tropical fruits valued for their sweet and tangy flavor, pleasant aroma and high nutritional value. Naturally rich in vitamin C, antioxidants and dietary fiber, guavas are enjoyed as fresh fruit and used in juices, jams, beverages, snacks and other processed foods.',
    tags: [],
    bg: 'linear-gradient(140deg,#9CC96B,#5f8a3a)',
    image: '/guava/guava_top.jpeg',
    details: {
      overview: `Fresh guavas are popular tropical fruits valued for their sweet and tangy flavor, pleasant aroma and high nutritional value. Naturally rich in vitamin C, antioxidants and dietary fiber, guavas are enjoyed as fresh fruit and used in juices, jams, beverages, snacks and other processed foods.

Growing international demand for fresh and nutritious produce has created promising opportunities for guava exporters. Careful harvesting, hygienic handling, grading, suitable packaging and efficient transportation are essential for preserving the fruit’s freshness, appearance and quality throughout the export process.

Bangladesh’s fertile soil and tropical climate provide favorable conditions for guava cultivation. The country produces a wide range of local and high-yielding varieties, including several popular Kazi & Thai Guava varieties recognized for their attractive size, crisp texture and commercial potential. Guava cultivation is expanding within Bangladesh’s agricultural sector as farmers respond to rising demand in domestic and international markets.

Recognizing this opportunity, POLYGON RESOURCE aims to develop fresh guavas as a target export product by working closely with growers, packers, logistics providers and international buyers. Our objective is to supply carefully selected Bangladeshi guavas while maintaining quality, food safety, freshness and timely delivery from farm to destination.`,
    },
  },
  {
    name: 'Mango',
    category: 'Fruits',
    desc: 'Bangladeshi mangoes are celebrated for their exceptional sweetness, distinctive aroma and rich nutritional value. A natural source of vitamins, minerals and dietary fiber, these premium tropical fruits are increasingly attracting interest from international markets.',
    tags: [],
    bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
    image: '/mango/mango_top.jpeg',
    details: {
      overview: `Bangladeshi mangoes are celebrated for their exceptional sweetness, distinctive aroma and rich nutritional value. A natural source of vitamins, minerals and dietary fiber, these premium tropical fruits are increasingly attracting interest from international markets.

Bangladesh has a long tradition of mango cultivation, supported by fertile soil, a favorable climate and established growing regions, particularly Rajshahi, Chapainawabganj, Naogaon, Dinajpur and Satkhira. While mango production has historically served the domestic market, the industry is expanding its focus towards supplying carefully selected fresh fruit to international buyers.

Popular varieties such as Himsagar, Langra, Fazli, Amrapali and Haribhanga offer distinctive flavors, appealing aromas and significant export potential. Improvements in orchard management, traceability, hygienic handling, grading, Vapor Heat Treatment (VHT), modern packaging and phytosanitary compliance are creating new opportunities for Bangladeshi mangoes throughout the Middle East, Europe and Asia.

Recognizing this potential, POLYGON RESOURCE is developing mangoes as a target export product by collaborating with growers, packers, logistics providers and international buyers. Our objective is to deliver fresh, carefully selected Bangladeshi mangoes while maintaining quality, food safety and timely shipment from orchard to destination.`,
      varieties: [
        {
          name: 'Himsagar Mango',
          image: '/mango/himsagar.png',
          description: `Himsagar mangoes are prized for their rich sweetness, distinctive tropical aroma and smooth, virtually fibreless flesh. Their skin typically remains green when ripe, contrasting with the golden-yellow to orange flesh inside.

With a generous proportion of pulp, a tender texture and a juicy, melt-in-the-mouth quality, Himsagar mangoes offer a memorable eating experience. These qualities make Himsagar one of Bangladesh’s most cherished mango varieties and an appealing choice for fresh-fruit markets.`,
          specifications: [
            { label: 'Total soluble solids (TSS)', value: '15.40–17.85 °Brix' },
            { label: 'Total soluble sugars', value: '11.81–13.82%' },
            { label: 'Titratable acidity', value: '0.14–0.20% as malic acid' },
          ],
        },
        {
          name: 'Langra Mango',
          image: '/mango/langra.png',
          description: `Langra mangoes are medium-sized, oval fruits recognised for their smooth green skin, which typically remains green even when fully ripe. Their tender yellow flesh is juicy and nearly fibreless, offering a rich sweetness balanced by a pleasant hint of acidity and a distinctive tropical aroma.

With their smooth texture and refreshing flavour, Langra mangoes are especially enjoyable eaten fresh. They also lend themselves to a variety of culinary uses, including desserts, smoothies, salads, chutneys and other sweet or savoury dishes. Their appealing balance of sweetness, aroma and mild tang makes them a distinctive choice for fresh-fruit markets.`,
          specifications: [
            { label: 'Total soluble solids (°Brix)', value: 'Approximately 20 °Brix' },
            { label: 'Titratable acidity', value: '0.14%' },
            { label: 'Pulp pH', value: '4.89' },
            { label: 'Average fruit weight', value: '230.40 g' },
            { label: 'Edible pulp content', value: '76.64% of fruit weight' },
            { label: 'Peel content', value: '11.99%' },
            { label: 'Stone/seed content', value: '11.37%' },
            { label: 'Ripe appearance', value: 'Yellowish-green skin; deep-yellow flesh' },
          ],
        },
        {
          name: 'Amrapali mangoes',
          image: '/mango/amrapali.png',
          description: `Amrapali mangoes are valued for their sweet flavour, pleasant aroma and distinctive deep-orange to orange-red flesh. The fruits are generally small to medium-sized and elongated, with skin that may remain predominantly green even at eating ripeness. When cut open, the richly coloured pulp reveals a smooth texture and an appealing, earthy sweetness.

The Amrapali tree is naturally compact, bears fruit regularly and commonly produces clusters of mangoes. Its deeply coloured flesh is a source of β-carotene, a natural pigment that contributes to the fruit’s vibrant appearance and nutritional value.

Enjoyed fresh or used in desserts, smoothies and other fruit preparations, Amrapali offers an attractive combination of flavour, colour and convenient serving size. These qualities make it a versatile addition to fresh-fruit and processed-mango product ranges.`,
          specifications: [
            { label: 'Total soluble solids (TSS)', value: '20.55 °Brix' },
            { label: 'Pulp pH', value: '4.50' },
            { label: 'Titratable acidity', value: '0.20%, as reported' },
            { label: 'Average fruit weight', value: '246.29 g' },
            { label: 'Edible pulp content', value: '73.60% of fruit weight' },
            { label: 'Peel content', value: '14.06%' },
            { label: 'Stone/seed content', value: '12.33%' },
            { label: 'Ripe skin and flesh', value: 'Green skin; dark-orange flesh' },
          ],
        },
      ],
    },
  },
  {
    name: 'Watermelon',
    category: 'Fruits',
    desc: 'Watermelon is a popular fruit recognized for its smooth green rind and sweet, juicy red flesh. Naturally rich in water and a source of potassium, vitamins A and C, and lycopene, watermelon offers a refreshing and nutritious choice for consumers. Its high-water content—approximately 92%—makes it especially enjoyable during warm weather and after physical activity.',
    tags: [],
    bg: 'linear-gradient(140deg,#E24E4E,#8f2323)',
    image: '/watermelon/watermelon_top.png',
    details: {
      overview: `Watermelon is a popular fruit recognized for its smooth green rind and sweet, juicy red flesh. Naturally rich in water and a source of potassium, vitamins A and C, and lycopene, watermelon offers a refreshing and nutritious choice for consumers. Its high-water content—approximately 92%—makes it especially enjoyable during warm weather and after physical activity.

Bangladesh provides favorable conditions for watermelon cultivation, particularly in coastal and southern regions. Production has expanded in recent years through increased cultivation and the growing popularity of both seasonal and off-season varieties. This development is creating new opportunities for growers, traders and exporters within the country’s agricultural sector.

Careful harvesting, grading, hygienic handling, suitable packaging and temperature-controlled transportation are essential for preserving the fruit’s freshness, appearance and quality during export.

Recognizing its commercial potential, POLYGON RESOURCE aims to develop watermelon as a target export product by working closely with growers, packers, logistics providers and international buyers. Our objective is to supply fresh, carefully selected Bangladeshi watermelons while maintaining quality, food safety and timely delivery from farm to destination.`,
    },
  },
  // Vegetables (4 products)
  {
    name: 'Potato',
    category: 'Vegetables',
    desc: 'Our flagship line — graded, sorted and cleaned at our own Rangpur facility with modern packing infrastructure.',
    tags: ['Own processing plant', 'Rangpur'],
    bg: 'linear-gradient(140deg,#8A5A32,#54371d)',
    image: '/potatoes/potatoe_top.jpeg',
    details: {
      overview: `Potato (SolanumtuberosumL.) is one of the most important food crops grown in more than 100 countries in the world. Over one billion people consume potato worldwide and it is the staple diet of half a billion people in developing countries. Potato is one of the main food crops in Bangladesh after rice and wheat. Within Asia, Bangladesh is the fourth largest potato producing country, and seventh biggest in the world for growing potatoes. All agro-ecological zones of Bangladesh are suitable for potato cultivation.

Bangladesh grows more than 100 varieties of potatoes; most popular varieties are.`,
      varieties: [
        {
          name: 'Adato',
          description: 'Adato is an early maincrop retail variety with quite large tubers and quite a high dry matter content.',
          image: '/potatoes/Adato.png',
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Oval long' },
            { label: 'Skin colour', value: 'Yellow' },
            { label: 'Flesh colour', value: 'cream' },
            { label: 'Underwater weight', value: '374' },
            { label: 'Dry matter content', value: '20.4%' },
            { label: 'Cooking type', value: 'BC (Floury)' },
          ],
          note: 'Suitable for cooking and home baked products',
        },
        {
          name: 'Valencia',
          image: '/potatoes/Valencia.png',
          description: 'The variety has an oil absorption capacity below about 3%, making it a very suitable variety for making delicious French fries. The processing loss is less than 2%. Scab is a common disease in white skin color potatoes in our country, due to which the farmers lose about 20-30% of the yield. Growers can easily avoid this damage as the Valencia variety is tolerant to scab disease.',
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Oval long' },
            { label: 'Skin colour', value: 'Yellow' },
          ],
        },
        {
          name: 'Sunshine',
          image: '/potatoes/Sunshine.png',
          description: 'Sunshine is a very early to early table potato with cooking type B. Its long-oval, well-shaped tubers attract with their very shallow eyes, smooth skin and unique brightness. Sunshine grows rapidly and achieves early high yields. Remarkable is its very early skin finish.',
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Long Oval Shape' },
            { label: 'Color of flesh', value: 'Light Yellow' },
            { label: 'Suitable for', value: 'Fresh Consumption' },
            { label: 'Cooking type', value: 'B (little floury and crumble)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
          name: 'Levante',
          image: '/potatoes/Levante.png',
          description: 'An early maincrop high-yielding ware variety with nice yellow skin and late blight resistance in foliage and tuber.',
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Oval Shape' },
            { label: 'Color of flesh', value: 'Light yellow' },
            { label: 'Suitable for', value: 'Fresh Consumption' },
            { label: 'Cooking type', value: 'B (Rather floury)' },
            { label: 'Underwater weight', value: '365' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '19.9%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
          name: 'Diamant',
          image: '/potatoes/Diamant.png',
          description: 'Diamant is a type of potato known for its smooth, yellow skin and creamy flesh. Diamant potatoes are popular for their excellent taste and versatility in cooking, often used for boiling, baking, or making French fries. Skin Color: Light yellow to pale yellow. Flesh Color: Creamy white.',
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Oval Shape' },
            { label: 'Color of flesh', value: 'Light yellow flesh, Shallow Eye' },
            { label: 'Suitable for', value: 'Fresh Consumption, French Fries' },
            { label: 'Cooking type', value: 'BC (waxy to floury)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '21.7%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
          name: 'Granola',
          image: '/potatoes/Granola.png',
          description: `Granola is a potato variety that is known for its high yield, storage capabilities, and versatility. It is a medium late table potato with yellow flesh and skin and is a member of the Solanaceae family.
Granola potatoes are rich in carbohydrates, vitamins, and minerals, including potassium, fiber, and vitamin C.`,
          specifications: [
            { label: 'Appearance', value: 'Yellow Skin' },
            { label: 'Shape', value: 'Round Shape' },
            { label: 'Color of flesh', value: 'Light yellow flesh' },
            { label: 'Suitable for', value: 'Fresh Consumption' },
            { label: 'Cooking type', value: 'BC (waxy to floury)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '29.1%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
            name: 'Kumarika',
            image: '/potatoes/Kumarika.png',
            description: 'High-Yielding Variety (HYV) table potato developed and released by the Tuber Crops Research Centre (TCRC) of the Bangladesh Agricultural Research Institute (BARI). It has gained notable traction among Bangladeshi farmers and international buyers due to its exceptional suitability for industrial processing and export.',
            specifications: [
              { label: 'Appearance', value: 'Yellow Skin' },
              { label: 'Shape', value: 'Round to Oval Shape' },
              { label: 'Color of flesh', value: 'Light Yellowish to Cream Tones' },
              { label: 'Suitable for', value: 'Fresh Table Consumption, International Export, Commercial Food Processing' },
              { label: 'Style', value: 'Fresh/Frozen' },
            ],
          },

          {
          name: 'Asterix',
          image: '/potatoes/Asterix.png',
          description: 'Asterix is a high yielding late main crop variety of long oval uniform red tubers with yellow flesh, with high dry matters and pale fry colors well suited to production of French fries and processed products',
          specifications: [
            { label: 'Appearance', value: 'Red Skin' },
            { label: 'Shape', value: 'Oval Shape' },
            { label: 'Color of flesh', value: 'Light yellow flesh, Shallow Eye' },
            { label: 'Suitable for', value: 'Fresh Consumption, French Fries' },
            { label: 'Cooking type', value: 'B (Slightly mealy)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '23.3%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        
        {
          name: 'Cardinal',
          image: '/potatoes/Cardinal.png',
          description: 'The tubers are oval-elongated, pink-red color. Excellent taste, light amber flesh color. During heat treatment, the pulp does not darken, the potatoes do not boil over, therefore it is used universally in the household, added to winter salads, made fries and chips.',
          specifications: [
            { label: 'Appearance', value: 'Red Skin' },
            { label: 'Shape', value: 'Oval Shape' },
            { label: 'Color of flesh', value: 'Shallow Eye' },
            { label: 'Suitable for', value: 'Fresh Consumption, French Fries' },
            { label: 'Cooking type', value: 'BC (waxy to floury)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '23.6%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
          name: 'Lal-pakri',
          image: '/potatoes/Lalpakri.png',
          description: 'Lal-pakri is a traditional potato variety in Bangladesh that is known for its red tubers, good taste, and long shelf life. It is an early season type that is drought tolerant and late blight resistant. They have red colored skin and are nutritious.',
          specifications: [
            { label: 'Appearance', value: 'round with slightly rough skin' },
            { label: 'Shape', value: 'Round Shape' },
            { label: 'Color of flesh', value: 'Light yellow flesh' },
            { label: 'Suitable for', value: 'Fresh Consumption' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        
        {
          name: 'Lady Rosetta',
          image: '/potatoes/Rosetta.png',
          description: 'Lady Rosetta is a moderately early, productive crisping variety. This variety reaches high dry matter levels and low sugars early in the season. Lady Rosetta produces very uniform round tubers. It is very popular in Europe, Northern Africa and Middle east for the crisping.',
          specifications: [
            { label: 'Appearance', value: 'Red Skin' },
            { label: 'Shape', value: 'Round Shape' },
            { label: 'Color of flesh', value: 'Pale yellow' },
            { label: 'Suitable for', value: 'Crisps' },
            { label: 'Cooking type', value: 'C (floury)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '25.5%' },
            { label: 'Style', value: 'Fresh/Frozen' },
          ],
        },
        {
          name: 'Alouette',
          image: '/potatoes/Alouette.png',
          description: `An early maincrop, versatile, red skin ware
variety with late blight resistance in foliage and
tuber, suitable for conventional and organic
production.`,
          specifications: [
            { label: 'Appearance', value: 'Red Skin' },
            { label: 'Shape', value: 'Oval Shape' },
            { label: 'Color of flesh', value: 'Yellow flesh' },
            { label: 'Suitable for', value: 'Fresh Consumption' },
            { label: 'Cooking type', value: 'AB (Rather Firm)' },
            { label: 'Discoloration after cooking', value: 'No discoloration' },
            { label: 'Dry matter content', value: '21,1%' },
            { label: 'Underwater Weight', value: '389' },
            { label: 'Flesh colour', value: 'yellow' },
          ],
          note: 'Suitable for cooking and home baked products',
        },
      ],
    },
  },
  {
    name: 'Cabbage',
    category: 'Vegetables',
    desc: 'Fresh, crisp cabbage grown in the highlands of Bangladesh, perfect for export.',
    tags: ['Fresh', 'Crisp'],
    bg: 'linear-gradient(140deg,#6BA539,#4a7c32)',
    image: 'https://images.unsplash.com/photo-1652860213441-6622f9fec77f?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Cauliflower',
    category: 'Vegetables',
    desc: 'Premium cauliflower, carefully cultivated and harvested for export markets.',
    tags: ['Premium Quality', 'Fresh'],
    bg: 'linear-gradient(140deg,#F5F5DC,#e0e0c8)',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop',
  },
  {
    name: 'Pumpkin',
    category: 'Vegetables',
    desc: 'Nutritious pumpkin varieties grown across Bangladesh, rich in vitamins and minerals.',
    tags: ['Organic', 'Nutritious'],
    bg: 'linear-gradient(140deg,#E8A317,#c4881a)',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop',
  },
  // Oilseeds (2 products)
  {
    name: 'Sesame Seeds',
    category: 'Oilseeds',
    desc: 'Premium quality sesame seeds, rich in oil content and perfect for export.',
    tags: ['High Oil Content', 'Premium'],
    bg: 'linear-gradient(140deg,#D4A373,#b8895c)',
    image: 'https://images.unsplash.com/photo-1731970820339-e725b78f55e4?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Groundnut',
    category: 'Oilseeds',
    desc: 'High-quality groundnuts sourced from Bangladeshi farmers, suitable for oil extraction.',
    tags: ['High Yield', 'Premium Grade'],
    bg: 'linear-gradient(140deg,#C9A227,#8a6a17)',
    image: 'https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60',
  },
];

export const PRODUCT_GROUPS = PRODUCT_CATEGORIES.map((category) => ({
  category,
  products: PRODUCT_DATA.filter((product) => product.category === category),
}));
