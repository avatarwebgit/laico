import {
  CheckCircle,
  Calendar,
  ChevronRight,
  Clock,
  MessageSquare,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTicketRequest,
  fetchTicketsRequest,
} from "../../redux/user/userActions";
import Spinner from "../common/Spinner";
import ChatModal from "./ChatModal";
import NewTicketModal from "./NewTicketModal";
import styles from "./Tickets.module.css";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Open: { icon: <Clock size={14} />, text: "باز" },
    Answered: { icon: <MessageSquare size={14} />, text: "پاسخ داده شده" },
    Closed: { icon: <CheckCircle size={14} />, text: "بسته شده" },
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
  const dispatch = useDispatch();
  const {
    tickets: reduxTickets,
    ticketsLoading,
    ticketsError,
  } = useSelector((state) => state.user);

  const [tickets, setTickets] = useState(reduxTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

  useEffect(() => {
    if (reduxTickets.length === 0) {
      dispatch(fetchTicketsRequest());
    }
  }, [dispatch, reduxTickets.length]);

  useEffect(() => {
    setTickets(reduxTickets);
  }, [reduxTickets]);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedTicket(null);
  };

  const handleUpdateTicket = (updatedTicket) => {
    setSelectedTicket(updatedTicket);
    // This function would ideally dispatch an action to update the ticket in Redux
  };

  const handleAddNewTicket = (newTicketData) => {
    dispatch(createTicketRequest(newTicketData));
    setIsNewTicketModalOpen(false);
  };

  const renderContent = () => {
    if (ticketsLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
        </div>
      );
    }

    if (ticketsError) {
      return (
        <div className={styles.stateContainer}>
          <p className={styles.errorText}>خطا: {ticketsError}</p>
        </div>
      );
    }

    if (tickets.length === 0) {
      return (
        <div className={styles.stateContainer}>
          <p>تیکتی یافت نشد.</p>
        </div>
      );
    }

    return (
      <>
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
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
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
                      whileTap={{ scale: 0.95 }}
                    >
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
              onClick={() => handleViewTicket(ticket)}
            >
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
                  <span className={styles.cardDescription}>
                    {ticket.description}
                  </span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span>مشاهده گفتگو</span>
                <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </>
    );
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
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          <span>تیکت جدید</span>
        </motion.button>
      </header>

      <div className={styles.contentWrapper}>{renderContent()}</div>

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
