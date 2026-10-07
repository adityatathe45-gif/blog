import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Calendar,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Filter,
  Eye,
  Heart
} from 'lucide-react';

export default function LatestPosts() {
  const {
    posts,
    selectedCategory,
    setSelectedCategory,
    navigateTo,
    toggleBookmark,
    isBookmarked
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'recent', 'popular'

  // Filter posts
  let displayedPosts = posts.filter((p) => p.status !== 'Draft');

  if (selectedCategory) {
    displayedPosts = displayedPosts.filter(
      (p) =>
        p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.categoryId?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (activeTab === 'recent') {
    displayedPosts = [...displayedPosts].sort((a, b) => b.id.localeCompare(a.id));
  } else if (activeTab === 'popular') {
    displayedPosts = [...displayedPosts].sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  return (
    <section id="latest-posts" className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory ? `${selectedCategory} Articles` : 'Latest Blog Posts'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {selectedCategory
                ? `Showing articles curated under ${selectedCategory}`
                : 'Stay informed with our most recent publications and engineering essays'}
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'recent'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'popular'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Selected Category Filter Indicator */}
        {selectedCategory && (
          <div className="mb-6 flex items-center justify-between p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-800">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                Filtered by category: <strong>{selectedCategory}</strong> ({displayedPosts.length} posts found)
              </span>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
            >
              Show all categories
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedPosts.map((post) => {
              const bookmarked = isBookmarked(post.id);

              return (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => navigateTo('blog-detail', { postId: post.id })}
                    className="relative h-52 overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Category Badge on Image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-white/95 text-indigo-700 shadow-sm backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>

                    {/* Bookmark Button on Image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(post.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:text-indigo-600 hover:bg-white shadow-sm transition-all"
                      title={bookmarked ? 'Saved' : 'Save post'}
                      aria-label="Bookmark"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Reading time & Date */}
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => navigateTo('blog-detail', { postId: post.id })}
                        className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2.5"
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Card Footer: Author & Read More */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {post.author.name}
                        </span>
                      </div>

                      <button
                        onClick={() => navigateTo('blog-detail', { postId: post.id })}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 group/btn transition-colors shrink-0"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-2">No articles in this category yet</h4>
            <p className="text-sm text-slate-500 mb-4">
              Be the first to publish an article under this category!
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              View All Articles
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
