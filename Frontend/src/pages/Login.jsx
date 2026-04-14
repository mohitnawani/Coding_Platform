import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../authSlice';
import { useEffect } from 'react';

const signupSchema = z.object({
  emailId: z.string().email('Invalid Email'),
  password: z.string().min(8, 'Password is too weak'),
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
      <div className="flex items-center justify-center min-h-screen bg-[#0b0f1a] text-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="w-full max-w-md bg-[#111827] border border-gray-800/80 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase">Welcome back</p>
          <h2 className="text-3xl font-black text-white">Login</h2>
          <p className="text-sm text-gray-500 mt-1">Continue solving problems with Coder</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full rounded-xl bg-[#0f172a] text-gray-100 border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.emailId ? 'border-red-500' : 'border-gray-800'}`}
              {...register('emailId')}
            />
            {errors.emailId && <span className="text-xs text-red-500">{errors.emailId.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-xl bg-[#0f172a] text-gray-100 border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-800'}`}
              {...register('password')}
            />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>

          {error && (
            <div className="rounded-lg bg-red-950 text-red-200 text-sm px-4 py-2 border border-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white hover:bg-gray-200 text-gray-900 font-semibold py-3 shadow-md shadow-black/20 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          New here?{' '}
          <a href="/signup" className="font-semibold text-white hover:text-gray-200">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
