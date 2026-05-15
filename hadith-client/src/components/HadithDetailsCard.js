import React from 'react';
import RamadanPlanner from '../assets/img/Ramadan-Planner.avif';
import { FaPlay, FaRegClock, FaCalendarAlt, FaDownload } from "react-icons/fa";

export default function HadithDetailsCard() {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[rgba(201,162,39,0.25)] flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative overflow-hidden">
                <img
                    alt="Course cover"
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    src={RamadanPlanner}
                />
                <div className="absolute top-4 right-4 bg-isl-gold text-[#0d4a2e] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Free PDF
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="bg-isl-gold text-isl-green font-bold px-6 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <FaDownload /> Download Now
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col space-y-6 bg-white">
                
                {/* Watch Button */}
                <button className="w-full bg-[#fdf8f0] border border-isl-gold/30 hover:bg-isl-gold/10 text-[#0d4a2e] font-['Jost'] font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-isl-gold flex items-center justify-center text-white pl-1">
                        <FaPlay className="text-sm" />
                    </div>
                    Watch Taqreer
                </button>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex flex-col">
                        <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-1">
                            <FaRegClock className="mr-1.5" /> Duration
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">1 Hour</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-1">
                            <FaCalendarAlt className="mr-1.5" /> Format
                        </div>
                        <span className="font-semibold text-gray-800 text-sm leading-tight">Self-paced video lessons</span>
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Pricing / Access Grid */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 text-sm font-medium">Price</span>
                        <span className="text-isl-green font-bold text-lg">FREE</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm font-medium">Access</span>
                        <span className="text-gray-800 font-semibold text-sm">90 Days</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
