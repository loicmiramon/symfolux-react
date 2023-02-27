import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo1.png'
import { CgProfile } from 'react-icons/cg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import instance from '../../http/http';
import { AuthContext } from '../../context/UserContext';
import Item from './item/Item';

const Navigation = () => {

  const locationURL = useLocation()
  const navigate = useNavigate()
  const [isActiveNavLink, setIsActiveNavLink] = useState<string>(locationURL.pathname)
  const [isSubNavigationOpen, setIsSubNavigationOpen] = useState<boolean>(false)

  const { isUserConnected, logout } = useContext(AuthContext)


  // const notifyNavigation = (message: string, type: string) => {
  //   switch(type) {
  //     case 'success':
  //       toast.success(message)
  //       break
  //     case 'error':
  //       toast.error(message)
  //       break
  //     default:
  //       toast.error(message)
  //   }
  // }

  // const handleLogout = () => {
  //   instance.post('/api/auth/logout').then(() => {
  //     notifyNavigation("Vous êtes déconnecté, redirection en cours...", "success")
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 3500)
  //   }).catch((err) => {
  //     notifyNavigation("Une erreur est survenue", "error")
  //     console.log("err", err)
  //   })

  // }

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
        <Item 
          navType= 'navigation'
          isActiveNavLink={isActiveNavLink}
          name='Accueil'
          path='/'
        />
        <Item 
          navType= 'navigation'
          isActiveNavLink={isActiveNavLink}
          name='Catalogue'
          path='/catalog'
        />
        {
          isUserConnected ? 
          <div className="container-subnavigation" onClick={() => setIsSubNavigationOpen(!isSubNavigationOpen)}>
            <CgProfile className="icon-profile" size="1.8em" color='var(--color-white)' />
            <ul className={isSubNavigationOpen ? "list-subnavigation active" : "list-subnavigation"}>
              {
                isUserConnected ? 
                <Item
                  navType= 'subnavigation'
                  isActiveNavLink={isActiveNavLink}
                  name='Commandes'
                  path='/order'
                /> :
                null
              }
              {
                isUserConnected ? 
                <Item
                  navType= 'logout'
                  isActiveNavLink={isActiveNavLink}
                  name='Déconnexion'
                  path='/'
                /> :
                <Item
                  navType= 'subnavigation'
                  isActiveNavLink={isActiveNavLink}
                  name='Connexion'
                  path='/authentification'
                />
              }
            </ul>
          </div> : 
          <Item
            navType= 'navigation'
            isActiveNavLink={isActiveNavLink}
            name='Connexion'
            path='/authentification'
          />
        }
      </nav>
      
    </div>
  )
}

export default Navigation