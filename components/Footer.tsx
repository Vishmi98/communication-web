import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#f5f5f5] pt-12 pb-6 mt-auto">
            <div className="w-[95%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div className="flex flex-col space-y-4 col-span-2 md:col-span-1">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            width={120}
                            height={60}
                            alt="Logo"
                            className="cursor-pointer"
                        />
                    </Link>
                    <p className="text-muted text-sm mt-4">
                        Your one-stop destination for the best products. We provide high-quality items with exceptional customer service.
                    </p>
                </div>

                {/* Customer Care */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Customer Care</h3>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Help Center</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Track Your Order</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Returns & Refunds</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Contact Us</Link>
                </div>

                {/* Explore */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Explore</h3>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">About Us</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Careers</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Terms & Conditions</Link>
                </div>

                {/* Follow Us */}
                <div className="flex flex-col space-y-3 col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-2 md:space-x-4 mt-2 flex-wrap">
                        <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                            <FaFacebook size={18} />
                        </a>
                        <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                            <FaTwitter size={18} />
                        </a>
                        <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                            <FaYoutube size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-[95%] mx-auto md:mt-10 mt-4 md:pt-6 pt-2 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted">
                    &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
                </p>
                <div className="mt-4 md:mt-0 flex space-x-4">
                    {/* Payment method placeholders could go here */}
                    <span className="text-sm text-muted">Secure Payments</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;