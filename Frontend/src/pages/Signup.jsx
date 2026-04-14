import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from '../authSlice';
import { useEffect } from 'react';

const signupSchema = z.object({
  firstName: z.string().min(3, 'Minimum character should be 3'),
  emailId: z.string().email('Invalid Email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include one uppercase letter')
    .regex(/[a-z]/, 'Password must include one lowercase letter')
    .regex(/[0-9]/, 'Password must include one number')
    .regex(/[^A-Za-z0-9]/, 'Password must include one special character'),
});

function Signup() {
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
    dispatch(registerUser({ ...data, problemSolved: [] }));
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase">Join the community</p>
          <h2 className="text-3xl font-black text-white">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">Start your coding journey with Coder</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">First Name</label>
            <input
              type="text"
              placeholder="John"
              className={`w-full bg-[#0f172a] text-gray-100 rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.firstName ? 'border-red-500' : 'border-gray-800'}`}
              {...register('firstName')}
            />
            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full bg-[#0f172a] text-gray-100 rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.emailId ? 'border-red-500' : 'border-gray-800'}`}
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
            className="w-full rounded-xl bg-gray-100 hover:bg-white text-gray-900 font-semibold py-3 shadow-md shadow-black/20 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-white hover:text-gray-200">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
