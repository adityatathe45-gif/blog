import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, openAuth, login, signup, users, switchDemoUser, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        showToast('Please fill in both email and password.', 'error');
        return;
      }
      login(email, password);
    } else if (authMode === 'signup') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        showToast('Please fill in name, email and password.', 'error');
        return;
      }
      signup({ name, email, bio });
    } else if (authMode === 'forgot') {
      if (!email.trim()) {
        showToast('Please enter your account email address.', 'error');
        return;
      }
      setForgotSent(true);
      showToast(`Password reset link sent to ${email}`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-6 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-base">
              B
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {authMode === 'login' && 'Welcome to BlogSphere'}
                {authMode === 'signup' && 'Create Your Account'}
                {authMode === 'forgot' && 'Reset Your Password'}
              </h3>
              <p className="text-xs text-slate-500">
                {authMode === 'login' && 'Sign in to publish, bookmark and comment'}
                {authMode === 'signup' && 'Join thousands of inspiring writers & readers'}
                {authMode === 'forgot' && 'We will send you a recovery link'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuth}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {authMode === 'forgot' && forgotSent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Check Your Inbox</h4>
              <p className="text-xs text-slate-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Follow the instructions in the email to regain access.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotSent(false);
                  openAuth('login');
                }}
                className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => openAuth('forgot')}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>
              )}

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bio (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short bio about your writing, passions, or interests..."
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                <span>
                  {authMode === 'login' && 'Sign In to BlogSphere'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          {/* Switch Modes */}
          <div className="mt-4 text-center text-xs text-slate-500">
            {authMode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuth('signup')}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Sign up free
                </button>
              </p>
            )}
            {authMode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
            {authMode === 'forgot' && !forgotSent && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Demo Fast Switcher */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Accounts (One-Click Testing)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {users.slice(0, 3).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => switchDemoUser(u.id)}
                className="flex flex-col items-center p-2 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 transition-all text-center group"
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-7 h-7 rounded-full object-cover mb-1 border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <span className="text-[11px] font-bold text-slate-800 truncate w-full">
                  {u.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider mt-0.5">
                  {u.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
