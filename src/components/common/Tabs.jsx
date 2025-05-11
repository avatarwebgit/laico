import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button'; // Assuming these are correctly set up
// import { cn } from '@/lib/utils'; // Assuming this is correctly set up

// Mock Button and cn for a standalone example
const Button = ({ className, ...props }) => (
 <button className={className} {...props} />
);
const cn = (...args) => args.filter(Boolean).join(' ');

const Tabs = ({
 tabs,
 defaultValue,
 className,
 tabListClassName,
 tabPanelClassName,
 onTabChange,
 variant = 'default',
 size = 'default',
 withAnimation = true,
 animationType = 'fade',
 align = 'start',
}) => {
 const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
 const containerRef = useRef(null);
 const underlineRef = useRef(null);

 const getTabPosition = useCallback(tabValue => {
  if (!containerRef.current) return { left: 0, width: 0 };
  const tabElement = containerRef.current.querySelector(
   `[data-tab-value="${tabValue}"]`,
  );
  if (!tabElement) return { left: 0, width: 0 };
  const { offsetLeft, offsetWidth } = tabElement;
  return { left: offsetLeft, width: offsetWidth };
 }, []);

 useEffect(() => {
  if (defaultValue) {
   setActiveTab(defaultValue);
  } else {
   setActiveTab(tabs[0]?.value);
  }
 }, [defaultValue, tabs]);

 useEffect(() => {
  if (activeTab && underlineRef.current) {
   const { left, width } = getTabPosition(activeTab);
   underlineRef.current.style.left = `${left}px`;
   underlineRef.current.style.width = `${width}px`;
  }
 }, [activeTab, getTabPosition]);

 const handleTabClick = tabValue => {
  setActiveTab(tabValue);
  onTabChange?.(tabValue);
 };

 const baseTabClasses = cn(
  'relative px-4 py-2 transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
  'whitespace-nowrap',
  {
   'text-gray-500 hover:text-gray-700': variant === 'default',
   'text-gray-300 hover:text-white': variant === 'outline',
   'text-gray-500 hover:text-gray-900': variant === 'ghost',
   'text-sm': size === 'sm',
   'text-lg': size === 'lg',
  },
 );

 const activeTabClasses = cn({
  'text-blue-600': variant === 'default',
  'text-white': variant === 'outline',
  'text-gray-900': variant === 'ghost',
 });

 const basePanelClasses = cn('p-4', {
  'opacity-0': withAnimation && animationType === 'fade',
  'translate-y-4': withAnimation && animationType === 'slide',
 });

 const getPanelAnimationProps = isActive => {
  if (!withAnimation) return {};

  const baseProps = {
   initial: { opacity: 0, y: animationType === 'slide' ? 20 : 0 },
   animate: { opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 },
   exit: { opacity: 0, y: animationType === 'slide' ? -20 : 0 },
   transition: { duration: 0.3 },
  };

  if (animationType === 'fade') {
   return {
    initial: { opacity: 0 },
    animate: { opacity: isActive ? 1 : 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
   };
  }

  return baseProps;
 };

 const alignClasses = () => {
  switch (align) {
   case 'start':
    return 'justify-start';
   case 'center':
    return 'justify-center';
   case 'end':
    return 'justify-end';
   default:
    return 'justify-start';
  }
 };

 return (
  <div className={cn('w-full', className)}>
   <div
    ref={containerRef}
    className={cn(
     'relative flex',
     alignClasses(),
     'border-b border-gray-200',
     tabListClassName,
    )}>
    {tabs.map(tab => (
     <Button
      key={tab.value}
      data-tab-value={tab.value}
      onClick={() => !tab.disabled && handleTabClick(tab.value)}
      className={cn(
       baseTabClasses,
       activeTab === tab.value
        ? activeTabClasses
        : 'text-gray-500 hover:text-gray-700',
       tab.disabled && 'opacity-50 cursor-not-allowed',
      )}
      variant='ghost'
      size={size}
      style={{ padding: '0.5rem 1rem' }}>
      {tab.icon && <span className='mr-2'>{tab.icon}</span>}
      {tab.label}
     </Button>
    ))}
    <motion.div
     ref={underlineRef}
     className='absolute bottom-0 h-1 bg-blue-500 transition-all duration-300'
     style={{ left: 0, width: 0 }}
    />
   </div>
   <div className={cn('w-full', tabPanelClassName)}>
    <AnimatePresence mode='wait'>
     {tabs.map(tab => {
      const isActive = activeTab === tab.value;
      return (
       isActive && (
        <motion.div
         key={tab.value}
         {...getPanelAnimationProps(isActive)}
         className={basePanelClasses}>
         {/* You would render the content here, possible using children prop */}
         {tab.label} Content
        </motion.div>
       )
      );
     })}
    </AnimatePresence>
   </div>
  </div>
 );
};

export default Tabs;
