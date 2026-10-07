import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Sparkles,
  Code2,
  Globe,
  Compass,
  GraduationCap,
  Coffee,
  Tag,
  Layers,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  Sparkles,
  Code2,
  Globe,
  Compass,
  GraduationCap,
  Coffee,
  Tag
};

export default function CategoriesSection() {
  const { categories, posts, selectedCategory, setSelectedCategory } = useApp();

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // toggle off
    } else {
      setSelectedCategory(categoryName);
      // Smooth scroll to posts section
      const el = document.getElementById('latest-posts');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 md:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Explore by Subject</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse top stories organized by your favorite subjects
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Clear filter: Showing "{selectedCategory}" ✕
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Tag;
            const isSelected = selectedCategory === cat.name;
            const actualCount = posts.filter(
              (p) => p.category?.toLowerCase() === cat.name.toLowerCase() || p.categoryId === cat.id
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative flex flex-col items-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-102'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-indigo-300 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Name */}
                <span
                  className={`text-xs sm:text-sm font-bold line-clamp-1 leading-snug ${
                    isSelected ? 'text-white' : 'text-slate-800 group-hover:text-indigo-600'
                  }`}
                >
                  {cat.name}
                </span>

                {/* Post Count Badge */}
                <span
                  className={`text-[11px] font-medium mt-1.5 px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}
                >
                  {actualCount} {actualCount === 1 ? 'post' : 'posts'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
