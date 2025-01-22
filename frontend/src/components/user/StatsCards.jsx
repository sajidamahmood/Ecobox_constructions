import React from 'react';
import StatCard from './StatCard';
import './StatCard.css'; 

const StatsCards = () => (
  <div className="stats-cards">
    <StatCard title="Gain total" amount="$500.00" color="green" />
    <StatCard title="Dépenses totales" amount="$961" color="orange" />
    <StatCard title="Revenu total" amount="$203k" color="dark-blue" />
  </div>
);

export default StatsCards;
