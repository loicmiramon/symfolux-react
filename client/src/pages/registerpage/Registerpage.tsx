import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Navigation from '../../components/navigation/Navigation'
import { registerInterface } from '../../types/interface/index'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Toast, { notify } from '../../components/toast/Toast'
import instance from '../../http/http'

const Registerpage: React.FC = () => {

  const { register, handleSubmit, reset } = useForm<registerInterface>();
  const navigate = useNavigate();


  const handleRegister: SubmitHandler<registerInterface> = (data: registerInterface) => {
    instance.post('api/auth/register', {
      email: data.email,
      password: data.password,
      role: 'user',
      lastname: data.lastname,
      firstname: data.firstname,
    }).then(res => {
      reset();
      notify("Vous êtes inscrit, redirection en cours...", "success")
      setTimeout(() => {
        navigate('/authentification');
        reset()
      }, 3500)
    }).catch(err => {
      notify("Une erreur est survenue, vérifiez vos informations", "error")
    })
  }

  return (
    <div id='registerpage'>
      <Navigation />
      <main id='registerpage-main'>
        <h1 className='title-register' >Register</h1>
        <form action="" className="form-register" onSubmit={ handleSubmit(handleRegister) }>
          <Toast /> 
          <div className="form-group-register">
            <input {...register('email')} type="email" name="email" id="email" placeholder='Email' required/>
          </div>
          <div className="form-group-register">
            <input {...register('password')} type="password" name="password" id="password" placeholder='Mot de passe' required/>
          </div>
          <div className="form-group-register">
            <input {...register('lastname')} type="text" name="lastname" id="lastname" placeholder='Nom' required/>
          </div>
          <div className="form-group-register">
            <input {...register('firstname')} type="text" name="firstname" id="firstname" placeholder='Prénom' required/>
          </div>
          <button type="submit" className="btn-register">S'inscrire</button>
          <div className="container-infos-register">
            <p className='text-register'>Déjà inscrit ?</p><Link to='/authentification' className='link-register'>Se connecter</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Registerpage