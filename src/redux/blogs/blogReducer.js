import * as actionTypes from "./blogActionTypes";

const initialState = {
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
        "https://images.unsplash.com/photo-1614726365949-9273435a25e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویری از سحابی چشم گربه",
      alt_en: "Image of the Cat's Eye Nebula",
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
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویر هنری از یک سیاره فراخورشیدی",
      alt_en: "Artistic impression of an exoplanet",
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
        "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "شبیه‌سازی توزیع ماده تاریک در کیهان",
      alt_en: "Simulation of dark matter distribution in the cosmos",
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
      description: `<h2>نقطه‌ای بی‌بازگشت</h2><p>سیاه‌چاله ناحیه‌ای از فضازمان است که گرانش آن به قدری قوی است که هیچ چیز، حتی نور، نمی‌تواند از آن بگریزد. این پدیده زمانی رخ می‌دهد که مقدار بسیار زیادی از ماده در فضای بسیار کوچکی فشرده شود. این فشردگی باعث خمیدگی شدید در بافت فضازمان می‌شود. مرزی که پس از عبور از آن، گریز از گرانش سیاه‌چاله غیرممکن می‌شود، "افق رویداد" نام دارد.</p><p>سیاه‌چاله‌ها به طور معمول از مرگ ستارگان بسیار پرجرم به وجود می‌آیند. وقتی سوخت هسته‌ای یک ستاره عظیم به پایان می‌رسد، هسته آن تحت تاثیر گرانش خودش رمبش کرده و به یک نقطه بی‌نهایت چگال به نام "تکینگی" تبدیل می‌شود. سیاه‌چاله‌ها نقش مهمی در تکامل کهکشان‌ها دارند و در مرکز اکثر کهکشان‌های بزرگ، از جمله کهکشان راه شیری، یک سیاه‌چاله کلان‌جرم وجود دارد.</p>`,
      description_en: `<h2>A Point of No Return</h2><p>A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape from it. This occurs when a very large amount of matter is squeezed into a very small space. This compression causes a severe curvature in the fabric of spacetime. The boundary beyond which escape from the black hole's gravity is impossible is called the "event horizon".</p><p>Black holes are typically formed from the death of very massive stars. When a massive star runs out of nuclear fuel, its core collapses under its own gravity into an infinitely dense point called a "singularity". Black holes play a crucial role in the evolution of galaxies, and at the center of most large galaxies, including the Milky Way, there is a supermassive black hole.</p>`,
      image:
        "https://images.unsplash.com/photo-1534244592049-72a3942a5598?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "شبیه‌سازی یک سیاه‌چاله",
      alt_en: "Simulation of a black hole",
    },
    {
      id: 5,
      alias: "future-of-space-travel",
      title: "آینده سفرهای فضایی: از مریخ تا فراسوی آن",
      title_en: "The Future of Space Travel: From Mars and Beyond",
      shortDescription:
        "رویای سفر به دیگر سیارات در حال تبدیل شدن به واقعیت است. برنامه‌های آینده ناسا، اسپیس‌ایکس و دیگر شرکت‌ها برای استعمار مریخ و کاوش در منظومه شمسی چیست؟",
      shortDescription_en:
        "The dream of traveling to other planets is becoming a reality. What are the future plans of NASA, SpaceX, and other companies for colonizing Mars and exploring the solar system?",
      description: `<h2>گام بعدی بشریت</h2><p>در دهه‌های آینده، بشریت شاهد انقلابی در سفرهای فضایی خواهد بود. شرکت‌هایی مانند اسپیس‌ایکس با توسعه موشک‌های قابل استفاده مجدد مانند "استارشیپ"، هزینه سفر به فضا را به شدت کاهش داده و رویای ساخت یک پایگاه دائمی در مریخ را دنبال می‌کنند. ناسا نیز با برنامه "آرتمیس"، قصد دارد دوباره انسان را به ماه بازگرداند، اما این بار برای اقامت طولانی‌مدت و به عنوان گامی برای سفر به مریخ.</p><p>چالش‌های پیش رو بسیارند؛ از محافظت از فضانوردان در برابر تشعشعات کیهانی گرفته تا تولید منابع مورد نیاز در خود سیارات دیگر. با این حال، پیشرفت‌های فناوری و اراده جمعی برای کاوش، آینده‌ای را نوید می‌دهد که در آن سفر بین سیاره‌ای دیگر یک داستان علمی-تخیلی نخواهد بود، بلکه بخشی از تاریخ بشر است.</p>`,
      description_en: `<h2>Humanity's Next Step</h2><p>In the coming decades, humanity will witness a revolution in space travel. Companies like SpaceX, by developing reusable rockets like "Starship," are drastically reducing the cost of space travel and pursuing the dream of building a permanent base on Mars. NASA, with its "Artemis" program, also plans to return humans to the moon, this time for long-term stays and as a stepping stone for the journey to Mars.</p><p>The challenges ahead are numerous, from protecting astronauts against cosmic radiation to producing necessary resources on other planets themselves. However, technological advancements and the collective will to explore promise a future where interplanetary travel will no longer be science fiction, but a part of human history.</p>`,
      image:
        "https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "تصویر هنری از یک پایگاه در مریخ",
      alt_en: "Artistic impression of a base on Mars",
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
