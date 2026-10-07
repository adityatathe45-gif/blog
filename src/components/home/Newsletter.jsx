import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const { subscribeNewsletter } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = subscribeNewsletter(email);
      setLoading(false);
      if (ok) {
        setIsSubscribed(true);
        setEmail('');
      }
    }, 500);
  };

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-800/40">
          
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Weekly Editorial Newsletter</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Get the Best Stories in Your Inbox
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Join 45,000+ ambitious developers, creators, and technology enthusiasts who receive our curated weekly digest of cutting-edge ideas, coding patterns, and lifestyle essays.
            </p>

            {/* Form */}
            {isSubscribed ? (
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 animate-fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-bold text-white">You're on the list!</p>
                  <p className="text-xs text-emerald-200/80">Check your email soon for this week's issue of BlogSphere Digest.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 text-white placeholder-slate-400 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 shrink-0 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {loading ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>No spam, unsubscribe anytime. Read our Privacy Policy.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
