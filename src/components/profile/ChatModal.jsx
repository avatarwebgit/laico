import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import styles from './ChatModal.module.css';

const ChatModal = ({
 isOpen,
 onClose,
 ticket,
 onSendMessage,
 tickets,
 setTickets,
}) => {
 const [newMessage, setNewMessage] = useState('');
 const chatBodyRef = useRef(null);

 useEffect(() => {
  if (chatBodyRef.current) {
   chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }
 }, [ticket?.messages]);

 const handleSendMessage = e => {
  e.preventDefault();
  if (!newMessage.trim() || !ticket) return;

  const userMessage = { sender: 'user', text: newMessage };

  const updatedTickets = tickets.map(t => {
   if (t.id === ticket.id) {
    const newStatus = t.status === 'Closed' ? 'Open' : t.status;
    return { ...t, messages: [...t.messages, userMessage], status: newStatus };
   }
   return t;
  });
  setTickets(updatedTickets);
  onSendMessage({ ...ticket, messages: [...ticket.messages, userMessage] });
  setNewMessage('');

  // Simulate support reply
  setTimeout(() => {
   const supportReply = {
    sender: 'support',
    text: 'از پیام شما متشکریم. تیم پشتیبانی به زودی پاسخ شما را خواهد داد.',
   };
   const finalTickets = updatedTickets.map(t => {
    if (t.id === ticket.id) {
     return {
      ...t,
      messages: [...t.messages, supportReply],
      status: 'Answered',
     };
    }
    return t;
   });
   setTickets(finalTickets);
   onSendMessage(finalTickets.find(t => t.id === ticket.id));
  }, 1500);
 };

 if (!isOpen || !ticket) return null;

 return (
  <AnimatePresence>
   <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={styles.modalOverlay}
    onClick={onClose}>
    <motion.div
     initial={{ scale: 0.9, opacity: 0, y: 30 }}
     animate={{ scale: 1, opacity: 1, y: 0 }}
     exit={{ scale: 0.9, opacity: 0, y: 30 }}
     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
     className={styles.modalContent}
     onClick={e => e.stopPropagation()}>
     <div className={styles.chatHeader}>
      <div>
       <h3 className={styles.chatTitle}>{ticket.title}</h3>
       <p className={styles.chatInfo}>
        تیکت #{ticket.id} - ایجاد شده در {ticket.date}
       </p>
      </div>
      <button
       onClick={onClose}
       className={styles.closeButton}
       aria-label='بستن مدال'>
       <X size={22} />
      </button>
     </div>

     <div ref={chatBodyRef} className={styles.chatBody}>
      {ticket.messages.map((msg, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`${styles.message} ${
         msg.sender === 'user' ? styles.userMessage : styles.supportMessage
        }`}>
        <p>{msg.text}</p>
       </motion.div>
      ))}
     </div>

     <form className={styles.chatFooter} onSubmit={handleSendMessage}>
      <input
       type='text'
       className={styles.chatInput}
       placeholder='پیام خود را بنویسید...'
       value={newMessage}
       onChange={e => setNewMessage(e.target.value)}
       aria-label='ورودی پیام'
      />
      <motion.button
       type='submit'
       className={styles.sendButton}
       whileHover={{ scale: 1.1 }}
       whileTap={{ scale: 0.9 }}
       aria-label='ارسال پیام'
       disabled={!newMessage.trim()}>
       <Send size={18} />
      </motion.button>
     </form>
    </motion.div>
   </motion.div>
  </AnimatePresence>
 );
};

export default ChatModal;
