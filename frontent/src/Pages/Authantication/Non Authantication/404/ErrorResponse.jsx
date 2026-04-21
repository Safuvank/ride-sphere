import React from "react";
import { Link } from "react-router-dom";
import { FaRoute, FaFlagCheckered } from "react-icons/fa"; // Added for sporty flair

export default function ErrorResponse() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 relative overflow-hidden px-4 text-center">
      
      {/* Background Decor Speed Lines & Warning Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 left-1/3 w-2 h-full bg-red-600/10 skew-x-[-20deg]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Massive Skewed 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black italic leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 transform -skew-x-12 drop-shadow-2xl mb-2">
          404
        </h1>
        
        {/* Sporty Heading */}
        <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tighter mb-4 flex items-center justify-center gap-3">
          Off The <span className="text-lime-500">Track</span> <FaRoute className="text-red-500" />
        </h2>
        
        {/* Description */}
        <p className="text-zinc-400 mb-10 font-medium uppercase tracking-wide text-sm max-w-md">
          The route you're looking for doesn't exist or has been closed. Let's get you back in the race.
        </p>
        
        {/* CTA Button */}
        <Link
          to="/"
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-widest text-sm transform -skew-x-12 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-lime-500/20"
        >
          <span className="transform skew-x-12 flex items-center gap-2">
            Back to Start <FaFlagCheckered />
          </span>
        </Link>
      </div>
    </div>
  );
}