import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect } from 'react';

const signupSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-500 via-orange-400 to-amber-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-orange-500 tracking-wide">Welcome back</p>
          <h2 className="text-3xl font-black text-gray-900">Login</h2>
          <p className="text-sm text-gray-500 mt-1">Continue solving problems with Coder</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${errors.emailId ? 'border-red-400' : 'border-gray-200'}`}
              {...register('emailId')}
            />
            {errors.emailId && (
              <span className="text-xs text-red-500">{errors.emailId.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 text-red-600 text-sm px-4 py-2 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 shadow-md shadow-orange-500/30 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <a href="/signup" className="font-semibold text-orange-600 hover:text-orange-700">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
