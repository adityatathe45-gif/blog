import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PenSquare,
  Image,
  Upload,
  Check,
  Eye,
  Edit3,
  Heading,
  Bold,
  Italic,
  Quote,
  Code,
  List,
  Sparkles,
  ArrowLeft,
  Save,
  Send,
  AlertCircle
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'AI & Code', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Nature & Travel', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Coding Laptop', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Books & Learning', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80' },
];

export default function WriteBlog() {
  const {
    currentUser,
    categories,
    addPost,
    updatePost,
    editingPostId,
    posts,
    navigateTo,
    showToast,
    openAuth
  } = useApp();

  const isEditing = Boolean(editingPostId);
  const existingPost = isEditing ? posts.find((p) => p.id === editingPostId) : null;

  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [tagsInput, setTagsInput] = useState('');
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [errors, setErrors] = useState({});

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load existing post if editing, or default user
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title || '');
      setAuthorName(existingPost.author?.name || currentUser?.name || '');
      setCategory(existingPost.category || categories[0]?.name || 'Technology');
      setCoverImage(existingPost.coverImage || PRESET_IMAGES[0].url);
      setExcerpt(existingPost.excerpt || '');
      setContent(existingPost.content || '');
      setReadingTime(existingPost.readingTime || '5 min read');
      setTagsInput(existingPost.tags?.join(', ') || '');
    } else {
      setAuthorName(currentUser?.name || 'Elena Vance');
      if (categories.length > 0) {
        setCategory(categories[0].name);
      }
    }
  }, [existingPost, currentUser, categories]);

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target.result);
        showToast('Image uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to insert formatting in content editor
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 50);
  };

  const validateForm = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!authorName.trim()) errs.authorName = 'Author name is required';
    if (!category.trim()) errs.category = 'Please select a category';
    if (!excerpt.trim()) errs.excerpt = 'Short description is required';
    if (!content.trim()) errs.content = 'Blog content is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (status = 'Published') => {
    if (!currentUser) {
      openAuth('login');
      showToast('Please log in to publish articles.', 'info');
      return;
    }

    if (!validateForm()) {
      showToast('Please fix the highlighted errors before saving.', 'error');
      return;
    }

    const matchedCat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload = {
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: matchedCat ? matchedCat.name : category,
      categoryId: matchedCat ? matchedCat.id : 'tech',
      coverImage,
      excerpt: excerpt.trim(),
      content: content.trim(),
      readingTime: readingTime || '5 min read',
      tags: tags.length > 0 ? tags : [category],
      status,
      author: {
        id: currentUser.id,
        name: authorName.trim(),
        avatar: currentUser.avatar,
        role: currentUser.role
      }
    };

    if (isEditing) {
      updatePost(editingPostId, postPayload);
      navigateTo('blog-detail', { postId: editingPostId });
    } else {
      const created = addPost(postPayload);
      if (status === 'Draft') {
        navigateTo('profile', { tab: 'drafts' });
      } else {
        navigateTo('blog-detail', { postId: created.id });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Blog Post' : 'Write a New Blog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Share your insights, code patterns, or inspirational stories with the world.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => handleSave('Draft')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-500" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={() => handleSave('Published')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isEditing ? 'Update Post' : 'Publish Blog'}</span>
            </button>
          </div>
        </div>

        {/* Main Editor Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Blog Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              placeholder="e.g. Master Modern State Management in 2026"
              className={`w-full px-4 py-3 text-base sm:text-lg font-bold rounded-xl border focus:outline-none transition-all ${
                errors.title
                  ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
              </p>
            )}
          </div>

          {/* Author Name & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Author Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Image Section */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Featured Cover Image
            </label>

            {/* Current Image Preview */}
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 mb-3 group bg-slate-100">
              <img
                src={coverImage}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-md hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local File</span>
                </button>
              </div>
            </div>

            {/* Image URL Input & Presets */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Paste direct image URL..."
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>

              {/* Preset Quick Selectors */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-400 text-[11px] font-medium shrink-0">Presets:</span>
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => setCoverImage(img.url)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium shrink-0 transition-all ${
                      coverImage === img.url
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {img.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Short Description / Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Short Description (Excerpt) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="2"
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
                if (errors.excerpt) setErrors({ ...errors, excerpt: null });
              }}
              placeholder="A compelling 1-2 sentence hook summarizing your story..."
              className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none transition-all resize-none ${
                errors.excerpt
                  ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.excerpt && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.excerpt}
              </p>
            )}
          </div>

          {/* Blog Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Blog Content <span className="text-rose-500">*</span>
              </label>

              {/* Edit / Preview Tabs */}
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'edit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Live Preview
                  </span>
                </button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                {/* Editor Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-slate-700">
                  <button
                    type="button"
                    onClick={() => insertFormatting('## ', '\n')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold flex items-center gap-1"
                    title="Heading 2"
                  >
                    <Heading className="w-3.5 h-3.5" /> H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('### ', '\n')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold flex items-center gap-1"
                    title="Heading 3"
                  >
                    <Heading className="w-3 h-3" /> H3
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormatting('**', '**')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('*', '*')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('> ')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold"
                    title="Blockquote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('```\n', '\n```')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold"
                    title="Code Block"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('- ')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-xs font-bold"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  ref={textareaRef}
                  rows="14"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content) setErrors({ ...errors, content: null });
                  }}
                  placeholder="Write your article using Markdown (## Headings, **bold**, blockquotes, code blocks)..."
                  className="w-full p-4 text-sm font-normal text-slate-800 leading-relaxed outline-none resize-y"
                />
              </div>
            ) : (
              /* Live Preview Card */
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 min-h-[350px] prose prose-slate max-w-none">
                {content ? (
                  content.split('\n\n').map((para, i) => {
                    if (para.startsWith('## ')) {
                      return <h2 key={i} className="text-xl font-bold text-slate-900 mt-4 mb-2">{para.replace('## ', '')}</h2>;
                    }
                    if (para.startsWith('> ')) {
                      return <blockquote key={i} className="border-l-4 border-indigo-600 pl-4 py-2 italic text-slate-700 bg-indigo-50/60 rounded-r-lg">{para.replace('> ', '')}</blockquote>;
                    }
                    return <p key={i} className="text-slate-700 text-sm leading-relaxed mb-3">{para}</p>;
                  })
                ) : (
                  <p className="text-slate-400 italic text-sm">Nothing to preview yet. Write some content in the editor tab!</p>
                )}
              </div>
            )}

            {errors.content && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.content}
              </p>
            )}
          </div>

          {/* Reading Time and Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Estimated Reading Time
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, WebDev, Design"
                className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Bottom Submit Bar */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={() => handleSave('Draft')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave('Published')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Publish Article Now'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
