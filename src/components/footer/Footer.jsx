import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white  border-gray-800 ">
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-1 sm:gap-0 px-2">
        {/* Left Section */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-3 text-[11px] sm:text-[13px] font-semibold">
          <a href="#" className="hover:text-gray-400 transition-colors">
            Terms & Services
          </a>
          <span className="hidden sm:inline border-l border-gray-600 h-3"></span>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* Right Section */}
        <p className="text-[10px] sm:text-[12px] font-medium mt-0 break-words">
          © {new Date().getFullYear()} All Rights Reserved |{" "}
          <a
            href="mailto:contacttocare@gmail.com"
            className="font-semibold hover:text-gray-400 transition-colors"
          >
            contacttocare@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
