import React from 'react';

const StockItem = ({ name, price, change }) => (
  <div className="stock-item">
    <p>{name}</p>
    <p>{price}</p>
    <p className={change > 0 ? 'profit' : 'loss'}>{change}%</p>
  </div>
);

export default StockItem;
