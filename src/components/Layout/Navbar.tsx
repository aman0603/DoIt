import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Search, Grid2X2, Sun, Moon } from 'lucide-react';
import logo from '../../../assets/logo.png';
interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isSidebarOpen: boolean; // Added prop to check sidebar state
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange, isSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <header
      className={`p-4 flex items-center justify-between border-b ${
        isDark ? 'border-gray-800 bg-[#242424]' : 'border-gray-200'
      }`}
    >
      {/* Left Side: Logo and Name */}
      <div
        className={`flex items-center gap-3 ${
          !isSidebarOpen ? 'ml-16' : '' // Add margin if sidebar is closed
        }`}
      >
        <img
          src={logo} // Update this to your logo path
          alt="Logo"
          className="h-8 w-25 rounded-full"
        />
        
       
      </div>

      {/* Right Side: Search, Grid, and Theme Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className={`flex items-center transition-all duration-300 ease-in-out ${
              isSearchOpen ? 'w-64' : 'w-10'
            }`}
          >
            {isSearchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 absolute right-0
                  ${
                    isDark
                      ? 'bg-gray-800 text-white focus:ring-gray-700'
                      : 'bg-gray-100 text-gray-900 focus:ring-gray-300'
                  }
                  transition-all duration-300 ease-in-out
                `}
                autoFocus
              />
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }
                ${isSearchOpen ? 'relative z-10 ml-2' : ''}
              `}
            >
              <Search
                className={`h-5 w-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }
                  transition-transform duration-300 ease-in-out
                  ${isSearchOpen ? 'rotate-90' : ''}
                `}
              />
            </button>
          </div>
        </div>

        <button
          className={`p-2 rounded-lg ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          <Grid2X2
            className={`h-5 w-5 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          />
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
