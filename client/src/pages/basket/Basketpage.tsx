import React from 'react'
import Navigation from '../../components/navigation/Navigation'

const Basketpage: React.FC = () => {
  return (
    <div id="basketpage">
      <Navigation />
      <main id="basketpage-main">
        <h1 className="title-basket">Votre Panier</h1>
      </main>
    </div>
  )
}

export default Basketpage