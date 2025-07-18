import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../../services/api';
import { debounce } from 'lodash';

import LoadingSpinner from '../common/Loader';

import search from '../../assets/svgs/search.svg';
import search_black from '../../assets/svgs/search.svg';
import SearchResult from './SearchResult';

import classes from './Search.module.css';
const Search = ({ isHomePage = true }) => {
 const [isFullSize, setIsFullSize] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
 const { data, isLoading, isError, error } = useSearch(debouncedSearchTerm);
 const [resultDetail, setResultDetail] = useState([]);

 const searchRef = useRef();
 const { t } = useTranslation();

 const debouncedSearch = debounce(value => {
  setDebouncedSearchTerm(value);
 }, 300);

 const handleInputChange = e => {
  const value = e.target.value;
  setSearchTerm(value);
  debouncedSearch(value);
 };

 useEffect(() => {
  if (data && data.data.length > 0) {
   setResultDetail(data.data);
  }
 }, [data]);

 useEffect(() => {
  const handleClickOutside = event => {
   if (searchRef.current && !searchRef.current.contains(event.target)) {
    setIsFullSize(false);
   }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
 }, []);

 const handleMouseOut = () => {
  setIsFullSize(false);
 };

 const initial = {
  width: 0,
 };

 useEffect(() => {
  if (isFullSize) {
   document.body.style.overflowY = 'hidden';
  } else {
   document.body.style.overflowY = 'auto';
  }
 }, [isFullSize]);

 return (
  <motion.form
   ref={searchRef}
   className={classes.main}
   initial={initial}
   animate={{ width: isFullSize ? '250px' : 0 }}
   transition={{ duration: 0.25, type: 'tween' }}
   name='search-form'>
   <motion.input
    onChange={e => handleInputChange(e)}
    className={classes.search_input}
    type='text'
    name='search-input'
    placeholder={isFullSize ? 'جست و جو کنید ...' : ''}
    transition={{ duration: 0.25, type: 'tween' }}
    initial={{
     boxShadow: '0 0 5px rgb(154 154 154) 0px 3px 5px',
     background: 'rgba(0, 0, 0, 0)',
    }}
    animate={{
     boxShadow: isFullSize
      ? 'rgb(154 154 154) 0px 3px 5px'
      : '0 0 5px rgba(65, 65, 65, 0)',
     background: isFullSize ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0)',
    }}
   />
   <motion.div
    className={classes.search_logo_wrapper}
    onClick={() => setIsFullSize(true)}
    initial={{ border: '1.5px solid transparent' }}
    animate={{
     border: !isFullSize
      ? isHomePage
        ? '1.5px solid black'
        : '1.5px solid white'
      : '1px solid transparent',
    }}>
    <motion.img
     className={classes.search_logo}
     src={isHomePage ? search_black : isFullSize ? search_black : search}
     alt='search logo'
     initial={{ width: '40%', height: '40%' }}
     animate={{
      width: isFullSize ? '50%' : '40%',
      height: isFullSize ? '50%' : '40%',
     }}
     transition={{ duration: 0.25, type: 'tween' }}
    />
   </motion.div>
   <motion.div
    className={classes.backdrop}
    initial={{ display: 'none' }}
    animate={{ display: isFullSize ? 'block' : 'none' }}
    onClick={handleMouseOut}
   />
   <motion.div
    className={classes.result_wrapper}
    initial={{ paddingTop: 0, height: 0 }}
    animate={{
     paddingTop: isFullSize && searchTerm.length > 0 ? '20px' : 0,
     height: isFullSize && searchTerm.length > 0 ? '400px' : 0,
    }}
    transition={{ delay: !isFullSize ? 0 : 0.5 }}>
    {isLoading && <LoadingSpinner size={'20px'} />}

    <div className={classes.sheet}>
     {resultDetail.length > 0 &&
      resultDetail.map(el => {
       return <SearchResult dataProp={el} />;
      })}
    </div>
   </motion.div>
   {searchQuery.length > 0 && (
    <button type='submit' className={classes.search_btn}>
     {t('search')}
    </button>
   )}
  </motion.form>
 );
};

export default Search;
