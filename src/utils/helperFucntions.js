import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

export const toPersianNumber = num => {
 const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
 return num.toString().replace(/\d/g, digit => persianDigits[digit]);
};

export const scrollToTarget = (targetRef, headerHeight = 80) => {
 // Default headerHeight is 5rem (80px)
 if (targetRef.current) {
  const elementPosition =
   targetRef.current.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerHeight;

  window.scrollTo({
   top: offsetPosition,
   behavior: 'smooth',
  });
 }
};

export function formatNumber(amount, currency = 'toman') {
 const value = currency === 'toman' ? amount / 10 : amount;

 const formatted = new Intl.NumberFormat('fa-IR').format(value);

 return (
  <div style={{whiteSpace:'nowrap'}}>
   {currency === 'toman' ? ` ${formatted} تومان` : `${formatted} ریال`}
  </div>
 );
}

export const notify = message =>
 toast(message, {
  style: { fontSize: '12px' },
 });

export const useNavigation = () => {
 const navigate = useNavigate();

 const navigateTo = route => {
  navigate(route);
 };

 return { navigateTo };
};

export const title = string => {
 document.title = `${string}`;
};
