import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Award, Users, ChevronDown } from 'lucide-react';
import styles from './About.module.css';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: { staggerChildren: 0.2, delayChildren: 0.1 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const teamMembers = [
 {
  name: 'کاپیتان نوا',
  role: 'بنیانگذار و مدیرعامل',
  image:
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 },
 {
  name: 'دکتر آرورا',
  role: 'مدیر بخش علمی',
  image:
   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 },
 {
  name: 'ریکتور',
  role: 'مهندس ارشد',
  image:
   'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 },
];

const values = [
 {
  icon: <Rocket size={28} />,
  title: 'کاوش',
  description: 'ما مرزهای دانش را جابجا کرده و به سوی ناشناخته‌ها سفر می‌کنیم.',
 },
 {
  icon: <Sparkles size={28} />,
  title: 'نوآوری',
  description:
   'ما با استفاده از آخرین فناوری‌ها، محصولاتی منحصر به فرد خلق می‌کنیم.',
 },
 {
  icon: <Award size={28} />,
  title: 'کیفیت',
  description:
   'تعهد ما به کیفیت در هر ستاره و سحابی که ارائه می‌دهیم، می‌درخشد.',
 },
];

const About = () => {
 const [isStoryExpanded, setIsStoryExpanded] = useState(false);
 return (
  <motion.div
   className={styles.container}
   variants={containerVariants}
   initial='hidden'
   animate='visible'>
   <header className={styles.header}>
    <motion.h1 variants={itemVariants} className={styles.title}>
     درباره کهکشان ما
    </motion.h1>
    <motion.p variants={itemVariants} className={styles.subtitle}>
     سفری به قلب داستان، ماموریت و تیمی که در پشت صحنه این ماجراجویی فضایی قرار
     دارد.
    </motion.p>
   </header>

   <motion.section variants={itemVariants} className={styles.missionSection}>
    <div className={styles.missionContent}>
     <h2>ماموریت ما</h2>
     <p>
      ماموریت ما در این گوشه از وب، آوردن شگفتی‌های کیهان به زندگی روزمره شماست.
      ما معتقدیم که هر کس باید بتواند تکه‌ای از آسمان شب را در دستان خود داشته
      باشد و از زیبایی بی‌پایان فضا الهام بگیرد.
     </p>
    </div>
    <div className={styles.missionImage}>
     <img
      src='https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      alt='Galaxy Mission'
     />
    </div>
   </motion.section>

   <motion.section variants={itemVariants} className={styles.valuesSection}>
    <h2 className={styles.sectionTitle}>ارزش‌های ما</h2>
    <div className={styles.valuesGrid}>
     {values.map((value, index) => (
      <motion.div
       key={index}
       className={styles.valueCard}
       whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
       <div className={styles.valueIcon}>{value.icon}</div>
       <h3 className={styles.valueTitle}>{value.title}</h3>
       <p className={styles.valueDescription}>{value.description}</p>
      </motion.div>
     ))}
    </div>
   </motion.section>

   <motion.section variants={itemVariants} className={styles.teamSection}>
    <h2 className={styles.sectionTitle}>تیم فضانوردان ما</h2>
    <p className={styles.sectionSubtitle}>
     با خدمه‌ای که این سفر کیهانی را ممکن می‌سازند، آشنا شوید.
    </p>
    <div className={styles.teamGrid}>
     {teamMembers.map((member, index) => (
      <motion.div
       key={index}
       className={styles.teamCard}
       whileHover={{
        scale: 1.05,
        boxShadow: '0 15px 30px -5px rgba(11, 47, 159, 0.3)',
       }}
       transition={{ type: 'spring', stiffness: 300 }}>
       <img src={member.image} alt={member.name} className={styles.teamImage} />
       <div className={styles.teamInfo}>
        <h3 className={styles.teamName}>{member.name}</h3>
        <p className={styles.teamRole}>{member.role}</p>
       </div>
      </motion.div>
     ))}
    </div>
   </motion.section>

   <motion.section variants={itemVariants} className={styles.storySection}>
    <h2 className={styles.sectionTitle}>سفر کیهانی ما</h2>
    <div
     className={`${styles.storyContentWrapper} ${
      isStoryExpanded ? styles.expanded : ''
     }`}>
     <div className={styles.storyContent}>
      <p>
       داستان ما در یک شب صاف و پرستاره آغاز شد، زمانی که گروهی از دوستان،
       شیفته‌ی عظمت کیهان، دور یک تلسکوپ جمع شده بودند. آن شب، با دیدن حلقه‌های
       زحل و رقص کهکشان آندرومدا در دوردست، جرقه‌ای در ذهن ما زده شد: چرا این
       زیبایی وصف‌ناپذیر نباید بخشی از زندگی روزمره همگان باشد؟ چرا نباید
       بتوانیم جادوی فضا را به خانه‌ها، دفاتر و قلب‌های مردم بیاوریم؟ این سوال
       ساده، به یک ماموریت بزرگ تبدیل شد.
      </p>
      <p>
       ما سفر خود را با تحقیقات گسترده آغاز کردیم. از گفتگو با ستاره‌شناسان
       برجسته گرفته تا همکاری با هنرمندان دیجیتال خلاق، هدف ما تبدیل داده‌های
       پیچیده فضایی به محصولاتی بود که هم از نظر علمی دقیق و هم از نظر بصری
       خیره‌کننده باشند. اولین محصول ما، یک پوستر با کیفیت بالا از سحابی جبار
       بود که با استفاده از تصاویر واقعی تلسکوپ هابل ساخته شده بود. استقبال
       بی‌نظیر از آن، به ما انگیزه داد تا کاتالوگ محصولات خود را گسترش دهیم.
      </p>
      <p>
       امروز، ما مفتخریم که مجموعه‌ای وسیع از محصولات با تم فضایی ارائه می‌دهیم؛
       از مدل‌های سه‌بعدی سیارات که با دقت علمی ساخته شده‌اند، تا لباس‌هایی با
       طرح‌های الهام‌گرفته از صورت‌های فلکی و لوازم دکوری که هر فضایی را به یک
       رصدخانه شخصی تبدیل می‌کنند. هر محصول، داستانی برای گفتن دارد و با عشق و
       وسواس برای جزئیات طراحی شده است. ما معتقدیم که کنجکاوی، موتور پیشرفت بشر
       است و امیدواریم که محصولات ما، الهام‌بخش نسل بعدی کاوشگران، دانشمندان و
       رویاپردازان باشد. به کهکشان ما خوش آمدید؛ جایی که هر ستاره، یک داستان
       است.
      </p>
     </div>
     {!isStoryExpanded && <div className={styles.storyFade}></div>}
    </div>
    <motion.button
     className={styles.showMoreButton}
     onClick={() => setIsStoryExpanded(!isStoryExpanded)}
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}>
     {isStoryExpanded ? 'نمایش کمتر' : 'ادامه داستان ما را بخوانید'}
     <motion.div animate={{ rotate: isStoryExpanded ? 180 : 0 }}>
      <ChevronDown size={20} />
     </motion.div>
    </motion.button>
   </motion.section>
  </motion.div>
 );
};

export default About;
