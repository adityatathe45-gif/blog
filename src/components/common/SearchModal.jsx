import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, posts, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchTerm.toLowerCase().trim();

  // Search by Title, Category, Keywords/Tags, and Author
  const filteredPosts = query
    ? posts.filter((post) => {
        const titleMatch = post.title?.toLowerCase().includes(query);
        const categoryMatch = post.category?.toLowerCase().includes(query);
        const authorMatch = post.author?.name?.toLowerCase().includes(query);
        const tagsMatch = post.tags?.some((t) => t.toLowerCase().includes(query));
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);

        return titleMatch || categoryMatch || authorMatch || tagsMatch || excerptMatch;
      })
    : [];

  const handleSelectPost = (postId) => {
    setIsSearchOpen(false);
    navigateTo('blog-detail', { postId });
  };

  const popularKeywords = ['AI', 'React', 'Budget', 'Python', 'Web Development', 'Travel'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, category, author, or keywords..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base outline-none font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 flex-1">
          {!searchTerm ? (
            <div className="py-8 px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularKeywords.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-200"
                  >
                    <Tag className="w-3 h-3 text-indigo-500" />
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6">
                Type anything to search across all published articles, authors, and topics.
              </p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
                Found {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
              </div>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post.id)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-indigo-50/60 cursor-pointer transition-all duration-200 group border border-transparent hover:border-indigo-100"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <User className="w-3 h-3" />
                        {post.author?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                No articles found. Try another search.
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any articles matching "{searchTerm}". Try searching for categories like "Technology", "Programming", or "Travel".
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigation: Click or Enter</span>
            <span>Close: Escape</span>
          </div>
          <span className="font-medium text-slate-500">BlogSphere Instant Search</span>
        </div>
      </div>
    </div>
  );
}
