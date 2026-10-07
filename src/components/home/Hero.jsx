import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, PenSquare, Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';

export default function Hero() {
  const { navigateTo, currentUser, openAuth } = useApp();

  const handleStartWriting = () => {
    if (!currentUser) {
      openAuth('login');
    } else {
      navigateTo('write-blog');
    }
  };

  const handleExploreBlogs = () => {
    const el = document.getElementById('featured-post');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const elLatest = document.getElementById('latest-posts');
      elLatest?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-100">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-semibold tracking-wide border border-indigo-200/50 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Welcome to BlogSphere • Modern Publishing</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Ideas, Stories &{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                Knowledge
              </span>{' '}
              That Inspire
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover useful articles, inspiring stories, technology trends, travel experiences, and much more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleExploreBlogs}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-indigo-600/25 group cursor-pointer"
              >
                <span>Explore Blogs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleStartWriting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 active:scale-98 transition-all shadow-xs group cursor-pointer"
              >
                <PenSquare className="w-4 h-4 text-indigo-600 group-hover:-rotate-6 transition-transform" />
                <span>Start Writing</span>
              </button>
            </div>

            {/* Trust and Activity Metrics */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">45k+</p>
                <p className="text-xs text-slate-500 font-medium">Monthly Readers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">250+</p>
                <p className="text-xs text-slate-500 font-medium">Curated Articles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">100%</p>
                <p className="text-xs text-slate-500 font-medium">Free Access</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Illustration Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-100/80 bg-white/50 backdrop-blur-sm group">
                <img
                  src="/hero-illustration.jpg"
                  alt="BlogSphere Digital Storytelling Illustration"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge 1: Trending */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Trending Now</p>
                  <p className="text-[11px] text-slate-500">AI & Engineering Insights</p>
                </div>
              </div>

              {/* Floating Badge 2: Community */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Reader 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Reader 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                    alt="Reader 3"
                  />
                </div>
                <div className="pr-1">
                  <p className="text-xs font-bold text-slate-900">Join 15k+ Writers</p>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    Live Community
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
