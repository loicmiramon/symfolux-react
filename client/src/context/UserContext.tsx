import React, { createContext, useContext, useState, useEffect } from 'react';
import instance from '../http/http';

interface AuthContextProps {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  user?: UserContextInterface[] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserContextInterface {
  id : number;
  email : string;
  password : string;
  role : string;
  lastname : string;
  firstname : string;
}


const UserContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => { },
  logout: () => { },
  children: null
});

const UserProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextInterface[] | null>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await instance.get('/api/auth/me', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            refreshToken: `Bearer ${localStorage.getItem('refreshToken')}`
          }
        });
        setIsAuthenticated(true);
        setUser(res.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await instance.post('/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);

      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout
      }}
    >
     {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
