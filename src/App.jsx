import React from 'react';
import { useApp } from './context/AppContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SearchModal from './components/common/SearchModal';
import AuthModal from './components/common/AuthModal';
import ToastContainer from './components/common/ToastContainer';

// Home Components
import Hero from './components/home/Hero';
import FeaturedPost from './components/home/FeaturedPost';
import CategoriesSection from './components/home/CategoriesSection';
import LatestPosts from './components/home/LatestPosts';
import PopularPosts from './components/home/PopularPosts';
import Newsletter from './components/home/Newsletter';

// Detail & Creator Components
import BlogDetails from './components/blog/BlogDetails';
import WriteBlog from './components/blog/WriteBlog';

// Profile, Admin, Pages
import UserProfile from './components/profile/UserProfile';
import AdminDashboard from './components/admin/AdminDashboard';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';

function AppContent() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <FeaturedPost />
            <CategoriesSection />
            <LatestPosts />
            <PopularPosts />
            <Newsletter />
          </>
        )}

        {currentView === 'blog-detail' && <BlogDetails />}

        {(currentView === 'write-blog' || currentView === 'edit-blog') && <WriteBlog />}

        {currentView === 'profile' && <UserProfile />}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <SearchModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
