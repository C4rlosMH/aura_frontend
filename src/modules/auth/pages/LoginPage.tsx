import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../../../core/api/axios';
import '../styles/login.scss';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  // Estados del formulario: Cambiamos 'email' por 'identifier'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Enviamos 'identifier' como espera nuestro auth.controller.ts
      const response = await api.post('/auth/login', { identifier, password });
      
      const { token, user } = response.data;
      setLogin(token, user, rememberMe);
      navigate('/');
    } catch (error: any) {
      console.error("Error en autenticación:", error);
      setErrorMessage(
        error.response?.data?.error || 
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
              {/* Actualizamos la etiqueta para indicar que acepta ambos */}
              <label htmlFor="identifier">Usuario o Correo Electrónico</label>
              <input
                id="identifier"
                type="text"
                required
                placeholder="ejemplo@empresa.com o mi_usuario"
                className="aura-login__input"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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