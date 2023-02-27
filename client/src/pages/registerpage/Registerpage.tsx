import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Navigation from '../../components/navigation/Navigation'
import { registerInterface } from '../../types/interface/index'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '../../components/toast/Toast'
import { AuthContext } from '../../context/UserContext'
import Input from '../../components/form/InputForm'


const Registerpage: React.FC = () => {

  const { register, handleSubmit, reset } = useForm<registerInterface>();
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext)


  const handleRegister: SubmitHandler<registerInterface> = (data: registerInterface) => {
    registerUser(data.email, data.password, data.lastname, data.firstname)
    // instance.post('api/auth/register', {
    //   email: data.email,
    //   password: data.password,
    //   role: 'user',
    //   lastname: data.lastname,
    //   firstname: data.firstname,
    // }).then(res => {
    //   reset();
    //   notify("Vous êtes inscrit, redirection en cours...", "success")
    //   setTimeout(() => {
    //     navigate('/authentification');
    //     reset()
    //   }, 3500)
    // }).catch(err => {
    //   notify("Une erreur est survenue, vérifiez vos informations", "error")
    // })
  }

  return (
    <div id='registerpage'>
      <Navigation />
      <main id='registerpage-main'>
        <h1 className='title-register' >Register</h1>
        <form action="" className="form-register" onSubmit={ handleSubmit(handleRegister) }>
          <Toast /> 
          <Input 
            name='email'
            type='email'
            placeholder='Email'
            register={register("email")}
            id='mail'
          />
          <Input
            name='password'
            type='password'
            placeholder='Mot de passe'
            register={register("password")}
            id='password'
          />
          <Input
            name='lastname'
            type='text'
            placeholder='Nom'
            register= {register("lastname")}
            id='lastname'
          />
          <Input
            name='firstname'
            type='text'
            placeholder='Prénom'
            register={register("firstname")}
            id='firstname'
          />


          {/* <div className="form-group-register">
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
          </div> */}
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