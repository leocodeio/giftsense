"use client";

import React from "react";

interface ConfidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfidenceModal({ isOpen, onClose }: ConfidenceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex flex-col justify-end transition-opacity font-body">
      {/* Click outside to close (Optional but nice UX) */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* S15 — Confidence Modal */}
      <div className="bg-surface-container-lowest rounded-t-3xl px-6 pt-7 pb-10 w-full max-w-[480px] mx-auto relative transform transition-transform duration-300">
        {/* Handle bar */}
        <div className="flex justify-center mb-7">
          <div className="w-10 h-1 bg-[#F5E6E0] rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          {/* Header */}
          <h3 className="font-headline text-xl font-bold text-on-surface leading-tight">
            What is the AI confidence score?
          </h3>
          
          {/* Body Text */}
          <p className="text-on-surface-variant text-base leading-[1.7] font-medium">
            Confidence is based on how many questions the profile was built from. More answers = more specific AI personality mapping and gift matching.
          </p>

          {/* Confidence Rows */}
          <div className="space-y-3 py-2">
            {/* High */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 font-bold">check</span>
                <span className="font-bold text-on-surface font-headline">High</span>
              </div>
              <span className="text-sm text-on-surface-variant font-medium">All or most answers given.</span>
            </div>
            {/* Medium */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-500 font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>contrast</span>
                <span className="font-bold text-on-surface font-headline">Medium</span>
              </div>
              <span className="text-sm text-on-surface-variant font-medium">Some Not Sure answers.</span>
            </div>
            {/* Low */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-600 font-bold">priority_high</span>
                <span className="font-bold text-on-surface font-headline">Low</span>
              </div>
              <span className="text-sm text-on-surface-variant font-medium">Many Not Sure answers.</span>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#FFF3EE] p-[14px] rounded-2xl flex gap-3">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <p className="text-sm text-on-primary-container leading-relaxed">
              Tapping <strong>Refine</strong> adds AI-generated follow-up questions that significantly improve the gift match quality.
            </p>
          </div>

          {/* Got It Button */}
          <button 
            onClick={onClose}
            className="w-full h-[52px] bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold rounded-full text-lg shadow-[0_8px_32px_rgba(172,53,9,0.2)] active:scale-95 transition-transform"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
