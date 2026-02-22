import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 bg-footerbackground">
     {/* Main Footer Content */}
      <div className="max-w-[1024px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h4 className="font-bold text-white mb-4">Chritickets</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white hover:underline transition-colors">About us</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Privacy policy</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Information</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Returning</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">News</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="font-bold text-white mb-4">Top Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white hover:underline transition-colors">Premier League tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">FA Cup tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">EFL Cup tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Champions League tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Europa League tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Euro Cup tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Europa League tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">FA Cup Final tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Community Shield tickets</a></li>
            </ul>
          </div>

          {/* Best Sellers */}
          <div>
            <h4 className="font-bold text-white mb-4">Best Sellers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white hover:underline transition-colors">Arsenal tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Manchester United tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Liverpool tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Chelsea tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Tottenham tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Barcelona tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Champions League final tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">England Football tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">Europa League final tickets</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">World Cup 2026 final tickets</a></li>
            </ul>
          </div>

          {/* Homepages */}
          <div>
            <h4 className="font-bold text-white mb-4">Homepages</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white hover:underline transition-colors">GB English</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">FR Français</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">DE Deutsch</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">NL Nederlands</a></li>
              <li><a href="#" className="text-white hover:underline transition-colors">ES Español</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
