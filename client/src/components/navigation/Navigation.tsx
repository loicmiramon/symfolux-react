import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo/logo1.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'


const Navigation = () => {

  const locationURL = useLocation()
  const [isActiveNavLink, setIsActiveNavLink] = useState<string>(locationURL.pathname)

  return (
    <div className="navigation-container">
      <div className="box-logo">
        <img src={logo} alt="Logo Photographe" className="logo" />
      </div>
      <nav className='navigation'>
        <Link className={isActiveNavLink === "/" ? "link-navigation active-link" : "link-navigation"} to="/" title='Accueil'>Accueil</Link>
        <Link className={isActiveNavLink === "/product" ? "link-navigation active-link" : "link-navigation"} to="/product" title='Produit'>Produits</Link>
      </nav>
      
    </div>
  )
}

export default Navigation