export const PRODUCT_CATEGORIES = ['Fruits', 'Vegetables', 'Oilseeds'];
export const CATEGORIES = ['All', ...PRODUCT_CATEGORIES];

export const PRODUCT_DATA = [
  // Fruits (5 products)
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
          image: '',
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
          name: 'Himsagar',
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
          name: 'Langra',
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
          name: 'Amrapali',
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
        {
            name: 'Haribhanga',
            image: '/mango/haribhanga.png',
            description: `Haribhanga is a cherished Bangladeshi mango variety closely associated with Rangpur. Known for its rich sweetness, generous pulp and virtually fibreless texture, it offers a delightful eating experience. Its relatively thin skin and small stone further enhance its appeal.

          When ripe, Haribhanga develops deep-yellow flesh with a pleasant aroma and a smooth, fleshy texture. Its distinctive flavour and vibrant colour make it an attractive choice for fresh consumption and a versatile ingredient in desserts, smoothies and other fruit preparations.

          With its regional heritage and appealing eating qualities, Haribhanga holds a valued place among Bangladesh’s seasonal mango varieties.`,
            specifications: [
              { label: 'Total soluble solids (TSS)', value: '21.50 °Brix' },
              { label: 'Average fruit weight', value: '310.28 g' },
              { label: 'Edible pulp content', value: '75.90% of fruit weight' },
              { label: 'Peel content', value: '12.01%' },
              { label: 'Stone/seed content', value: '12.90%' },
              { label: 'Ripe skin and flesh', value: 'Deep yellow' },
            ],
          },
          {
            name: 'Fazli',
            image: '',
            description: `Fazli is a distinctive late-season mango variety valued for its large size, elongated shape and generous proportion of edible pulp. Its yellowish-green skin reveals deep-yellow flesh with a pleasant aroma and a sweet flavour balanced by a refreshing tang.

          Enjoyed fresh when ripe, Fazli also offers considerable potential for processing into pulp and purée. Its versatility extends to traditional products such as pickles, chutneys and mango leather, making it suitable for both fresh-fruit and processed-food markets.`,
            specifications: [
              { label: 'Total soluble solids (TSS)', value: '18.11 °Brix' },
              { label: 'Pulp pH', value: '4.67' },
              { label: 'Titratable acidity', value: '0.42%, as reported' },
              { label: 'Average fruit weight', value: '417.59 g' },
              { label: 'Edible pulp content', value: '80.44% of fruit weight' },
              { label: 'Peel content', value: '8.86%' },
              { label: 'Stone/seed content', value: '10.70%' },
              { label: 'Ripe skin and flesh', value: 'Yellowish-green skin; deep-yellow flesh' },
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
    desc: 'Cabbage (Brassica oleracea var. capitata) is a widely cultivated leafy vegetable belonging to the Brassicaceae family. It is distinguished by layers of tightly packed leaves that form a compact, rounded head. Although green cabbage is the most common variety, red and purple varieties are also cultivated.',
    tags: [],
    bg: 'linear-gradient(140deg,#6BA539,#4a7c32)',
    image: '/cabbage/cabbage_top.jpeg',
    details: {
      overview: `Cabbage (Brassica oleracea var. capitata) is a widely cultivated leafy vegetable belonging to the Brassicaceae family. It is distinguished by layers of tightly packed leaves that form a compact, rounded head. Although green cabbage is the most common variety, red and purple varieties are also cultivated.

Fresh cabbage is valued for its crisp texture, mild flavour and nutritional qualities. It is naturally rich in vitamin C and also provides dietary fibre, vitamin K, folate, potassium and other beneficial nutrients. Its versatility makes it suitable for salads, stir-fries, soups, curries, pickles and a wide range of traditional and international dishes.

Bangladesh’s favourable climate and agricultural resources support the cultivation of quality cabbage for domestic consumption and potential export. Firm, compact heads with fresh leaves, uniform colour and minimal physical damage are carefully selected for commercial supply. Proper harvesting, trimming, hygienic handling, grading and suitable packaging help preserve freshness, appearance and quality throughout transportation.

POLYGON RESOURCE aims to connect international buyers with carefully selected fresh cabbage from Bangladesh. Our focus is on responsible sourcing, buyer-specific grading and packaging, food safety, freshness and dependable coordination from growers to destination.`,
    },
  },

  {
    name: 'Young Jackfruit',
    slug: 'jackfruit',
    category: 'Vegetables',
    desc: 'Young jackfruit—also known as green or unripe jackfruit—is harvested before the fruit develops its characteristic sweetness. Its mild flavour and firm, fibrous texture allow it to absorb seasonings easily, making it a versatile ingredient in curries, stir-fries, sandwiches, salads and a wide range of plant-based dishes.',
    tags: [],
    bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
    image: '/jackfruit/jackfruit_top.jpeg',
    details: {
      overview: `Young jackfruit—also known as green or unripe jackfruit—is harvested before the fruit develops its characteristic sweetness. Its mild flavour and firm, fibrous texture allow it to absorb seasonings easily, making it a versatile ingredient in curries, stir-fries, sandwiches, salads and a wide range of plant-based dishes.

Bangladesh has a long tradition of jackfruit cultivation and a substantial seasonal supply. Developing young jackfruit for commercial use can diversify the market for growers, reduce pressure on the short ripe-fruit marketing period and create opportunities for value-added processing.

Growing international demand for convenient plant-based foods has strengthened the commercial potential of young jackfruit. It can be supplied fresh or processed into peeled pieces, shredded products and ready-to-cook portions. Depending on buyers’ requirements, it may be canned, vacuum-packed or frozen for retail, foodservice and industrial use.

Compared with fully ripe jackfruit, young fruit is generally firmer and better suited to handling and processing. Successful export nevertheless requires harvesting at the correct maturity, hygienic cutting and preparation, appropriate packaging, temperature management and compliance with the destination market’s food-safety and phytosanitary requirements.

POLYGON RESOURCE aims to develop young jackfruit as a promising export product by working with growers, processors, logistics providers and international buyers. Our focus is on responsible sourcing, buyer-specific preparation and packaging, consistent quality and dependable delivery from Bangladesh to global markets.`,
    },
  },

  {
    name: 'Cauliflower',
    category: 'Vegetables',
    desc: 'Cauliflower (Brassica oleracea var. botrytis) is a popular winter vegetable belonging to the Brassicaceae family. It is recognised by its compact, fleshy white head—commonly known as the curd—surrounded by protective green leaves.',
    bg: 'linear-gradient(140deg,#F5F5DC,#e0e0c8)',
    image: '/cauliflower/cauliflower_top.jpeg',
    tags: [],
    details: {
      overview: `Cauliflower (Brassica oleracea var. botrytis) is a popular winter vegetable belonging to the Brassicaceae family. It is recognised by its compact, fleshy white head—commonly known as the curd—surrounded by protective green leaves.

Fresh cauliflower has a mild flavour and firm yet tender texture. It can be enjoyed raw or prepared in curries, stir-fries, soups, salads, pickles and numerous traditional and international dishes. It is naturally a source of vitamin C, dietary fibre and folate, and contains beneficial plant compounds, including glucosinolates, phenolic compounds and carotenoids. These nutrients can contribute to a balanced and varied diet.

Bangladesh’s cool winter growing season provides favourable conditions for cultivating quality cauliflower. Commercial selection focuses on compact, evenly coloured heads with firm curds, fresh surrounding leaves and minimal blemishes or physical damage. Timely harvesting, careful trimming, hygienic handling, grading and suitable packaging help maintain freshness and appearance during transportation.

POLYGON RESOURCE aims to connect international buyers with carefully selected fresh cauliflower from Bangladesh. Our focus is on responsible sourcing, buyer-specific grading and packaging, food safety, freshness and reliable coordination from growers to destination.`,
    },
  },
  {
    name: 'Pumpkin',
    category: 'Vegetables',
    desc: 'Pumpkin, locally known as Mishti Kumra or sweet gourd, is a widely cultivated vegetable in Bangladesh. Its firm outer rind, richly coloured flesh and naturally mild sweetness make it suitable for households, foodservice businesses and food-processing industries.',
    tags: [],
    bg: 'linear-gradient(140deg,#E8A317,#c4881a)',
    image: '/pumpkin/pumpkin_top.jpeg',
    details: {
      overview: `Pumpkin, locally known as Mishti Kumra or sweet gourd, is a widely cultivated vegetable in Bangladesh. Its firm outer rind, richly coloured flesh and naturally mild sweetness make it suitable for households, foodservice businesses and food-processing industries.

Pumpkin is a source of dietary fibre, vitamins and minerals. Its orange or yellow flesh contains beta-carotene, which the body can convert into vitamin A as part of a balanced diet. Pumpkin is commonly prepared in curries, soups, stews, baked dishes, desserts and purées, while its seeds, flowers and tender shoots are also used in various traditional foods.

Bangladesh’s climate and fertile agricultural land support pumpkin cultivation in both winter and summer seasons. The crop is grown in conventional fields as well as coastal, riverbank, char and seasonally exposed sandbar areas. Its relatively firm rind and good storage characteristics make pumpkin practical for commercial handling and transportation.

Quality selection focuses on mature, well-shaped pumpkins with firm flesh, uniform colour, intact stalks and freedom from cracks, decay and serious physical damage. Careful harvesting, cleaning, grading and suitable packaging help preserve freshness and product quality throughout the supply chain.

POLYGON RESOURCE aims to connect international buyers with carefully selected pumpkins from Bangladesh. Our focus is on responsible sourcing, buyer-specific sizing and grading, appropriate packaging, food safety and dependable coordination from growers to destination.`,
    },
  },
  // Oilseeds (2 products)
  {
    name: 'Sesame Seeds',
    category: 'Oilseeds',
    desc: 'Sesame (Sesamumindicum L.) is widely used in many cooking techniques worldwide, and it is known as the “queen of oilseeds” because it contains polyunsaturated lipids that prevent oxidative rancidity and carry oil content.',
    tags: [],
    bg: 'linear-gradient(140deg,#D4A373,#b8895c)',
    image: '/sesame seeds/sesame_top.jpeg',
    details: {
      overview: `Sesame (Sesamumindicum L.) is widely used in many cooking techniques worldwide, and it is known as the “queen of oilseeds” because it contains polyunsaturated lipids that prevent oxidative rancidity and carry oil content. Commonly known as til in Bengali, belongs to the Sesamum genus of the Pedaliaceae family. It is grown mainly for seeds that contain approximately 35-50% oil, 20-25% protein, 20% sugar, 6% fibre and many kinds of minerals. Sesame oil contains good quality poly-unsaturated fatty acids viz., 47% oleic and 39% linoleic acid.

Sesame is the second largest source of edible oil in Bangladesh next to mustard both in respect of acreage and production. Sesame is one of the world’s oldest spice and oilseed crop grown mainly for its seeds that contain approximately 35-50% oil, 20-25% protein, 20% sugar, 6% fibre and many kinds of minerals. Sesame oil is quality edible oil. The oil is tasteless, odourless and also used as hair oil and as a component of cosmetics. The seed is used in making various food items like cakes, khaja, biscuits, etc.

In Bangladesh, sesame occupies a remarkable area under production and contributes second-ranked production after rapeseed and mustard. However, the climatic and edaphic conditions of Bangladesh are quite suitable for the cultivation of sesame. Khulna, Jashore, Faridpur, Barisal, Patuakhali, Rajshahi, Pabna, Rangpur, Sylhet, Cumilla, Dhaka, and Mymensingh districts are the leading sesame producing areas of Bangladesh.`,
      packagingImages: [
        '/sesame seeds/sesame1.png',
        '/sesame seeds/sesame2.png',
        '/sesame seeds/sesame3.png',
        '/sesame seeds/sesame_brown.png',
      ],
      varieties: [
        {
          name: 'Black Sesame Seed Double Skin',
          image: '/sesame seeds/sesame1.png',
          specifications: [
            { label: 'Purity', value: '99.5% Min' },
            { label: 'Admixture', value: '1.5%Max' },
            { label: 'Moisture', value: '5-7.0 % Max' },
            { label: 'Free Fatty Acid', value: '2-4% Max' },
            { label: 'Oil Content', value: '42% Min' },
            { label: 'Other Color Seed', value: '3-5% Max.' },
          ],
        },
        {
          name: 'Brown Sesame Seed Double Skin',
          image: '/sesame seeds/sesame_brown.png',
          specifications: [
            { label: 'Purity', value: '99.5% Min' },
            { label: 'Admixture', value: '1.5%Max' },
            { label: 'Moisture', value: '5-7.0 % Max' },
            { label: 'Free Fatty Acid', value: '2-4% Max' },
            { label: 'Oil Content', value: '42% Min' },
            { label: 'Other Color Seed', value: '3-5% Max.' },
          ],
        },
      ],
    },
  },
  {
    name: 'Groundnut',
    category: 'Oilseeds',
    desc: 'Groundnut (Arachis hypogaea L.), commonly known as peanut or earthnut, is an important oilseed and food-legume crop.',
    tags: [],
    bg: 'linear-gradient(140deg,#C9A227,#8a6a17)',
    image: '/groundnut/groundnut_top.png',
    details: {
      overview: `Groundnut (Arachis hypogaea L.), commonly known as peanut or earthnut, is an important oilseed and food-legume crop. Unlike most crops, its pods develop beneath the soil. Groundnuts are valued for their distinctive roasted flavour, high-quality plant protein, beneficial unsaturated fats and versatility in both household and industrial food applications.

Groundnuts can be consumed raw, roasted, boiled or processed into peanut butter, confectionery, snacks, flour and edible oil. Groundnut cake—the solid material remaining after oil extraction—may also be used as animal feed when it meets applicable safety and quality requirements.

In Bangladesh, groundnuts are cultivated during both winter and summer seasons. The crop is particularly suited to sandy and well-drained soils and is grown in conventional fields as well as coastal, riverbank and char areas. Its ability to grow on comparatively marginal land creates income opportunities for farming communities while contributing to crop diversification and soil fertility through biological nitrogen fixation.

Commercial quality depends on mature, well-filled kernels with uniform size, natural colour and flavour, appropriate moisture content and freedom from insects, mould, foreign matter and physical damage. Proper drying, cleaning, grading, hygienic handling and moisture-resistant packaging are essential for maintaining quality. Careful storage and testing are especially important for controlling aflatoxin and meeting buyers’ food-safety requirements.

POLYGON RESOURCE aims to connect international buyers with carefully selected groundnuts from Bangladesh. Our focus is on responsible sourcing, buyer-specific grading and packaging, food-safety compliance and dependable coordination from growers to destination.`,
      packagingImages: [
        '/groundnut/groundnut1.png',
        '/groundnut/groundnut2.png',
        '/groundnut/groundnut3.png',
      ],
    },
  },
];

export const PRODUCT_GROUPS = PRODUCT_CATEGORIES.map((category) => ({
  category,
  products: PRODUCT_DATA.filter((product) => product.category === category),
}));
