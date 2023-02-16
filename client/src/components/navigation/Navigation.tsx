import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo1.png'
import { CgProfile } from 'react-icons/cg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import instance from '../../http/http';

const Navigation = () => {

  const locationURL = useLocation()
  const navigate = useNavigate()
  const [isActiveNavLink, setIsActiveNavLink] = useState<string>(locationURL.pathname)
  const [isSubNavigationOpen, setIsSubNavigationOpen] = useState<boolean>(false)

  const notifyNavigation = (message: string, type: string) => {
    switch(type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      default:
        toast.error(message)
    }
  }

  const handleLogout = () => {
    instance.post('/api/auth/logout').then(() => {
      notifyNavigation("Vous êtes déconnecté, redirection en cours...", "success")
      setTimeout(() => {
        navigate('/')
      }, 3500)
    }).catch((err) => {
      notifyNavigation("Une erreur est survenue", "error")
      console.log("err", err)
    })
  }

  return (
    <div className="navigation-container">
      {
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> 
      }
      <div className="box-logo">
        <img src={logo} alt="Logo Photographe" className="logo" />
      </div>
      <nav className='navigation'>
        <Link className={isActiveNavLink === "/" ? "link-navigation active-link" : "link-navigation"} to="/" title='Accueil'>Accueil</Link>
        <Link className={isActiveNavLink === "/catalog" ? "link-navigation active-link" : "link-navigation"} to="/catalog" title='Produit'>Catalogue</Link>
        <div className="container-subnavigation" onClick={() => setIsSubNavigationOpen(!isSubNavigationOpen)}>
          <CgProfile color='var(--color-black)' size="1.8em"/>
          <ul className={isSubNavigationOpen ? "list-subnavigation active" : "list-subnavigation"}>
            <li className="item-subnavigation">
              <Link className={isActiveNavLink === "/order" ? "link-navigation active-link" : "link-navigation"} to="/order" title='Commande'>Commandes</Link>
            </li>
            <li className="item-subnavigation">
              <p className='btn-logout' onClick={handleLogout}>Déconnexion</p>
            </li>
          </ul>
        </div>
      </nav>
      
    </div>
  )
}

export default Navigation