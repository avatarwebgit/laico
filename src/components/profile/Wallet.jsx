import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle,
  PlusCircle,
  Wallet as WalletIcon,
  X,
  XCircle,
} from "lucide-react";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  fetchTransactionsRequest,
  fetchWalletRequest,
} from "../../redux/user/userActions";
import Spinner from "../common/Spinner";

import cashFlow from '../../assets/cashflow.gif'

import styles from "./Wallet.module.css";

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("مبلغ الزامی است")
    .positive("مبلغ باید مثبت باشد")
    .integer("مبلغ باید عدد صحیح باشد")
    .min(1000, "حداقل مبلغ ۱,۰۰۰ تومان است"),
});

const AddFundsModal = ({ isOpen, onClose, onAddFunds }) => {
  const quickAmounts = [50000, 100000, 250000, 500000];

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAddFunds(Number(values.amount));
      resetForm();
    },
  });

  const isSubmitted = formik.submitCount > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>افزایش موجودی کیف پول</h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="بستن"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="amount" className={styles.formLabel}>
                مبلغ به تومان
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                {...formik.getFieldProps("amount")}
                className={`${styles.formInput} ${
                  formik.touched.amount && formik.errors.amount
                    ? styles.inputError
                    : ""
                }`}
                placeholder="مبلغ مورد نظر را وارد کنید"
                min="1000"
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div className={styles.formError}>{formik.errors.amount}</div>
              ) : null}
            </div>
            <div className={styles.quickAmounts}>
              {quickAmounts.map((qa) => (
                <motion.button
                  key={qa}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.quickAmountButton}
                  onClick={() => formik.setFieldValue("amount", qa)}
                >
                  {qa.toLocaleString("fa-IR")}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  key={formik.isValid ? "success" : "error"}
                  className={`${styles.statusContainer} ${
                    formik.isValid ? styles.success : styles.error
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {formik.isValid ? (
                    <CheckCircle size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  <span>
                    {formik.isValid
                      ? "مبلغ معتبر است."
                      : "لطفا خطای فرم را برطرف کنید."}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={styles.formActions}>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.formButton} ${styles.cancel}`}
              >
                انصراف
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.formButton} ${styles.save}`}
              >
                پرداخت
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Wallet = () => {
  const dispatch = useDispatch();
  const {
    wallet,
    walletLoading,
    walletError,
    transactions,
    transactionsLoading,
    transactionsError,
  } = useSelector((state) => state.user);

  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!wallet) dispatch(fetchWalletRequest());
    if (transactions.length === 0) dispatch(fetchTransactionsRequest());
  }, [dispatch, wallet, transactions.length]);

  useEffect(() => {
    if (wallet) {
      setBalance(wallet.balance);
    }
  }, [wallet]);

  const handleAddFunds = (amount) => {
    const newTx = {
      id: `TXN${Date.now().toString().slice(-4)}`,
      date: new Date()
        .toLocaleDateString("fa-IR-u-nu-latn", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"),
      type: "افزایش موجودی",
      amount,
      status: "موفق",
    };
    // In a real app, this would dispatch an action to the backend
    // For now, it performs an optimistic update on local state.
    setBalance((prev) => prev + amount);
    setIsModalOpen(false);
  };

  const TransactionRow = ({ tx, index }) => (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <td className={styles.tableCell}>{tx.id}</td>
      <td className={styles.tableCell}>{tx.date}</td>
      <td className={`${styles.tableCell} ${styles.typeCell}`}>
        {tx.amount > 0 ? (
          <ArrowUpCircle size={18} className={styles.creditIcon} />
        ) : (
          <ArrowDownCircle size={18} className={styles.debitIcon} />
        )}
        <span>{tx.type}</span>
      </td>
      <td
        className={`${styles.tableCell} ${
          tx.amount > 0 ? styles.credit : styles.debit
        }`}
      >
        {tx.amount.toLocaleString("fa-IR")} تومان
      </td>
      <td className={styles.tableCell}>
        <span
          className={`${styles.statusBadge} ${
            styles[tx.status === "موفق" ? "successful" : "failed"]
          }`}
        >
          {tx.status === "موفق" ? (
            <CheckCircle size={14} />
          ) : (
            <XCircle size={14} />
          )}
          {tx.status}
        </span>
      </td>
    </motion.tr>
  );

  const TransactionCard = ({ tx, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardType}>
          {tx.amount > 0 ? (
            <ArrowUpCircle size={20} className={styles.creditIcon} />
          ) : (
            <ArrowDownCircle size={20} className={styles.debitIcon} />
          )}
          <h3 className={styles.cardTitle}>{tx.type}</h3>
        </div>
        <span
          className={`${styles.statusBadge} ${
            styles[tx.status === "موفق" ? "successful" : "failed"]
          }`}
        >
          {tx.status}
        </span>
      </div>
      <div className={styles.cardBody}>
        <p
          className={`${styles.cardAmount} ${
            tx.amount > 0 ? styles.credit : styles.debit
          }`}
        >
          {tx.amount.toLocaleString("fa-IR")} تومان
        </p>
        <p className={styles.cardDate}>{tx.date}</p>
      </div>
      {tx.description && (
        <p className={styles.cardDescription}>{tx.description}</p>
      )}
    </motion.div>
  );

  const renderTransactions = () => {
    if (transactionsLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
        </div>
      );
    }

    if (transactionsError) {
      return (
        <div className={styles.stateContainer}>
          <p className={styles.errorText}>خطا: {transactionsError}</p>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className={styles.stateContainer}>
          <p>تراکنشی یافت نشد.</p>
        </div>
      );
    }

    return (
      <>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>شناسه</th>
                <th className={styles.tableHeader}>تاریخ</th>
                <th className={styles.tableHeader}>نوع</th>
                <th className={styles.tableHeader}>مبلغ</th>
                <th className={styles.tableHeader}>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <TransactionRow key={tx.id} tx={tx} index={index} />
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.mobileList}>
          {transactions.map((tx, index) => (
            <TransactionCard key={tx.id} tx={tx} index={index} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>کیف پول شما</h1>
        <p className={styles.subtitle}>
          موجودی خود را مدیریت کرده و تراکنش‌ها را مشاهده کنید.
        </p>
      </header>

      <motion.div
        className={styles.balanceCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {walletLoading ? (
          <Spinner />
        ) : (
          <div className={styles.balanceInfo}>
            <span className={styles.balanceLabel}>موجودی فعلی</span>
            <span className={styles.balanceAmount}>
              {balance.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}
        {/* <motion.button
          onClick={() => setIsModalOpen(true)}
          className={styles.addFundsButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={20} />
          <span>افزایش موجودی</span>
        </motion.button>*/}
      </motion.div> 

      <div className={styles.historySection}>
        <h2 className={styles.historyTitle}>تاریخچه تراکنش‌ها</h2>
        {renderTransactions()}
      </div>

      <AddFundsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
};

export default Wallet;
