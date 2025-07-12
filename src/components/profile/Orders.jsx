import React from 'react';
import { motion } from 'framer-motion';
import {
 Ban,
 Calendar,
 DollarSign,
 Hash,
 Loader,
 PackageCheck,
 Truck,
} from 'lucide-react';
import styles from './Orders.module.css';

// Added englishStatus for styling, status is for display.
const mockOrders = [
 {
  id: 'ORD-7C3B',
  date: '1403-04-30',
  totalPrice: 150750,
  productsCount: 3,
  status: 'تحویل شده',
  englishStatus: 'Delivered',
 },
 {
  id: 'ORD-A2F9',
  date: '1403-04-28',
  totalPrice: 89990,
  productsCount: 1,
  status: 'ارسال شده',
  englishStatus: 'Shipped',
 },
 {
  id: 'ORD-E5D1',
  date: '1403-04-25',
  totalPrice: 230000,
  productsCount: 5,
  status: 'تحویل شده',
  englishStatus: 'Delivered',
 },
 {
  id: 'ORD-B8A4',
  date: '1403-04-22',
  totalPrice: 45500,
  productsCount: 2,
  status: 'در حال پردازش',
  englishStatus: 'Processing',
 },
 {
  id: 'ORD-9F0C',
  date: '1403-04-20',
  totalPrice: 199900,
  productsCount: 4,
  status: 'لغو شده',
  englishStatus: 'Cancelled',
 },
 {
  id: 'ORD-12BA',
  date: '1403-03-08',
  totalPrice: 75000,
  productsCount: 2,
  status: 'تحویل شده',
  englishStatus: 'Delivered',
 },
];

const statusIcons = {
 'تحویل شده': <PackageCheck size={16} />,
 'ارسال شده': <Truck size={16} />,
 'در حال پردازش': <Loader size={16} className='animate-spin' />,
 'لغو شده': <Ban size={16} />,
};

const StatusBadge = ({ status, englishStatus }) => (
 <div
  className={`${styles.statusBadge} ${styles[englishStatus.toLowerCase()]}`}>
  {statusIcons[status]}
  <span>{status}</span>
 </div>
);

const OrderRow = ({ order, index }) => (
 <motion.tr
  layout
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}>
  <td className={styles.tableCell}>{order.id}#</td>
  <td className={styles.tableCell}>{order.date}</td>
  <td className={styles.tableCell}>{order.productsCount}</td>
  <td className={styles.tableCell}>
   {order.totalPrice.toLocaleString('fa-IR')} تومان
  </td>
  <td className={styles.tableCell}>
   <StatusBadge status={order.status} englishStatus={order.englishStatus} />
  </td>
 </motion.tr>
);

const OrderCard = ({ order, index }) => (
 <motion.div
  layout
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
  className={styles.card}>
  <div className={styles.cardHeader}>
   <h3 className={styles.cardTitle}>سفارش #{order.id}</h3>
   <StatusBadge status={order.status} englishStatus={order.englishStatus} />
  </div>
  <div className={styles.cardBody}>
   <div className={styles.cardRow}>
    <Calendar size={16} className={styles.cardIcon} />
    <span>{order.date}</span>
   </div>
   <div className={styles.cardRow}>
    <Hash size={16} className={styles.cardIcon} />
    <span>{order.productsCount} محصول</span>
   </div>
   <div className={styles.cardRow}>
    <DollarSign size={16} className={styles.cardIcon} />
    <span className={styles.cardTotal}>
     {order.totalPrice.toLocaleString('fa-IR')} تومان
    </span>
   </div>
  </div>
 </motion.div>
);

const Orders = () => {
 return (
  <div className={styles.container}>
   <header className={styles.header}>
    <h1 className={styles.title}>تاریخچه سفارشات</h1>
    <p className={styles.subtitle}>سفارشات گذشته و فعلی خود را پیگیری کنید.</p>
   </header>

   <motion.div layout className={styles.content}>
    <div className={styles.tableWrapper}>
     <table className={styles.table}>
      <thead className={styles.tableHead}>
       <tr>
        <th className={styles.tableHeader}>شناسه سفارش</th>
        <th className={styles.tableHeader}>تاریخ</th>
        <th className={styles.tableHeader}>محصولات</th>
        <th className={styles.tableHeader}>مبلغ کل</th>
        <th className={styles.tableHeader}>وضعیت</th>
       </tr>
      </thead>
      <tbody>
       {mockOrders.map((order, index) => (
        <OrderRow key={order.id} order={order} index={index} />
       ))}
      </tbody>
     </table>
    </div>

    <div className={styles.mobileList}>
     {mockOrders.map((order, index) => (
      <OrderCard key={order.id} order={order} index={index} />
     ))}
    </div>
   </motion.div>
  </div>
 );
};

export default Orders;
