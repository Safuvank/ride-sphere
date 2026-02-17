import React from "react";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">RideSphere</h2>
          <p className="text-sm mb-4">
            Your trusted partner for premium riding bicycles that combine 
            performance, durability, and modern design for every adventure.
          </p>
          <div className="flex space-x-4 text-xl mt-4">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Bicycles</Link></li>
            <li>Brands</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Shipping Info</li>
            <li>Returns & Exchanges</li>
            <li>Warranty & Repairs</li>
            <li>Track Your Order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>123 Ride Avenue</li>
            <li>Adventure City, IN 560001</li>
            <li>+91 98765 43210</li>
            <li>support@ridesphere.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-sm text-gray-500 text-center">
        <p>© 2025 RideSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
