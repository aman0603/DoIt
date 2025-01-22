import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { CheckCircle2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    
    // Simulate authentication
    if (email && password) {
      dispatch(loginSuccess({ id: '1', email }));
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1F21]">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-12 w-12 text-[#3E9242] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome to DoIt</h2>
          <p className="text-gray-400 mt-2">Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#2A2B2D] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3E9242]"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#2A2B2D] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3E9242]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#3E9242] text-white rounded-lg hover:bg-[#45A049] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;