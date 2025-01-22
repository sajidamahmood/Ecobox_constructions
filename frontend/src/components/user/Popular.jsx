import React from 'react';
import StockItem from './StockItem';
import './Popular.css'; 

const Popular = () => (
  <div className="popular-stocks">
    <h3>Populaire Projet</h3>
    <StockItem name="
Constructions d'extensions" price="$1839.00" change={10} />
    <StockItem name="Rénovation intérieure" price="$1000.00" change={-10} />
    <StockItem name="Rénovation extérieure" price="$2000.00" change={10} />
  </div>
);

export default Popular;
