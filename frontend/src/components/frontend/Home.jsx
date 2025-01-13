import React from 'react'
import HeaderNavigation from '../common/HeaderNavigation'
import MainBanner from '../common/MainBanner'
import UpperBar from '../common/UpperBar'; 
import HowItWorksSection from "../frontend/HowItWorksSection";
import ServiceDetails from "../frontend/ServiceDetails";
import ProjectDetails from "../frontend/ProjectDetails";
import QualitySection from "../frontend/QualitySection";
import FooterBanner from '../common/FooterBanner';





const Home = () => {
  return (
    <>
    <UpperBar/>
    <HeaderNavigation />
<main>  
    <MainBanner />
    <HowItWorksSection />
    <ServiceDetails/>
    <QualitySection/>
    <ProjectDetails/>

</main>
<FooterBanner />

</>
  )
}

export default Home