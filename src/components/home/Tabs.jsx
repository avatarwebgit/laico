import { Tabs as AntdTabs } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Content from '../common/Content';

import classes from './Tabs.module.css';
const Tabs = ({ items, title }) => {
 const [activeKey, setActiveKey] = useState('1');

 const onChange = key => {
  setActiveKey(key);
 };

 return (
  <Content>
   <div className={classes.main}>
    <AntdTabs
     defaultActiveKey='1'
     activeKey={activeKey}
     items={items.map(item => ({
      ...item,
      children: (
       <motion.div
        key={activeKey}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {item.children}
       </motion.div>
      ),
     }))}
     onChange={onChange}
    />
    <h4 className={classes.title}>{title}</h4>
   </div>
  </Content>
 );
};

export default Tabs;
