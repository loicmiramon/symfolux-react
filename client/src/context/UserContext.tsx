import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { notify } from '../components/toast/Toast'
import instance from '../http/http'
import { AuthContextData, User } from '../types/interface';

interface props {
  children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<props> = ({ children }) => {
  const navigate = useNavigate();
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);



  const loginUser = (email: string, password: string) => {
    instance.post('/api/auth/login', {
        email,
        password
      }).then((res) => {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', res.data.token);

        if (localStorage.getItem('refreshtoken')) {
          localStorage.removeItem('refreshtoken');
        }
        localStorage.setItem('refreshtoken', res.data.refreshToken);
        notify('Vous êtes connecté, redirection en cours...', 'success');
        setTimeout(() => {
          navigate('/catalog');
        }, 3500);
      })
      .catch((err) => {
        notify('Mot de passe ou email incorrect, veuillez réessayer', 'error');
      });
  };

  const detectUser = () => {
    console.log('detectUser')
    instance.get('/api/auth/me').then((res) => {
      console.log('res', res)
        if (res.data) {
          setUser(res.data.user);
          setIsUserConnected(true);
        } else {
          setUser(null);
          setIsUserConnected(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setIsUserConnected(false);
          setUser(null);
        } else {
          console.log('Erreur lors de la récupération de l utilisateur connecté : ', err);
        }
      });
  };

  const logout = () => {
    instance.post('/api/auth/logout').then(() => {
      notify("Vous êtes déconnecté, redirection en cours...", "success")
      setTimeout(() => {
        navigate('/')
      }, 3500)
    }).catch((err) => {
      notify("Une erreur est survenue", "error")
      console.log("err", err)
    })
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsUserConnected(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isUserConnected, loginUser, detectUser, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
