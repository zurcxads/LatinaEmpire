
import { Link } from "wouter";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-black/95 text-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {/* Column 1: Latina Empire */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <Link href="/">
                <span className="font-bold text-base sm:text-lg md:text-xl text-white tracking-wider">LATINA EMPIRE</span>
              </Link>
            </div>
            
            <h3 className="font-sans uppercase tracking-wider text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-5 text-white/90">Latina Empire</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li>
                <Link href="/about-founder" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/leaders" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Leadership</span>
                </Link>
              </li>
              <li>
                <Link href="/join" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Join the Movement</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Learn & Grow */}
          <div>
            <h3 className="font-sans uppercase tracking-wider text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-5 text-white/90">Learn & Grow</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li>
                <Link href="/programs" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Programs</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Events</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Blog & Media</span>
                </Link>
              </li>
              <li>
                <Link href="/membership" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Membership</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Community */}
          <div>
            <h3 className="font-sans uppercase tracking-wider text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-5 text-white/90">Community</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li>
                <Link href="/manahood" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Manahood Chapters</span>
                </Link>
              </li>
              <li>
                <Link href="/manahood/start" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Start a Chapter</span>
                </Link>
              </li>
              <li>
                <Link href="/programs/certification" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Become a Leader</span>
                </Link>
              </li>
              <li>
                <Link href="/donate" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Donate</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Shop */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-sans uppercase tracking-wider text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-5 text-white/90">Shop</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li>
                <Link href="/shop" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Mana Boutique</span>
                </Link>
              </li>
              <li>
                <Link href="/shop/digital" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Digital Downloads</span>
                </Link>
              </li>
              <li>
                <Link href="/shop/apparel" className="font-sans text-white/70 hover:text-white group inline-flex items-center transition-all text-xs sm:text-sm">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Merch & Apparel</span>
                </Link>
              </li>
            </ul>
            
            {/* Connect section */}
            <div className="mt-5 sm:mt-6 md:mt-8 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-sans uppercase tracking-wider text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 md:mb-3 text-white/90">Connect</h3>
              <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3">Join our community of ambitious Latinas</p>
              <Link 
                href="/join" 
                className="inline-flex items-center group text-magenta hover:text-white font-medium text-xs sm:text-sm transition-all"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Join the Empire</span>
                <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-white/50 text-xs order-2 sm:order-1">
              &copy; 2025 Latina Empire. All rights reserved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-8 order-1 sm:order-2 w-full sm:w-auto">
              {/* Links */}
              <div className="flex gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-center">
                <Link href="/terms" className="font-sans text-white/50 text-xs group hover:text-white/80 transition-all inline-flex items-center">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Terms of Service</span>
                </Link>
                <Link href="/privacy" className="font-sans text-white/50 text-xs group hover:text-white/80 transition-all inline-flex items-center">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Privacy Policy</span>
                </Link>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center justify-center space-x-4 sm:space-x-5 w-full sm:w-auto mt-3 sm:mt-0">
                <a href="#" className="text-magenta/80 hover:text-magenta transition-all" aria-label="Instagram">
                  <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="text-magenta/80 hover:text-magenta transition-all" aria-label="Facebook">
                  <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="text-magenta/80 hover:text-magenta transition-all" aria-label="YouTube">
                  <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
