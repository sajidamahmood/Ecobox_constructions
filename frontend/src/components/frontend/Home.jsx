import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import AboutImg from '../../assets/images/aboutUS.jpg'
import ServiceImg1 from '../../assets/images/plomber.jpg'
import ServiceImg2 from '../../assets/images/Electrician.jpg'
import ServiceImg3 from '../../assets/images/flooring.jpg'
import ServiceImg from '../../assets/images/painter1.jpg'
import ConstructionImg from '../../assets/images/construction2.jpg'
import ConstructionImg1 from '../../assets/images/construction7.jpg'
import ConstructionImg2 from '../../assets/images/construction13.jpeg'
import ConstructionImg3 from '../../assets/images/construction14.jpg'

import teleImg from '../../assets/images/telephone.jpg'
import Icon1 from '../../assets/images/icon-1.svg'
import Icon2 from '../../assets/images/icon-2.svg'
import Icon3 from '../../assets/images/icon-3.svg'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import avartarImg from '../../assets/images/author-2.jpg'
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';




const Home = () => {
  return (
    <>
<Header/>

<main>
<section className='section-1'>
    <div className='hero d-flex align-items-center'>
        <div className='container-fluid'>
            <div className='text-center'>
                <span>Welcome to Amazing Constructions</span>
                <h1>Crafting dream with <br/>precision and excellence.</h1>
                <p>We excel at transforming vision into reality through outstanding craftsmanship and precise<br/> arrention to details,with years of experince and dedication of qulity</p>
               
            </div>

        </div>
    </div> 
</section>
{/*phone section*/}

<section className='section-1a bg-light pt-4'>
    <div className='hero d-flex align-items-center'>
        <div className='container'>
            <div className='text-center'>
                <span>One call can solve all your home problems</span>
                <div>
                <img src={teleImg} className='w-10' alt="telephone"/>

                </div>
                <h1>0808-000-8888</h1>
                <div className='mt 4'>
                <a className='btn-btn-primary'>Contact Now</a>
                </div>
            </div>

        </div>
    </div> 
    </section>

{/*About section*/}

<section className='section-2 py-5'>
    <div className='container py-5'>
        <div className='row'>
            <div className='col-md-6'>
                <img src={AboutImg} className='w-100' alt="About us"/>
            </div>
            <div className='col-md-6'>
                <span>About us</span>
                <h2>Crafting structure that last a lifetime</h2>
                <p>We bring a high level of involvement, engaged communication and an innovative, problem-solving approach focused on building lasting client partnerships. </p>

                <p>We start with active listening, finding ways to create the most value for your investment. Through our delivery methods, cutting-edge technology.
                </p>

            </div>
        </div>

    </div>

</section>

{/*Our service  section*/}
<section className='section-3 bg-light py-5'>
<div className='container-fluid  py-5'>
<div className='section-header text-center'>
    <span>
        Our Services
    </span>
    <h2>Our construction services</h2>
    <p>We offer a diverse construction services,spanning residential,commercial,and industrial projects.</p>
</div>
<div className='row pt-4'>
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ServiceImg} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Service Speciality Construction</h3>
                </div>
                <div className='service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                </div>
                <a href="#" className='btn btn-primary'>Read More</a>
            </div>
        </div>
    </div>
    {/* Repeat for other cards */}
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ServiceImg1} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Service Speciality Construction</h3>
                </div>
                <div className='service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                </div>
                <a href="#" className='btn btn-primary'>Read More</a>
            </div>
        </div>
    </div>
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ServiceImg2} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Service Speciality Construction</h3>
                </div>
                <div className='service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                </div>
                <a href="#" className='btn btn-primary'>Read More</a>
            </div>
        </div>
    </div>
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ServiceImg3} alt="" className='w-100'/>
            </div>
            <div className='service-body'>
                <div className='service-title'>
                    <h3>Service Speciality Construction</h3>
                </div>
                <div className='service-content'>
                    <p>Speciality construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                </div>
                <a href="#" className='btn btn-primary'>Read More</a>
            </div>
        </div>
    </div>

   
</div>
</div>
</section>
{/*Why choose Us*/}
<section className='section-4 py-5'>
    <div className='container py-5'>
    <div className='section-header text-center'>
    <span>
    Why choose Us
    </span>
    <h2>Discover our diverse range of Projects</h2>
    <p>Created in close partnershiop with our clints and collaborators,this approach merge industry expertise,<br />decades of experince,innovation,and flexibility to consistantly dilver excellence.</p>
