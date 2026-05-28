import React from 'react';
import logoImg from '../assets/logo/ilmhadith.png';

// ─── Base Skeleton pulse block ────────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

// ─── Slider skeleton ──────────────────────────────────────────────────────────
export function SliderSkeleton() {
  return (
    <div className="bg-isl-green py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-7 space-y-3">
          <Skeleton className="h-6 w-40 mx-auto bg-isl-gold/20" />
          <Skeleton className="h-8 w-72 mx-auto bg-white/20" />
          <Skeleton className="h-px w-32 mx-auto bg-white/10" />
        </div>
        {/* Slide */}
        <div className="rounded-2xl overflow-hidden bg-isl-green/40 animate-pulse h-64 sm:h-80 md:h-[440px] relative">
          <div className="absolute bottom-0 left-0 p-8 space-y-3 w-full">
            <Skeleton className="h-4 w-24 bg-white/20" />
            <Skeleton className="h-7 w-3/5 bg-white/20" />
            <Skeleton className="h-4 w-4/5 bg-white/10" />
            <Skeleton className="h-9 w-28 bg-white/20 rounded-lg" />
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-white/20 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hadith card skeleton ──────────────────────────────────────────────────────
export function HadithCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="h-1 bg-gray-100" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

// ─── Collections card skeleton (home page grid) ───────────────────────────────
export function CollectionCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  );
}

// ─── Category sidebar skeleton ────────────────────────────────────────────────
export function CategorySkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className={`h-10 w-full rounded-xl ${i === 0 ? 'bg-isl-gold/20' : ''}`} />
      ))}
    </div>
  );
}

// ─── Donor list skeleton ──────────────────────────────────────────────────────
export function DonorRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

// ─── Page-level full screen loader ───────────────────────────────────────────
export function PageLoader({ label = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-isl-cream">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-isl-gold/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-isl-gold animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logoImg} alt="IlmHadith" className="w-8 h-8 object-contain" />
        </div>
      </div>
      <p className="text-isl-green font-body text-sm font-medium tracking-wider">{label}</p>
    </div>
  );
}

// ─── Inline spinner (for small areas / buttons) ───────────────────────────────
export function Spinner({ size = 6, color = 'isl-gold' }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full border-2 border-${color}/30 border-t-${color} animate-spin`}
    />
  );
}
