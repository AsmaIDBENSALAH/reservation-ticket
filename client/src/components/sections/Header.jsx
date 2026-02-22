import { useState } from "react";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <>
      {/* Trust bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-2">
        <div className="max-w-[1024px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>100% Secure & Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Over 5 Million Football Fans Served</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Excellent 4.9/5 Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-emerald-600 sticky top-0 z-50 shadow-sm">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1024px] mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    <span className="text-emerald-600">Chri</span>
                    tickets
                  </h1>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Safe tickets. Real seats. Pure football.
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for team, match, stadium or city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-emerald-600"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                    🔍
                  </button>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-emerald-600 flex items-center gap-1"
                >
                  🎫 Track your Tickets
                </a>
                <div className="flex">
                  <button className="px-3 py-1 border border-gray-300  text-sm text-gray-700 hover:border-emerald-600">
                    € EUR
                  </button>
                  <button className="px-3 py-1 border border-gray-300  text-sm text-gray-700 hover:border-emerald-600 flex items-center gap-1">
                    EN-GB
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-[1024px] mx-auto  relative">
          <nav className="flex gap-1 py-3">
            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors"
            >
              Home
            </a>

            {/* World Cup 2026 Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("worldcup")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#"
                className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
              >
                World Cup 2026 <span className="text-xs">▼</span>
              </a>
            </div>

            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              Trending <span className="text-xs">▼</span>
            </a>
            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              Premier League tickets <span className="text-xs">▼</span>
            </a>
            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              English Cups <span className="text-xs">▼</span>
            </a>
            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              Other Cups <span className="text-xs">▼</span>
            </a>
            <a
              href="#"
              className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              Other Competitions <span className="text-xs">▼</span>
            </a>
          </nav>
        </div>
        {activeDropdown === "worldcup" && (
          <div
            className="absolute left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
            onMouseEnter={() => setActiveDropdown("worldcup")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-[1024px] mx-auto px-4 py-6">
              <div className="grid grid-cols-4 gap-8">
                {/* Column 1 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase">
                    World Cup 2026 Tickets
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        World Cup All teams tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        World Cup round of 16 tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        World Cup quarter final tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        World Cup semi-final tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        World Cup final tickets
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase">
                    World Cup Host Nations
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Canada World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Mexico World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        USA World Cup tickets
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase">
                    World Cup A-F
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Argentina World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Australia World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Belgium World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Brazil World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        England World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        France World Cup tickets
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 4 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase">
                    World Cup G-Z
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Germany World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Japan World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Netherlands World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Portugal World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Scotland World Cup tickets
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Spain World Cup tickets
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