</div>
    <div className='row pt-4'>   
        <div className='col-md-4'>
            <div className='card shadow border-0 p-4'>
                <div className='card-icon'>
                    <img src={Icon1} alt="" />
                </div>
                    <div className='card-title'>
                        <h3>Cutting Edge Solutions</h3>
                    </div>
                             <p>
                                Small actions create big impacts. it all begins and ends with each employee commiting to safe wortk practice daily,ensuring they return home safety.
                            </p>
                        
            </div>

        </div>
        <div className='col-md-4'>
            <div className='card shadow border-0 p-4'>
                <div className='card-icon'>
                    <img src={Icon2} alt="" />
                </div>
                    <div className='card-title'>
                        <h3>Cutting Edge Solutions</h3>
                    </div>
                             <p>
                                Small actions create big impacts. it all begins and ends with each employee commiting to safe wortk practice daily,ensuring they return home safety.
                            </p>
                        
            </div>

        </div>
        <div className='col-md-4'>
            <div className='card shadow border-0 p-4'>
                <div className='card-icon'>
                    <img src={Icon3} alt="" />
                </div>
                    <div className='card-title'>
                        <h3>Cutting Edge Solutions</h3>
                    </div>
                             <p>
                                Small actions create big impacts. it all begins and ends with each employee commiting to safe wortk practice daily,ensuring they return home safety.
                            </p>        
                    </div>

        </div>
    </div>
    
</div>
</section>

{/*Our Projects*/}
<section className='section-3 bg-light py-5'>
<div className='container-fluid  py-5'>
<div className='section-header text-center'>
    <span>
        Our Projects
    </span>
    <h2>Discover our diverse range of Projects</h2>
    <p>We offer a diverse construction services,spanning residential,commercial,and industrial projects.</p>
</div>
<div className='row pt-4'>
    <div className='col-md-3 col-lg-3'>
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
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg1} alt="" className='w-100'/>
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
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg2} alt="" className='w-100'/>
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
    <div className='col-md-3 col-lg-3'>
        <div className='items'>
            <div className='service-image'>
                <img src={ConstructionImg3} alt="" className='w-100'/>
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

{/*Testimonial*/}
<section className='section-5 py-5'>
    <div className='container'>
    <div className='section-header text-center'>
    <span>
    Testimonials
    </span>
    <h2>What people are saying about us</h2>
    <p>We offer a diverse construction services,spanning residential,commercial,and industrial projects.</p>
</div>
<Swiper
      modules={[ Pagination]}

      spaceBetween={50}
      slidesPerView={3}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className='card shadow border-0'>
            <div className='card-body p-5'>
                <div className='rating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                </div>
                <div className='content pt-3 pb-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium in porro dolorum nihil, tenetur eligendi ducimus laudantium adipisci ad eaque iste iure est repellat consequuntur autem libero amet ut?</p>
                    <hr />
                    <div className='d-flex'>
                        <div>
                            <img src={avartarImg} alt="" w-50/>
                        </div>
                        <div>
                            <div>john Doe</div>
                            <div>CEO</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card shadow border-0'>
            <div className='card-body p-5'>
                <div className='rating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                </div>
                <div className='content pt-3 pb-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium in porro dolorum nihil, tenetur eligendi ducimus laudantium adipisci ad eaque iste iure est repellat consequuntur autem libero amet ut?</p>
                    <hr />
                    <div className='d-flex'>
                        <div>
                            <img src={avartarImg} alt="" w-50/>
                        </div>
                        <div>
                            <div>john Doe</div>
                            <div>CEO</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card shadow border-0'>
            <div className='card-body p-5'>
                <div className='rating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                </div>
                <div className='content pt-3 pb-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium in porro dolorum nihil, tenetur eligendi ducimus laudantium adipisci ad eaque iste iure est repellat consequuntur autem libero amet ut?</p>
                    <hr />
                    <div className='d-flex'>
                        <div>
                            <img src={avartarImg} alt="" w-50/>
                        </div>
                        <div>
                            <div>john Doe</div>
                            <div>CEO</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card shadow border-0'>
            <div className='card-body p-5'>
                <div className='rating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                </div>
                <div className='content pt-3 pb-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium in porro dolorum nihil, tenetur eligendi ducimus laudantium adipisci ad eaque iste iure est repellat consequuntur autem libero amet ut?</p>
                    <hr />
                    <div className='d-flex'>
                        <div>
                            <img src={avartarImg} alt="" w-50/>
                        </div>
                        <div>
                            <div>john Doe</div>
                            <div>CEO</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </SwiperSlide>

    </Swiper>
    </div>


</section>

{/*Our Blogs*/}

</main>

<Footer/>

</>
  )
}

export default Home