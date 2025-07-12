import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Edit, Trash2, Plus, X } from 'lucide-react';
import styles from './Addresses.module.css';

const initialAddresses = [
 {
  id: 'addr1',
  firstName: 'Cosmo',
  lastName: 'Starlight',
  address: '123 Nebula Lane, Starship City',
  postalCode: '98765',
  isDefault: true,
 },
 {
  id: 'addr2',
  firstName: 'Galileo',
  lastName: 'Quasar',
  address: '456 Comet Trail, Planet Verde',
  postalCode: '54321',
  isDefault: false,
 },
];

const AddressFormModal = ({ isOpen, onClose, onSave, address }) => {
 const [formData, setFormData] = useState(
  address || { firstName: '', lastName: '', address: '', postalCode: '' },
 );

 React.useEffect(() => {
  setFormData(
   address || { firstName: '', lastName: '', address: '', postalCode: '' },
  );
 }, [address]);

 const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleSubmit = e => {
  e.preventDefault();
  onSave({ ...formData, id: address ? address.id : `addr_${Date.now()}` });
  onClose();
 };

 const formId = useId();

 if (!isOpen) return null;

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
     <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>
       {address ? 'Edit Address' : 'Add New Address'}
      </h2>
      <button onClick={onClose} className={styles.closeButton}>
       <X size={20} />
      </button>
     </div>

     <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formFieldsGrid}>
       <div className={styles.formGroup}>
        <label htmlFor={`${formId}-firstName`} className={styles.formLabel}>
         First Name
        </label>
        <input
         type='text'
         id={`${formId}-firstName`}
         name='firstName'
         value={formData.firstName}
         onChange={handleChange}
         required
         className={styles.formInput}
        />
       </div>
       <div className={styles.formGroup}>
        <label htmlFor={`${formId}-lastName`} className={styles.formLabel}>
         Last Name
        </label>
        <input
         type='text'
         id={`${formId}-lastName`}
         name='lastName'
         value={formData.lastName}
         onChange={handleChange}
         required
         className={styles.formInput}
        />
       </div>
      </div>
      <div className={styles.formGroup}>
       <label htmlFor={`${formId}-address`} className={styles.formLabel}>
        Address
       </label>
       <textarea
        id={`${formId}-address`}
        name='address'
        value={formData.address}
        onChange={handleChange}
        required
        rows='3'
        className={styles.formTextarea}></textarea>
      </div>
      <div className={styles.formGroup}>
       <label htmlFor={`${formId}-postalCode`} className={styles.formLabel}>
        Postal Code
       </label>
       <input
        type='text'
        id={`${formId}-postalCode`}
        name='postalCode'
        value={formData.postalCode}
        onChange={handleChange}
        required
        className={styles.formInput}
       />
      </div>

      <div className={styles.formActions}>
       <motion.button
        type='button'
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${styles.formButton} ${styles.cancel}`}>
        Cancel
       </motion.button>
       <motion.button
        type='submit'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${styles.formButton} ${styles.save}`}>
        Save Address
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
  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  className={styles.card}>
  {address.isDefault && (
   <div className={styles.defaultBadge}>
    <MapPin size={16} />
   </div>
  )}
  <div className={styles.cardContent}>
   <p className={styles.cardName}>
    {address.firstName} {address.lastName}
   </p>
   <p className={styles.cardAddress}>{address.address}</p>
   <p className={styles.cardPostal}>Postal Code: {address.postalCode}</p>
  </div>
  <div className={styles.cardActions}>
   <button onClick={() => onEdit(address)} className={styles.actionButton}>
    <Edit size={16} />
   </button>
   <button
    onClick={() => onDelete(address.id)}
    className={`${styles.actionButton} ${styles.delete}`}>
    <Trash2 size={16} />
   </button>
  </div>
 </motion.div>
);

const Addresses = () => {
 const [addresses, setAddresses] = useState(initialAddresses);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingAddress, setEditingAddress] = useState(null);

 const handleOpenModal = (address = null) => {
  setEditingAddress(address);
  setIsModalOpen(true);
 };

 const handleCloseModal = () => {
  setIsModalOpen(false);
  setEditingAddress(null);
 };

 const handleSaveAddress = addressData => {
  setAddresses(prev =>
   editingAddress
    ? prev.map(addr => (addr.id === addressData.id ? addressData : addr))
    : [...prev, addressData],
  );
 };

 const handleDeleteAddress = id => {
  setAddresses(prev => prev.filter(addr => addr.id !== id));
 };

 return (
  <div className={styles.container}>
   <header className={styles.header}>
    <div className={styles.headerContent}>
     <h1 className={styles.title}>Your Addresses</h1>
     <p className={styles.subtitle}>
      Manage your shipping and billing addresses.
     </p>
    </div>
    <motion.button
     onClick={() => handleOpenModal()}
     whileHover={{ scale: 1.05, boxShadow: `0 0 20px #98ded930` }}
     whileTap={{ scale: 0.95 }}
     className={styles.addButton}>
     <Plus size={16} />
     Add New Address
    </motion.button>
   </header>

   <div className={styles.addressGrid}>
    <AnimatePresence>
     {addresses.map(addr => (
      <AddressCard
       key={addr.id}
       address={addr}
       onEdit={handleOpenModal}
       onDelete={handleDeleteAddress}
      />
     ))}
    </AnimatePresence>

    {addresses.length === 0 && (
     <div className={styles.emptyState}>
      <MapPin size={48} className={styles.emptyStateIcon} />
      <p>No addresses found.</p>
      <p>Add your first address to get started.</p>
     </div>
    )}
   </div>

   <AddressFormModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSave={handleSaveAddress}
    address={editingAddress}
   />
  </div>
 );
};

export default Addresses;
