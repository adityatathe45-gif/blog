import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Clock, Calendar, Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';

export default function FeaturedPost() {
  const { posts, navigateTo, toggleBookmark, isBookmarked } = useApp();

  const featured = posts.find((p) => p.isFeatured) || posts[0];

  if (!featured) return null;

  const bookmarked = isBookmarked(featured.id);

  return (
    <section id="featured-post" className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Story
              </h2>
              <p className="text-sm text-slate-500">Hand-picked editor's highlight of the week</p>
            </div>
          </div>
        </div>

        {/* Big Card Layout */}
        <div className="group relative bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200 hover:border-indigo-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Cover Image */}
            <div
              onClick={() => navigateTo('blog-detail', { postId: featured.id })}
              className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden cursor-pointer"
            >
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent lg:hidden" />
              
              {/* Category pill on image (mobile) */}
              <div className="absolute top-4 left-4 lg:hidden">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-600 text-white shadow-md">
                  {featured.category}
                </span>
              </div>
            </div>

            {/* Right Information Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Category & Bookmark Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="hidden lg:inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 tracking-wide uppercase">
                    {featured.category}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(featured.id);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      bookmarked
                        ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
                    }`}
                    title={bookmarked ? 'Saved to bookmarks' : 'Save article'}
                    aria-label="Bookmark"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-5 h-5 fill-indigo-600 text-indigo-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3
                  onClick={() => navigateTo('blog-detail', { postId: featured.id })}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-tight mb-4"
                >
                  {featured.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 mb-6">
                  {featured.excerpt}
                </p>
              </div>

              {/* Author Footer & Read More Button */}
              <div className="pt-6 border-t border-slate-200/80">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  
                  {/* Author info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.author.avatar}
                      alt={featured.author.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {featured.author.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featured.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readingTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => navigateTo('blog-detail', { postId: featured.id })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20 group/btn cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
