import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 border-t-4 border-lime-500 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            Ride<span className="text-lime-500">Sphere</span>
          </h2>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-xs">
            Your trusted partner for premium riding bicycles that combine 
            performance, durability, and modern design for every adventure.
          </p>
          
          {/* Social Icons - Skewed Buttons */}
          <div className="flex space-x-3 mt-4">
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 transform -skew-x-12 hover:bg-blue-600 hover:border-transparent transition-all duration-300 cursor-pointer group">
                <FaFacebookF className="transform skew-x-12 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 transform -skew-x-12 hover:bg-pink-600 hover:border-transparent transition-all duration-300 cursor-pointer group">
                <FaInstagram className="transform skew-x-12 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 transform -skew-x-12 hover:bg-blue-700 hover:border-transparent transition-all duration-300 cursor-pointer group">
                <FaLinkedinIn className="transform skew-x-12 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 transform -skew-x-12 hover:bg-red-600 hover:border-transparent transition-all duration-300 cursor-pointer group">
                <FaYoutube className="transform skew-x-12 text-zinc-400 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-black italic uppercase tracking-wider text-white mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-lime-500 transform -skew-x-12"></span>
          </h3>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-wide text-zinc-500">
            <li><Link to="/" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 block">Home</Link></li>
            <li><Link to="/products" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 block">All Bicycles</Link></li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Brands</li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">New Arrivals</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-xl font-black italic uppercase tracking-wider text-white mb-6 relative inline-block">
            Customer Care
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-lime-500 transform -skew-x-12"></span>
          </h3>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-wide text-zinc-500">
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Help Center</li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Shipping Info</li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Returns & Exchanges</li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Warranty & Repairs</li>
            <li className="hover:text-lime-500 hover:pl-2 transition-all duration-300 cursor-pointer block">Track Your Order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-black italic uppercase tracking-wider text-white mb-6 relative inline-block">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-lime-500 transform -skew-x-12"></span>
          </h3>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            <li className="flex items-start gap-3 group">
                <span className="group-hover:text-white transition-colors">123 Ride Avenue<br/>Adventure City, IN 560001</span>
            </li>
            <li className="flex items-center gap-3 group">
                
                <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 group">
                <span className="group-hover:text-white transition-colors">support@ridesphere.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-900 mt-16 pt-6 text-xs font-bold uppercase tracking-widest text-zinc-600 text-center">
        <p className="hover:text-zinc-400 transition-colors">© 2026 RideSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}