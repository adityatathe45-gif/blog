import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  PenSquare,
  Menu,
  X,
  Compass,
  Bookmark,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Layers,
  Sparkles,
  TrendingUp,
  HelpCircle,
  Mail,
  Home
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    setIsSearchOpen,
    currentUser,
    openAuth,
    logout,
    bookmarks
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view, sectionId = null) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (view === 'home' && sectionId) {
      if (currentView !== 'home') {
        navigateTo('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTo(view);
    }
  };

  const handleWriteClick = () => {
    setMobileMenuOpen(false);
    if (!currentUser) {
      openAuth('login');
    } else {
      navigateTo('write-blog');
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. BlogSphere Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tight">B</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                Blog<span className="text-indigo-600">Sphere</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
                Insight & Ideas
              </span>
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'categories')}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('home', 'latest-posts')}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Latest Posts
            </button>
            <button
              onClick={() => handleNavClick('home', 'popular-posts')}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Popular
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentView === 'about'
                  ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentView === 'contact'
                  ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* 3. Action Buttons & Search */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors relative group"
              title="Search articles (Ctrl+K)"
              aria-label="Search articles"
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>

            {/* Write a Blog Button */}
            <button
              onClick={handleWriteClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-sm shadow-indigo-600/20 group cursor-pointer"
            >
              <PenSquare className="w-4 h-4 transition-transform group-hover:-rotate-6" />
              <span>Write a Blog</span>
            </button>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden md:inline">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 uppercase">
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('profile');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600 flex items-center gap-2.5"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('profile', { tab: 'saved' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600 flex items-center gap-2.5"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400" />
                        <span>Saved Articles ({bookmarks.length})</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600 flex items-center gap-2.5"
                      >
                        <Shield className="w-4 h-4 text-slate-400" />
                        <span>Admin Dashboard</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuth('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Icons (Search & Hamburger) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
          <nav className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <Home className="w-4 h-4 text-indigo-500" />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavClick('home', 'categories')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Categories</span>
            </button>
            <button
              onClick={() => handleNavClick('home', 'latest-posts')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Latest Posts</span>
            </button>
            <button
              onClick={() => handleNavClick('home', 'popular-posts')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <span>About</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-left"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Contact</span>
            </button>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleWriteClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              <PenSquare className="w-4 h-4" />
              <span>Write a Blog</span>
            </button>

            {currentUser ? (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-3 px-2 py-1">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('profile');
                    }}
                    className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-center"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('admin');
                    }}
                    className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100/50 text-center"
                  >
                    Admin Panel
                  </button>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 text-center"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuth('login');
                  }}
                  className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 text-slate-800 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuth('signup');
                  }}
                  className="py-2 px-3 text-xs font-semibold rounded-xl bg-slate-900 text-white text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
