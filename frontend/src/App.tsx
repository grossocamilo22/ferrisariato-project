
import { useNavigate } from 'react-router-dom';
import './App.css'
import { useEffect } from 'react';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  return null; // No renderiza nada
 
  
}


