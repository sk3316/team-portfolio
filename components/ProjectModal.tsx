// components/ProjectModal.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/portfolio-data';
import { X, ExternalLink, Github, BookOpen, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  authorName: string;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  authorName,
}: ProjectModalProps) {
  // Keyboard Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
        >
          {/* Modal Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  {project.category || 'Engineering Case Study'}
                </span>
                <span className="text-xs text-neutral-500">• Lead: {authorName}</span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Title & Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 mt-2.5 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    Key Impact & Performance
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/90 flex flex-col"
                      >
                        <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 tracking-tight">
                          {metric.value}
                        </span>
                        <span className="text-[11px] text-neutral-400 mt-1 font-medium">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Architecture Highlights
                  </h3>
                  <div className="space-y-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80 text-xs text-neutral-200 flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Matrix */}
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Technologies & Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neutral-800/70 border border-neutral-700/70 rounded-lg text-xs font-mono font-medium text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Documentation</span>
                  </a>
                )}
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all ml-auto"
                >
                  <span>View Live Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
