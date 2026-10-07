import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Users, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { navigateTo, users } = useApp();

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Empowering Voices, Elevating Ideas Across the Globe
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            BlogSphere was founded with a singular conviction: thoughtful writing and technical clarity possess the power to shape technology, culture, and human understanding.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Uncompromising Quality</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every article featured on our platform is evaluated for depth, actionable insight, and authentic voice. We prioritize thoughtful essays over clickbait.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Inclusive Community</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From beginner developers writing their first "Hello World" to veteran distributed systems architects, our community celebrates curiosity at all levels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Open & Transparent</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We respect user privacy and adhere to stringent editorial standards. No paywalls, no dark patterns—just pure, inspiring knowledge.
            </p>
          </div>
        </div>

        {/* Editorial Team */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Editorial Team
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              The writers, engineers, and curators shaping BlogSphere's daily publications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 text-center flex flex-col items-center shadow-xs hover:border-indigo-300 transition-all"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-indigo-500/20"
                />
                <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                <span className="text-xs font-semibold text-indigo-600 mb-2">{member.role}</span>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-indigo-600 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Have a story the world needs to hear?</h3>
          <p className="text-indigo-100 text-sm max-w-xl mx-auto mb-6">
            Join our creator community today and publish your first article on BlogSphere in minutes.
          </p>
          <button
            onClick={() => navigateTo('write-blog')}
            className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Writing on BlogSphere</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
