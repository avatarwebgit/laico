import { AnimatePresence, motion } from "framer-motion";
import { useFormik } from "formik";
import {
  CheckCircle,
  Edit,
  MapPin,
  Plus,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { openDeleteModal } from "../../redux/modal/modalActions";
import {
  addAddressRequest,
  deleteAddressRequest,
  fetchAddressesRequest,
  updateAddressRequest,
} from "../../redux/user/userActions";
import * as userActionTypes from "../../redux/user/userActionTypes";
import { persianRegex } from "../../utils/helperFucntions.jsx";
import Spinner from "../common/Spinner";
import styles from "./Addresses.module.css";

const AddressFormModal = ({ isOpen, onClose, onSave, address }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(persianRegex, "فقط از حروف فارسی استفاده کنید")
      .required("نام الزامی است"),
    lastName: Yup.string()
      .matches(persianRegex, "فقط از حروف فارسی استفاده کنید")
      .required("نام خانوادگی الزامی است"),
    address: Yup.string()
      .max(100, "آدرس نباید بیشتر از 100 کاراکتر باشد")
      .required("آدرس الزامی است"),
    postalCode: Yup.string()
      .matches(/^\d{10}$/, "کد پستی باید عددی و ۱۰ رقمی باشد")
      .required("کد پستی الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: address ? address.title.split(" ")[0] : "",
      lastName: address ? address.title.split(" ").slice(1).join(" ") : "",
      address: address ? address.address : "",
      postalCode: address ? address.postal_code : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: `${values.firstName} ${values.lastName}`,
        address: values.address,
        postal_code: values.postalCode,
        city_id: 1,
      };
      onSave({ ...payload, id: address ? address.id : undefined });
      formik.resetForm();
      onClose();
    },
  });

  const formId = useId();

  if (!isOpen) return null;

  const isSubmitted = formik.submitCount > 0;

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
            <h2 className={styles.modalTitle}>
              {address ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </h2>
            <button onClick={onClose} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className={styles.form}
            noValidate
          >
            <div className={styles.formFieldsGrid}>
              <div className={styles.formGroup}>
                <label
                  htmlFor={`${formId}-firstName`}
                  className={styles.formLabel}
                >
                  نام
                </label>
                <input
                  type="text"
                  id={`${formId}-firstName`}
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.formInput} ${
                    formik.touched.firstName && formik.errors.firstName
                      ? styles.inputError
                      : ""
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={styles.formError}>
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label
                  htmlFor={`${formId}-lastName`}
                  className={styles.formLabel}
                >
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  id={`${formId}-lastName`}
                  name="lastName"
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.formInput} ${
                    formik.touched.lastName && formik.errors.lastName
                      ? styles.inputError
                      : ""
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={styles.formError}>
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`${formId}-address`} className={styles.formLabel}>
                آدرس
              </label>
              <textarea
                maxLength={100}
                id={`${formId}-address`}
                name="address"
                {...formik.getFieldProps("address")}
                rows="3"
                className={`${styles.formTextarea} ${
                  formik.touched.address && formik.errors.address
                    ? styles.inputError
                    : ""
                }`}
              ></textarea>
              {formik.touched.address && formik.errors.address ? (
                <div className={styles.formError}>{formik.errors.address}</div>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor={`${formId}-postalCode`}
                className={styles.formLabel}
              >
                کد پستی
              </label>
              <input
                type="text"
                maxLength={10}
                id={`${formId}-postalCode`}
                name="postalCode"
                {...formik.getFieldProps("postalCode")}
                className={`${styles.formInput} ${
                  formik.touched.postalCode && formik.errors.postalCode
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <div className={styles.formError}>
                  {formik.errors.postalCode}
                </div>
              ) : null}
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
                      ? "تمام فیلدها معتبر هستند."
                      : "لطفا خطاهای فرم را برطرف کنید."}
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
                ذخیره آدرس
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AddressCard = ({ address, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={styles.card}
  >
    <div className={styles.cardContent}>
      <p className={styles.cardName}>{address.title}</p>
      <p className={styles.cardPostal}>کد پستی: {address.postal_code}</p>
      <p className={styles.cardAddress}> آدرس: {address.address}</p>
    </div>
    <div className={styles.cardActions}>
      <button onClick={() => onEdit(address)} className={styles.actionButton}>
        <Edit size={16} />
      </button>
      <button
        onClick={() => onDelete(address.id)}
        className={`${styles.actionButton} ${styles.delete}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  </motion.div>
);

const Addresses = () => {
  const dispatch = useDispatch();
  const { addresses, addressesLoading, addressesError } = useSelector(
    (state) => state.user
  );
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddressesRequest());
  }, [dispatch]);

  const handleOpenFormModal = (address = null) => {
    setEditingAddress(address);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      dispatch(updateAddressRequest(addressData.id, addressData));
    } else {
      dispatch(addAddressRequest(addressData));
    }
  };

  const handleDeleteClick = (address) => {
    dispatch(
      openDeleteModal({
        title: "حذف آدرس",
        message: ` آیا  از حذف آدرس با کد پستی  ${address.postal_code}  اطمینان دارید؟ این عمل قابل بازگشت نیست.`,
        confirmAction: {
          type: userActionTypes.DELETE_ADDRESS_REQUEST,
          payload: address.id,
        },
      })
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>آدرس‌های شما</h1>
          <p className={styles.subtitle}>
            آدرس‌های حمل و نقل و صورتحساب خود را مدیریت کنید.
          </p>
        </div>
        <motion.button
          onClick={() => handleOpenFormModal()}
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px #98ded930` }}
          whileTap={{ scale: 0.95 }}
          className={styles.addButton}
        >
          <Plus size={16} />
          افزودن آدرس جدید
        </motion.button>
      </header>

      <div className={styles.addressGrid}>
        <AnimatePresence>
          {addressesLoading && !addresses.length ? (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          ) : addressesError ? (
            <p className={styles.errorText}>خطا: {addressesError}</p>
          ) : addresses.length > 0 ? (
            addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onEdit={handleOpenFormModal}
                onDelete={() => handleDeleteClick(addr)}
              />
            ))
          ) : (
            !addressesLoading && (
              <div className={styles.emptyState}>
                <MapPin size={48} className={styles.emptyStateIcon} />
                <p>آدرسی یافت نشد.</p>
                <p>برای شروع اولین آدرس خود را اضافه کنید.</p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>

      <AddressFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveAddress}
        address={editingAddress}
      />
    </div>
  );
};

export default Addresses;
