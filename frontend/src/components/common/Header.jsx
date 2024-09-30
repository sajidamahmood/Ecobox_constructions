import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../assets/images/logo.jpg'


const Header = () => {
  return (
    <header>
    <div className='container py-3'>

        <Navbar expand="lg">
        <Navbar.Brand href="/" className='logo'>
        <img 
            src={logoImg} alt="Logo" 
            style={{ height: '100px', width: 'auto' }}/>
            <h6 className='name'>Ecobox</h6>
            </Navbar.Brand>
                      

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"> 
    <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
    <Nav.Link href="/About" className='nav-link'>About</Nav.Link>
    <Nav.Link href="/Services" className='nav-link'>Services</Nav.Link>
    <Nav.Link href="/Projects" className='nav-link'>Projects</Nav.Link>
    <Nav.Link href="/ContactUs" className='nav-link'>Contact Us</Nav.Link>
    <Nav.Link href="/Reservation" className='custom-btn'>Reservation</Nav.Link>
    </Nav>


    

        </Navbar.Collapse>
        </Navbar>

        </div>
</header>
  )
}

export default Header