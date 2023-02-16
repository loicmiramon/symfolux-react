import React from 'react'
import Navigation from '../../components/navigation/Navigation'
import { loginInterface } from '../../types/interface/index'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Toast, { notify } from '../../components/toast/Toast'
import instance from '../../http/http'


const Authentificationpage: React.FC = () => {

  const { register, handleSubmit, reset } = useForm<loginInterface>()
  const navigate = useNavigate();


  const handleAuth: SubmitHandler<loginInterface>  = (data: loginInterface) => {

    instance.post('/api/auth/login', {
      email: data.email,
      password: data.password
    }).then(res => {
      if(localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
      localStorage.setItem('token', res.data.token)
      instance.get('/api/auth/refresh-token').then(res => {
        if(localStorage.getItem('refreshToken')) {
          localStorage.removeItem('refreshToken')
        }
        localStorage.setItem('refreshToken', res.data.refreshToken)
      }).catch(err => {
        console.log(err)
      })
      notify("Vous êtes connecté, redirection en cours...", "success")
      reset()
      setTimeout(() => {
        navigate('/catalog')
      }, 3500)
    }).catch(err => {
      notify("Mot de passe ou email incorrect, veuillez réessayer", "error")
    })
  }

  return (
    <div id='authentificationpage'>
      <Navigation />
      <main id='authentificationpage-main'>
        <h1 className='title-authentification'>Authentification</h1>
        <form action="" className="form-authentification" onSubmit={handleSubmit(handleAuth)}>
          <Toast 
          />
          <div className="form-group-authentification">
            <input {...register('email')} type="email" name="email" id="email" placeholder='Email' required/>
          </div>
          <div className="form-group-authentification">
            <input {...register('password')} type="password" name="password" id="password" placeholder='Mot de passe' required/>
          </div>
          <button type="submit" className="btn-authentification">Se connecter</button>
          <div className="container-infos-auth">
            <p className='text-auth'>Pas encore inscrit ?</p><Link to='/register' className='link-auth'>S'inscrire</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Authentificationpage