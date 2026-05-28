import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../../../core/api/axios';
import '../styles/login.scss';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Estados de control de la petición
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Petición real a tu controlador auth.controller.ts -> POST /api/auth/login
      const response = await api.post('/auth/login', { email, password });
      
      // Asumiendo que tu backend responde con: { token: '...', user: { id, nombre, email, role } }
      const { token, user } = response.data;

      // Guardamos la sesión usando nuestra lógica automatizada de Zustand y Storage
      setLogin(token, user, rememberMe);
      
      // Redirigimos al área segura (Dashboard)
      navigate('/');
    } catch (error: any) {
      console.error("Error en autenticación:", error);
      setErrorMessage(
        error.response?.data?.message || 
        'Credenciales inválidas o servidor inalcanzable. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="aura-login">
      <div className="aura-login__card">
        <div className="aura-login__body">
          
          <div className="aura-login__brand">
            <div className="aura-login__logo">A</div>
            <span className="aura-login__app-name">Aura ITSM</span>
          </div>

          <div className="aura-login__intro">
            <h2>Bienvenido</h2>
            <p>Inicia sesión para acceder a la infraestructura del Tenant.</p>
          </div>

          <form className="aura-login__form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="aura-login__error">
                {errorMessage}
              </div>
            )}

            <div className="aura-login__group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                required
                placeholder="ejemplo@empresa.com"
                className="aura-login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="aura-login__group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••••••"
                className="aura-login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <label className="aura-login__remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Mantener sesión iniciada (Recordarme)</span>
            </label>

            <button 
              type="submit" 
              className="aura-login__submit"
              disabled={isLoading}
            >
              <LogIn size={16} />
              {isLoading ? 'Autenticando...' : 'Acceder al sistema'}
            </button>
          </form>

        </div>

        <div className="aura-login__footer">
          <p>¿Necesitas soporte? Contacta al administrador central.</p>
        </div>
      </div>
    </div>
  );
};