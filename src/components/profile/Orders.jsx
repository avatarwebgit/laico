import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Ban,
  Calendar,
  DollarSign,
  Hash,
  Loader,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../redux/user/userActions";
import Spinner from "../common/Spinner";
import styles from "./Orders.module.css";

const statusIcons = {
  "تحویل شده": <PackageCheck size={16} />,
  "ارسال شده": <Truck size={16} />,
  "در حال پردازش": <Loader size={16} className="animate-spin" />,
  "لغو شده": <Ban size={16} />,
};

const StatusBadge = ({ status, englishStatus }) => (
  <div
    className={`${styles.statusBadge} ${styles[englishStatus.toLowerCase()]}`}
  >
    {statusIcons[status]}
    <span>{status}</span>
  </div>
);

const OrderRow = ({ order, index }) => (
  <motion.tr
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <td className={styles.tableCell}>{order.id}#</td>
    <td className={styles.tableCell}>{order.date}</td>
    <td className={styles.tableCell}>{order.productsCount}</td>
    <td className={styles.tableCell}>
      {order.totalPrice.toLocaleString("fa-IR")} تومان
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
    className={styles.card}
  >
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
          {order.totalPrice.toLocaleString("fa-IR")} تومان
        </span>
      </div>
    </div>
  </motion.div>
);

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, ordersLoading, ordersError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrdersRequest());
    }
  }, [dispatch, orders.length]);

  const renderContent = () => {
    if (ordersLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
        </div>
      );
    }

    if (ordersError) {
      return (
        <div className={styles.stateContainer}>
          <p className={styles.errorText}>خطا: {ordersError}</p>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className={styles.stateContainer}>
          <p>سفارشی یافت نشد.</p>
        </div>
      );
    }

    return (
      <>
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
              {orders.map((order, index) => (
                <OrderRow key={order.id} order={order} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.mobileList}>
          {orders.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>تاریخچه سفارشات</h1>
        <p className={styles.subtitle}>
          سفارشات گذشته و فعلی خود را پیگیری کنید.
        </p>
      </header>

      <motion.div layout className={styles.content}>
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default Orders;
