import React, { useState } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { supabase } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Login successful:', data);
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-halcones-blue" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Área de Socios</h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu cuenta para gestionar tu abono y ver contenido exclusivo.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="focus:ring-halcones-blue focus:border-halcones-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="focus:ring-halcones-blue focus:border-halcones-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-halcones-blue focus:ring-halcones-blue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-halcones-blue hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full justify-center py-3 text-lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Entrar <ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Aún no eres socio?{' '}
            <a href="#" className="font-medium text-halcones-blue hover:text-blue-700">
              Infórmate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

