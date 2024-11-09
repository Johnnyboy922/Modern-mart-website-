import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useStore();

  const loginForm = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: LoginInputs) => {
    // In a real app, make an API call here
    setUser({
      id: '1',
      name: 'John Doe',
      email: data.email,
      role: 'user',
    });
  };

  const onRegister = (data: RegisterInputs) => {
    // In a real app, make an API call here
    setUser({
      id: '1',
      name: data.name,
      email: data.email,
      role: 'user',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  {...loginForm.register('email')}
                  type="email"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {loginForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...loginForm.register('password')}
                  type="password"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  {...registerForm.register('name')}
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                />
                {registerForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...registerForm.register('password')}
                  type="password"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {registerForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}