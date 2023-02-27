import React, { useEffect, useContext } from 'react'
import Navigation from '../../components/navigation/Navigation'
import { AuthContext } from '../../context/UserContext';

const Homepage: React.FC = () => {

  const { detectUser, isUserConnected, user } = useContext(AuthContext)

  useEffect(() => {
    detectUser()
  }, [])


  return (
    <div id='homepage'>
      <Navigation />
      <main id="homepage-main">
        {
          isUserConnected ? <h1>Connecter en tant que {user?.firstname} {user?.lastname}</h1> : <h1>Vous n'êtes pas connecté</h1>
        }
      </main>
    </div>
  )
}

export default Homepage