import React from 'react'
import { Twitter,Facebook,Instagram } from 'lucide-react';

function Footer() {
  return (
       <footer className=" text-black py-9 mt-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">KAAMVALA</h2>
            <p className="mt-2 text-gray-400">
              Connecting you with trusted local service providers .
             </p>
             <div className="flex justify-center md:justify-start mt-4 space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} className="text-gray-400 hover:text-white " />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} className="text-gray-400 hover:text-white " />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} className="text-gray-400 hover:text-white " />
              </a>
            </div>
            
            
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-1">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  Electrical
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Gardening
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  Carpentary
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
         
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">
            © 2025 KAAMVALA. All Rights Reserved.
          </p>
        </div>
      </div>

  </footer>
  )
}

export default Footer

