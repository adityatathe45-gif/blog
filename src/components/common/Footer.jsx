import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Rss,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
  RotateCcw
} from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  const { navigateTo, categories, setSelectedCategory, subscribeNewsletter, resetToDefaultData } = useApp();
  const [miniEmail, setMiniEmail] = useState('');

  const handleMiniSubscribe = (e) => {
    e.preventDefault();
    if (subscribeNewsletter(miniEmail)) {
      setMiniEmail('');
    }
  };

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md font-extrabold text-xl">
                B
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Blog<span className="text-indigo-400">Sphere</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              BlogSphere is an open, modern publishing platform engineered for curious minds, software developers, and storytellers. Explore curated articles spanning artificial intelligence, code, travel, and personal growth.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleCategoryClick('Technology')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('write-blog')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Write a Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', { category: null })}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Latest Posts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('popular-posts')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Popular Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-indigo-400 transition-colors text-indigo-400 font-semibold"
                >
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Mini Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Contact & Updates
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>555 Mission St, San Francisco, CA</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>contact@blogsphere.io</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-0199</span>
              </p>
            </div>

            <form onSubmit={handleMiniSubscribe} className="pt-2">
              <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800 focus-within:border-indigo-500">
                <input
                  type="email"
                  required
                  value={miniEmail}
                  onChange={(e) => setMiniEmail(e.target.value)}
                  placeholder="Your email..."
                  className="w-full px-3 py-2 text-xs text-white bg-transparent outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Actions */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 BlogSphere. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors"
            >
              Editorial Standards
            </button>
            <button
              onClick={resetToDefaultData}
              title="Reset sample data back to default values"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
