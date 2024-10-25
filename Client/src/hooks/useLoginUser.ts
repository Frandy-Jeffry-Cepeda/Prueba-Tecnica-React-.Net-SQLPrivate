import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUserDataSchema } from '../types'; 
import { login } from '../services/Services';

export const useLoginUser = () => {

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loginUser = async (data: LoginUserDataSchema) => {

    setLoading(true);
    setLoginError(null);

    try {

      const response = await login(data);

      localStorage.setItem("token", response.token);

      if (response.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'Employee') {
        navigate('/user/home');
      } else {
        setLoginError("Rol no reconocido.");
      }
  
    } catch (error) {
      setLoginError("Login failed: " + (error as Error).message),
      setTimeout(() => {
        setLoginError(null)
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
    loginError
  };
};
