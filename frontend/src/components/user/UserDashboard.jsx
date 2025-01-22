import React from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import ChartSection from './ChartSection';
import Popular from './Popular';
import './UserDashboard.css'; 
const UserDashboard = () => (
  <div className="user-dashboard">
    <Header />
    <StatsCards />
    <ChartSection />
    <Popular />
  </div>
);

export default UserDashboard;
