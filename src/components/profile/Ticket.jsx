import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
 MessageSquare,
 Calendar,
 ChevronRight,
 CheckCircle,
 Clock,
 Plus,
} from 'lucide-react';
import styles from './Tickets.module.css';
import ChatModal from './ChatModal';
import NewTicketModal from './NewTicketModal';

const mockTickets = [
 {
  id: 'TKT-001',
  title: 'مشکل در تکمیل سفارش',
  date: '1403-05-01',
  status: 'Answered',
  description:
   'سلام، من در مرحله پرداخت با مشکل مواجه شده‌ام و نمی‌توانم سفارشم را نهایی کنم.',
  messages: [
   {
    sender: 'user',
    text:
     'سلام، من در مرحله پرداخت با مشکل مواجه شده‌ام و نمی‌توانم سفارشم را نهایی کنم.',
   },
   {
    sender: 'support',
    text:
     'سلام، متاسفم که با این مشکل مواجه شدید. لطفاً شناسه سفارش یا محصولاتی که قصد خریدشان را دارید به ما بگویید تا بررسی کنیم.',
   },
  ],
 },
 {
  id: 'TKT-002',
  title: 'سوال در مورد زمان ارسال',
  date: '1403-04-28',
  status: 'Open',
  description: 'سلام، می‌خواستم بدونم سفارش من کی به دستم میرسه؟ ممنون.',
  messages: [
   {
    sender: 'user',
    text: 'سلام، می‌خواستم بدونم سفارش من کی به دستم میرسه؟ ممنون.',
   },
  ],
 },
 {
  id: 'TKT-003',
  title: 'درخواست تغییر آدرس',
  date: '1403-04-25',
  status: 'Closed',
  description: 'سلام، امکانش هست آدرس سفارش اخیرم رو تغییر بدم؟',
  messages: [
   { sender: 'user', text: 'سلام، امکانش هست آدرس سفارش اخیرم رو تغییر بدم؟' },
   {
    sender: 'support',
    text: 'سلام، بله حتما. لطفا آدرس جدید را برای ما ارسال کنید.',
   },
   { sender: 'user', text: 'خیابان جدید، پلاک ۱۱۰. ممنون از شما.' },
   { sender: 'support', text: 'خواهش می‌کنم. آدرس شما با موفقیت به روز شد.' },
  ],
 },
];

const StatusBadge = ({ status }) => {
 const statusConfig = {
  Open: { icon: <Clock size={14} />, text: 'باز' },
  Answered: { icon: <MessageSquare size={14} />, text: 'پاسخ داده شده' },
  Closed: { icon: <CheckCircle size={14} />, text: 'بسته شده' },
 };
 const config = statusConfig[status] || {};
 return (
  <div className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
   {config.icon}
   <span>{config.text}</span>
  </div>
 );
};

const Tickets = () => {
 const [tickets, setTickets] = useState(mockTickets);
 const [selectedTicket, setSelectedTicket] = useState(null);
 const [isChatModalOpen, setIsChatModalOpen] = useState(false);
 const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

 const handleViewTicket = ticket => {
  setSelectedTicket(ticket);
  setIsChatModalOpen(true);
 };

 const handleCloseChatModal = () => {
  setIsChatModalOpen(false);
  setSelectedTicket(null);
 };

 const handleUpdateTicket = updatedTicket => {
  setSelectedTicket(updatedTicket);
 };

 const handleAddNewTicket = newTicketData => {
  const newTicket = {
   id: `TKT-${String(Date.now()).slice(-4)}`,
   title: newTicketData.title,
   date: new Date()
    .toLocaleDateString('fa-IR-u-nu-latn', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
    })
    .replace(/\//g, '-'),
   status: 'Open',
   description: newTicketData.description,
   messages: [{ sender: 'user', text: newTicketData.description }],
  };
  setTickets(prevTickets => [newTicket, ...prevTickets]);
  setIsNewTicketModalOpen(false);
 };

 return (
  <div className={styles.container}>
   <header className={styles.header}>
    <div className={styles.headerContent}>
     <h1 className={styles.title}>تیکت‌های پشتیبانی</h1>
     <p className={styles.subtitle}>
      درخواست‌های پشتیبانی خود را مشاهده و مدیریت کنید.
     </p>
    </div>
    <motion.button
     onClick={() => setIsNewTicketModalOpen(true)}
     className={styles.newTicketButton}
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}>
     <Plus size={18} />
     <span>تیکت جدید</span>
    </motion.button>
   </header>

   <div className={styles.contentWrapper}>
    {/* Desktop Table View */}
    <div className={styles.tableWrapper}>
     <table className={styles.table}>
      <thead>
       <tr>
        <th className={styles.tableHeader}>شناسه تیکت</th>
        <th className={styles.tableHeader}>موضوع</th>
        <th className={styles.tableHeader}>تاریخ</th>
        <th className={styles.tableHeader}>وضعیت</th>
        <th className={styles.tableHeader}></th>
       </tr>
      </thead>
      <tbody>
       {tickets.map((ticket, index) => (
        <motion.tr
         key={ticket.id}
         layout
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, delay: index * 0.05 }}>
         <td className={styles.tableCell}>#{ticket.id}</td>
         <td className={styles.tableCell}>{ticket.title}</td>
         <td className={styles.tableCell}>{ticket.date}</td>
         <td className={styles.tableCell}>
          <StatusBadge status={ticket.status} />
         </td>
         <td className={styles.tableCell}>
          <motion.button
           onClick={() => handleViewTicket(ticket)}
           className={styles.viewButton}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}>
           مشاهده
          </motion.button>
         </td>
        </motion.tr>
       ))}
      </tbody>
     </table>
    </div>

    {/* Mobile Card View */}
    <div className={styles.mobileList}>
     {tickets.map((ticket, index) => (
      <motion.div
       key={ticket.id}
       layout
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.3, delay: index * 0.05 }}
       className={styles.card}
       onClick={() => handleViewTicket(ticket)}>
       <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{ticket.title}</h3>
        <StatusBadge status={ticket.status} />
       </div>
       <div className={styles.cardBody}>
        <div className={styles.cardRow}>
         <Calendar size={14} className={styles.cardIcon} />
         <span>{ticket.date}</span>
        </div>
        <div className={styles.cardRow}>
         <MessageSquare size={14} className={styles.cardIcon} />
         <span className={styles.cardDescription}>{ticket.description}</span>
        </div>
       </div>
       <div className={styles.cardFooter}>
        <span>مشاهده گفتگو</span>
        <ChevronRight size={16} />
       </div>
      </motion.div>
     ))}
    </div>
   </div>

   <ChatModal
    isOpen={isChatModalOpen}
    onClose={handleCloseChatModal}
    ticket={selectedTicket}
    onSendMessage={handleUpdateTicket}
    tickets={tickets}
    setTickets={setTickets}
   />
   <NewTicketModal
    isOpen={isNewTicketModalOpen}
    onClose={() => setIsNewTicketModalOpen(false)}
    onSave={handleAddNewTicket}
   />
  </div>
 );
};

export default Tickets;
