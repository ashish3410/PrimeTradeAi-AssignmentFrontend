import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const isDevelopment = import.meta.env.MODE === 'development';
  const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate('/login')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // ✅ Await axios call
      const res = await axios.post(
        mybaseUrl+'api/auth/register/',
        { ...form },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // console.log(res.data);

      // If backend returns token directly
      if (res.data.access) {
        localStorage.setItem('token', res.data.access);
      }

      // Redirect to login page
      alert('User created. Check your email to activate, before login!')
      navigate('/login');
      setSuccess(true);

    } catch (err) {
      if (err.response && err.response.data) {
        // Django usually sends field-specific errors or non_field_errors
        setError(
          err.response.data.non_field_errors?.[0] ||
          err.response.data.detail ||
          err.response.data.email ||
          "Registration failed"
        );
        setLoading(false)
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false)
      }
      console.error(err);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white drop-shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            {error === 'Registration failed' ? <span>Please,Try again with valid email</span> : <span>{error}</span>}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 flex items-center gap-2">
            <CheckCircle size={20} />
            <span>Registration successful! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={form.password2}
              onChange={(e) => setForm({ ...form, password2: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-purple-600 hover:underline font-medium">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;