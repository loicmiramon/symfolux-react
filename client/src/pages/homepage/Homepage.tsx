import React, { useEffect } from 'react'
import Navigation from '../../components/navigation/Navigation'
import instance from '../../http/http'

const Homepage: React.FC = () => {

  useEffect(() => {
    instance.get('/api/auth/me').then(res => {
      if(res.data) {
        console.log('Home : USER CONNECTED')
      } else {
        console.log("Vous n'êtes pas connecté")
      }
    })
  }, [])



  return (
    <div id='homepage'>
      <Navigation />
      <main id="homepage-main">
      </main>
    </div>
  )
}

export default Homepage