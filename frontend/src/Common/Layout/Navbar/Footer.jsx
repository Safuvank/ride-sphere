import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Ride<span className="text-blue-600">Sphere</span>
              </h2>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Your trusted partner for premium bicycles that combine 
              performance, durability, and modern design for every adventure.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#1877F2] hover:text-white transition-colors duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#E4405F] hover:text-white transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#FF0000] hover:text-white transition-colors duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-600 transition-colors block">
                  All Bicycles
                </Link>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Brands
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  New Arrivals
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Customer Care
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Warranty & Repairs
                </span>
              </li>
              <li>
                <Link to="/orderhistory" className="hover:text-blue-600 transition-colors cursor-pointer block">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start">
                <span>
                  123 Ride Avenue<br />
                  Adventure City, IN 560001
                </span>
              </li>
              <li className="flex items-center">
                <a href="tel:+919876543210" className="hover:text-blue-600 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <a href="mailto:support@ridesphere.com" className="hover:text-blue-600 transition-colors">
                  support@ridesphere.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} RideSphere. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}