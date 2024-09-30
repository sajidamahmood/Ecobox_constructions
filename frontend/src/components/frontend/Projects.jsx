import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import ConstructionImg from '../../assets/images/construction2.jpg'


const Projects = () => {
  return (
    <>
    <Header/>

    <main>  
    <Hero 
        preHeading="Quality. Integrity. Value" 
        heading="Our Projects" 
        text="We offer diverse construction services, spanning residential, <br/>commercial, and industrial projects."/>

<section className='section-3 bg-light py-5'>
<div className='container  py-5'>
<div className='section-header text-center'>
    <span>
        Our Projects
    </span>
    <h2>Discover our diverse range of Projects</h2>
    <p>We offer a diverse construction services,spanning residential,commercial,and industrial projects.</p>
</div>
<div className='row pt-4'>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Commercial Project</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>

        </div>

    </div>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Private Projects</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>
        </div>

    </div>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Semi-commercial Projects</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>

        </div>

    </div>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Dream Projects</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>

        </div>

    </div>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Dream Projects</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>

        </div>

    </div>
    <div className='col-md-4 col-lg-4'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Dream Projects</h3>
                </div>
                <div className='Service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focus on projects requiring specialized skills,materials,and techniques.</p>
                    </div>
                    <a herf="#" className='btn-btn-primary'>Read More</a>

            </div>

        </div>

    </div>

</div>
</div>
</section>
      

    </main>
    <Footer/>

    
    </>
  )
}

export default Projects