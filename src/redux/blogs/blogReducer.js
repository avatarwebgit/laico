import * as actionTypes from "./blogActionTypes";

export const initialState = {
  list: [
    {
      id: 1,
      alias: "first-blog-post",
      title: "سفر به اعماق کیهان: کشفیات جدید تلسکوپ جیمز وب",
      title_en:
        "Journey to the Depths of the Cosmos: New Discoveries from the James Webb Telescope",
      shortDescription:
        "تلسکوپ فضایی جیمز وب پنجره‌ای جدید به روی کیهان گشوده است. در این مقاله به بررسی آخرین و شگفت‌انگیزترین تصاویر و داده‌های ارسالی از این تلسکوپ می‌پردازیم.",
      shortDescription_en:
        "The James Webb Space Telescope has opened a new window to the cosmos. In this article, we explore the latest and most amazing images and data sent from this telescope.",
      description: `<h2>شگفتی‌های بی‌پایان کیهان</h2><p>تلسکوپ فضایی جیمز وب (JWST) که به عنوان جانشین تلسکوپ هابل شناخته می‌شود، از زمان آغاز به کار خود، دید ما را نسبت به جهان هستی متحول کرده است. این تلسکوپ با آینه‌های غول‌پیکر و ابزارهای پیشرفته خود قادر است نور فروسرخ را از دورترین نقاط کیهان دریافت کند و به ما اجازه دهد تا تولد اولین ستارگان و کهکشان‌ها را مشاهده کنیم.</p><p>یکی از اولین و خیره‌کننده‌ترین تصاویر منتشر شده، تصویری از خوشه کهکشانی SMACS 0723 بود که به عنوان "میدان ژرف وب" شناخته می‌شود. این تصویر، کهکشان‌هایی را نشان می‌دهد که نور آن‌ها میلیاردها سال در سفر بوده تا به ما برسد و به لطف پدیده همگرایی گرانشی، حتی اجرام کم‌نورتر و دورتری نیز قابل مشاهده هستند.</p>`,
      description_en: `<h2>The Endless Wonders of the Cosmos</h2><p>The James Webb Space Telescope (JWST), known as the successor to the Hubble Telescope, has revolutionized our view of the universe since its launch. With its giant mirrors and advanced instruments, it can capture infrared light from the most distant parts of the cosmos, allowing us to witness the birth of the first stars and galaxies.</p><p>One of the first and most stunning images released was of the galaxy cluster SMACS 0723, known as "Webb's First Deep Field." This image shows galaxies whose light has traveled for billions of years to reach us, and thanks to gravitational lensing, even fainter and more distant objects are visible.</p>`,
      image:
        "https://images.unsplash.com/photo-1614726365949-9273435a25e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویری از سحابی چشم گربه",
      alt_en: "Image of the Cat's Eye Nebula",
      author: {
        name: "آریا ستوده‌نیا",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      date: "1403/05/01",
      category: "فضا",
      views: 2840,
      rating: 4.8,
      comments: [
        {
          id: 1,
          author: "کاربر ۱",
          text: "مقاله عالی بود!",
          avatar: "https://i.pravatar.cc/150?img=10",
        },
        {
          id: 2,
          author: "کاربر ۲",
          text: "بسیار آموزنده، ممنون.",
          avatar: "https://i.pravatar.cc/150?img=11",
        },
      ],
    },
    {
      id: 2,
      alias: "life-on-exoplanets",
      title: "حیات در سیارات فراخورشیدی: آیا ما تنها هستیم؟",
      title_en: "Life on Exoplanets: Are We Alone?",
      shortDescription:
        "با کشف هزاران سیاره فراخورشیدی، سوال در مورد وجود حیات در دیگر نقاط جهان بیش از هر زمان دیگری مطرح است. دانشمندان به دنبال چه نشانه‌هایی هستند؟",
      shortDescription_en:
        "With the discovery of thousands of exoplanets, the question of life elsewhere in the universe is more relevant than ever. What signs are scientists looking for?",
      description: `<h2>در جستجوی حیات</h2><p>کشف سیاراتی که به دور ستارگانی غیر از خورشید ما می‌چرخند، یکی از هیجان‌انگیزترین حوزه‌های اخترشناسی مدرن است. این سیارات که به "سیارات فراخورشیدی" معروفند، در اندازه‌ها و ترکیبات مختلفی یافت می‌شوند. برخی از آن‌ها غول‌های گازی مانند مشتری هستند و برخی دیگر صخره‌ای و شبیه به زمین.</p><p>دانشمندان برای یافتن نشانه‌های حیات، به دنبال سیاراتی در "منطقه قابل سکونت" ستاره خود هستند؛ منطقه‌ای که دما برای وجود آب مایع مناسب است. علاوه بر این، با تحلیل جو این سیارات، به دنبال "بیومارکرها" یا گازهایی مانند اکسیژن، متان و بخار آب می‌گردند که می‌توانند نشان‌دهنده وجود فرآیندهای بیولوژیکی باشند. تلسکوپ جیمز وب نقش کلیدی در این تحقیقات ایفا می‌کند و امیدها برای یافتن پاسخ به این سوال قدیمی را افزایش داده است.</p>`,
      description_en: `<h2>The Search for Life</h2><p>The discovery of planets orbiting stars other than our sun is one of the most exciting fields in modern astronomy. These "exoplanets" come in various sizes and compositions. Some are gas giants like Jupiter, while others are rocky and Earth-like.</p><p>To find signs of life, scientists look for planets in the "habitable zone" of their star, where the temperature is right for liquid water to exist. Furthermore, by analyzing the atmospheres of these planets, they search for "biomarkers" – gases like oxygen, methane, and water vapor that could indicate biological processes. The James Webb Telescope plays a key role in this research, raising hopes of finding an answer to this age-old question.</p>`,
      image:
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویر هنری از یک سیاره فراخورشیدی",
      alt_en: "Artistic impression of an exoplanet",
      author: { name: "زهرا احمدی", avatar: "https://i.pravatar.cc/150?img=2" },
      date: "1403/04/28",
      category: "علمی",
      views: 1980,
      rating: 4.6,
      comments: [],
    },
    {
      id: 3,
      alias: "dark-matter-mystery",
      title: "ماده تاریک: راز بزرگ کیهان",
      title_en: "Dark Matter: The Big Mystery of the Cosmos",
      shortDescription:
        "حدود 85 درصد از ماده موجود در جهان، ماده تاریک است؛ ماده‌ای نامرئی که ما هنوز ماهیت آن را نمی‌دانیم. این مقاله به بررسی شواهد وجود ماده تاریک و تلاش‌ها برای شناسایی آن می‌پردازد.",
      shortDescription_en:
        "About 85% of the matter in the universe is dark matter, an invisible substance whose nature we still do not understand. This article examines the evidence for dark matter and the efforts to identify it.",
      description: `<h2>ماده نامرئی</h2><p>ماده تاریک یکی از بزرگترین معماهای علم فیزیک است. ما نمی‌توانیم آن را مستقیماً ببینیم، اما اثرات گرانشی آن را بر روی ستارگان و کهکشان‌ها مشاهده می‌کنیم. برای مثال، سرعت چرخش کهکشان‌ها به قدری زیاد است که بدون وجود یک ماده نامرئی اضافی که گرانش بیشتری ایجاد کند، باید از هم بپاشند.</p><p>دانشمندان در سراسر جهان در آزمایشگاه‌های عمیق زیرزمینی در تلاشند تا ذرات ماده تاریک را شناسایی کنند. نظریه‌های مختلفی در مورد ماهیت این ماده وجود دارد، از ذرات سنگین با برهم‌کنش ضعیف (WIMPs) گرفته تا ذرات بسیار سبکی به نام اکسیون‌ها. کشف ماهیت ماده تاریک، انقلابی در درک ما از فیزیک بنیادی و ساختار جهان ایجاد خواهد کرد.</p>`,
      description_en: `<h2>The Invisible Substance</h2><p>Dark matter is one of the biggest puzzles in physics. We cannot see it directly, but we observe its gravitational effects on stars and galaxies. For example, galaxies rotate so fast that they should fly apart without an extra invisible substance providing more gravity.</p><p>Scientists worldwide are trying to detect dark matter particles in deep underground laboratories. There are various theories about its nature, from Weakly Interacting Massive Particles (WIMPs) to very light particles called axions. Uncovering the nature of dark matter will revolutionize our understanding of fundamental physics and the structure of the universe.</p>`,
      image:
        "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "شبیه‌سازی توزیع ماده تاریک در کیهان",
      alt_en: "Simulation of dark matter distribution in the cosmos",
      author: { name: "دکتر رضایی", avatar: "https://i.pravatar.cc/150?img=3" },
      date: "1403/04/22",
      category: "فیزیک",
      views: 3500,
      rating: 4.9,
      comments: [
        {
          id: 3,
          author: "کاربر ۳",
          text: "بسیار جالب بود.",
          avatar: "https://i.pravatar.cc/150?img=12",
        },
      ],
    },
    {
      id: 4,
      alias: "black-holes-explained",
      title: "سیاه‌چاله‌ها: هیولاهای گرانشی کیهان",
      title_en: "Black Holes: Gravitational Monsters of the Cosmos",
      shortDescription:
        "سیاه‌چاله‌ها از مرموزترین و قدرتمندترین اجرام کیهانی هستند. در این مقاله به زبان ساده به شما خواهیم گفت که سیاه‌چاله چیست و چگونه شکل می‌گیرد.",
      shortDescription_en:
        "Black holes are among the most mysterious and powerful cosmic objects. In this simple article, we will explain what a black hole is and how it forms.",
      description: `<h2>نقطه‌ای بی‌بازگشت</h2><p>سیاه‌چاله ناحیه‌ای از فضازمان است که گرانش آن به قدری قوی است که هیچ چیز، حتی نور، نمی‌تواند از آن بگریزد. این پدیده زمانی رخ می‌دهد که مقدار بسیار زیادی از ماده در فضای بسیار کوچکی فشرده شود. این فشردگی باعث خمیدگی شدید در بافت فضازمان می‌شود. مرزی که پس از عبور از آن، راه بازگشتی وجود ندارد، "افق رویداد" نامیده می‌شود.</p>`,
      description_en: `<h2>A Point of No Return</h2><p>A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape from it. This phenomenon occurs when a very large amount of matter is squeezed into a very small space. This compression causes a severe curvature in the fabric of spacetime. The boundary beyond which there is no escape is called the "event horizon."</p>`,
      image:
        "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویر هنری از یک سیاه‌چاله",
      alt_en: "Artistic impression of a black hole",
      author: { name: "نیما کریمی", avatar: "https://i.pravatar.cc/150?img=4" },
      date: "1403/04/18",
      category: "نجوم",
      views: 5200,
      rating: 5.0,
      comments: [
        {
          id: 4,
          author: "کاربر ۴",
          text: "ذهنم منفجر شد!",
          avatar: "https://i.pravatar.cc/150?img=13",
        },
        {
          id: 5,
          author: "کاربر ۵",
          text: "خیلی خوب توضیح دادید.",
          avatar: "https://i.pravatar.cc/150?img=14",
        },
      ],
    },
    {
      id: 5,
      alias: "future-of-space-travel",
      title: "آینده سفر فضایی: از ماه تا مریخ و فراتر",
      title_en: "The Future of Space Travel: From the Moon to Mars and Beyond",
      shortDescription:
        "با پیشرفت‌های شرکت‌هایی مانند اسپیس‌ایکس و ناسا، رویای سفر به سیارات دیگر به واقعیت نزدیک‌تر می‌شود. در این مقاله به برنامه‌های آینده برای کاوش منظومه شمسی می‌پردازیم.",
      shortDescription_en:
        "With advancements from companies like SpaceX and NASA, the dream of traveling to other planets is getting closer. This article looks at future plans for exploring the solar system.",
      description: `<h2>گام بعدی بشریت</h2><p>پس از دهه‌ها، بشر دوباره نگاه خود را به ماه دوخته است. برنامه آرتمیس ناسا قصد دارد تا اولین زن و فرد رنگین‌پوست را بر روی سطح ماه فرود آورد و یک پایگاه پایدار در آنجا ایجاد کند. این برنامه نه تنها یک دستاورد علمی بزرگ خواهد بود، بلکه به عنوان یک سکوی پرتاب برای هدف نهایی، یعنی سفر به مریخ، عمل خواهد کرد.</p>`,
      description_en: `<h2>Humanity's Next Step</h2><p>After decades, humanity has once again set its sights on the moon. NASA's Artemis program aims to land the first woman and person of color on the lunar surface and establish a sustainable base there. This program will not only be a great scientific achievement but will also serve as a launchpad for the ultimate goal: traveling to Mars.</p>`,
      image:
        "https://images.unsplash.com/photo-1630514933939-752a550937a0?q=80&w=870&auto=format&fit=crop",
      alt: "فضانورد بر روی ماه",
      alt_en: "Astronaut on the Moon",
      author: { name: "سارا بخشی", avatar: "https://i.pravatar.cc/150?img=5" },
      date: "1403/04/15",
      category: "فناوری",
      views: 1530,
      rating: 4.7,
      comments: [],
    },
    {
      id: 6,
      alias: "asteroid-mining",
      title: "معدن‌کاوی سیارک‌ها: طلای جدید فضایی؟",
      title_en: "Asteroid Mining: The New Space Gold Rush?",
      shortDescription:
        "سیارک‌ها سرشار از منابع ارزشمندی مانند پلاتین و آب هستند. آیا معدن‌کاوی فضایی می‌تواند اقتصاد آینده را متحول کند؟",
      shortDescription_en:
        "Asteroids are rich in valuable resources like platinum and water. Could space mining transform the future economy?",
      description: `<p>ایده استخراج منابع از سیارک‌ها که زمانی تنها در داستان‌های علمی-تخیلی یافت می‌شد، امروز به لطف پیشرفت‌های فناوری در حال تبدیل شدن به یک چشم‌انداز واقعی است. سیارک‌ها بقایای سنگی و فلزی از زمان تشکیل منظومه شمسی هستند و حاوی مقادیر عظیمی از فلزات گران‌بها مانند پلاتین، طلا و همچنین آب هستند که می‌تواند برای تولید سوخت موشک در فضا استفاده شود.</p>`,
      description_en: `<p>The idea of extracting resources from asteroids, once confined to science fiction, is now becoming a realistic prospect thanks to technological advancements. Asteroids are rocky and metallic remnants from the formation of the solar system, containing vast amounts of precious metals like platinum and gold, as well as water that could be used to produce rocket fuel in space.</p>`,
      image:
        "https://images.unsplash.com/photo-1610294363401-235b675239a2?q=80&w=870&auto=format&fit=crop",
      alt: "یک سیارک در فضا",
      alt_en: "An asteroid in space",
      author: { name: "امیر قاسمی", avatar: "https://i.pravatar.cc/150?img=6" },
      date: "1403/04/11",
      category: "اقتصاد",
      views: 980,
      rating: 4.3,
      comments: [],
    },
    {
      id: 7,
      alias: "ai-in-astronomy",
      title: "نقش هوش مصنوعی در اکتشافات نجومی",
      title_en:
        "The Role of Artificial Intelligence in Astronomical Discoveries",
      shortDescription:
        "هوش مصنوعی به ستاره‌شناسان کمک می‌کند تا حجم عظیمی از داده‌های تلسکوپ‌ها را تحلیل کرده و الگوهای پنهان را کشف کنند.",
      shortDescription_en:
        "Artificial intelligence is helping astronomers analyze vast amounts of telescope data and uncover hidden patterns.",
      description: `<p>تلسکوپ‌های مدرن هر شب حجم غیرقابل تصوری از داده‌ها را تولید می‌کنند. تحلیل این حجم از اطلاعات برای انسان‌ها به تنهایی غیرممکن است. اینجاست که هوش مصنوعی (AI) وارد میدان می‌شود. الگوریتم‌های یادگیری ماشین می‌توانند به طور خودکار داده‌ها را برای یافتن سیارات فراخورشیدی جدید، طبقه‌بندی کهکشان‌ها، و حتی شناسایی پدیده‌های نادر و گذرا مانند ابرنواخترها جستجو کنند.</p>`,
      description_en: `<p>Modern telescopes generate an unimaginable amount of data every night. Analyzing this volume of information is impossible for humans alone. This is where Artificial Intelligence (AI) comes in. Machine learning algorithms can automatically sift through data to find new exoplanets, classify galaxies, and even identify rare and transient phenomena like supernovae.</p>`,
      image:
        "https://images.unsplash.com/photo-1526406915894-7121ba37d372?q=80&w=870&auto=format&fit=crop",
      alt: "مفهوم هوش مصنوعی و فضا",
      alt_en: "Concept of AI and space",
      author: {
        name: "پروفسور حسابی",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      date: "1403/04/05",
      category: "تکنولوژی",
      views: 4100,
      rating: 4.9,
      comments: [
        {
          id: 6,
          author: "کاربر ۶",
          text: "هوش مصنوعی آینده است!",
          avatar: "https://i.pravatar.cc/150?img=15",
        },
      ],
    },
    {
      id: 8,
      alias: "solar-system-tourism",
      title: "گردشگری در منظومه شمسی: رویایی نزدیک",
      title_en: "Solar System Tourism: A Dream Within Reach",
      shortDescription:
        "آیا به زودی شاهد سفرهای توریستی به ماه و مریخ خواهیم بود؟ چالش‌ها و فرصت‌های پیش رو را بررسی می‌کنیم.",
      shortDescription_en:
        "Will we soon see tourist trips to the Moon and Mars? We examine the challenges and opportunities ahead.",
      description:
        "<p>سفر به فضا دیگر محدود به فضانوردان حرفه‌ای نیست. شرکت‌های خصوصی در حال توسعه فضاپیماهایی هستند که افراد عادی را به لبه فضا و فراتر از آن ببرند. این مقاله به بررسی آینده گردشگری فضایی و مقاصد احتمالی در منظومه شمسی می‌پردازد.</p>",
      description_en:
        "<p>Space travel is no longer limited to professional astronauts. Private companies are developing spacecraft to take ordinary people to the edge of space and beyond. This article explores the future of space tourism and potential destinations in our solar system.</p>",
      image:
        "https://images.unsplash.com/photo-1610254332219-a111a85e317a?q=80&w=870&auto=format&fit=crop",
      alt: "فضاپیمایی در مدار زمین",
      alt_en: "A spacecraft in Earth orbit",
      author: { name: "یلدا زمانی", avatar: "https://i.pravatar.cc/150?img=8" },
      date: "1403/03/30",
      category: "آینده",
      views: 2300,
      rating: 4.5,
      comments: [],
    },
    {
      id: 9,
      alias: "supernovae-cosmic-fireworks",
      title: "ابرنواخترها: آتش‌بازی‌های کیهانی",
      title_en: "Supernovae: Cosmic Fireworks",
      shortDescription:
        "انفجار یک ستاره در پایان عمر خود یکی از پرانرژی‌ترین رویدادهای جهان است. ابرنواخترها چگونه عناصر سنگین را در سراسر کیهان پراکنده می‌کنند؟",
      shortDescription_en:
        "The explosion of a star at the end of its life is one of the most energetic events in the universe. How do supernovae spread heavy elements across the cosmos?",
      description:
        "<p>یک ابرنواختر زمانی رخ می‌دهد که یک ستاره پرجرم به پایان عمر خود می‌رسد و سوخت هسته‌ای خود را تمام می‌کند. این انفجار عظیم، نوری درخشان‌تر از کل یک کهکشان تولید می‌کند و عناصر سنگینی را که در هسته ستاره ساخته شده‌اند، در فضا پراکنده می‌کند؛ عناصری که برای تشکیل سیارات و حیات ضروری هستند.</p>",
      description_en:
        "<p>A supernova occurs when a massive star reaches the end of its life and runs out of nuclear fuel. This massive explosion produces more light than an entire galaxy and scatters heavy elements forged in the star's core into space—elements essential for the formation of planets and life.</p>",
      image:
        "https://images.unsplash.com/photo-1543321269-9eac6995353d?q=80&w=870&auto=format&fit=crop",
      alt: "باقیمانده یک ابرنواختر",
      alt_en: "Remains of a supernova",
      author: { name: "دکتر رضایی", avatar: "https://i.pravatar.cc/150?img=3" },
      date: "1403/03/25",
      category: "فیزیک",
      views: 3100,
      rating: 4.8,
      comments: [],
    },
  ],
  single: null,
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_REQUEST:
    case actionTypes.FETCH_SINGLE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        single: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_BLOGS_FAILURE:
    case actionTypes.FETCH_SINGLE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
