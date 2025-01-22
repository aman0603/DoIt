import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './types';
import LoginForm from './components/Auth/LoginForm';
import LeftSidebar from './components/Layout/LeftSidebar';
import RightSidebar from './components/Layout/RightSidebar';
import MainContent from './components/Layout/MainContent';
import Navbar from './components/Layout/Navbar';

const App: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { isDark } = useSelector((state: RootState) => state.theme);

  // State for sidebar toggles
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // State for task selection and search
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Render LoginForm if the user is not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div
      className={`min-h-screen flex ${isDark ? 'bg-[#1E1F21] text-white' : 'bg-white text-gray-900'}`}
    >

      {/* Left Sidebar */}
      <LeftSidebar
        user={user}
        isOpen={isLeftSidebarOpen}
        onToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 bg-[#242424] ${isLeftSidebarOpen ? 'ml-0' : 'ml-0'}  ${isRightSidebarOpen ? 'mr-80' : 'mr-0'}`}>
        {/* Navbar */}
        <Navbar
        searchQuery={searchQuery}
        onSearchChange={(value: string) => setSearchQuery(value)}
        isSidebarOpen={isLeftSidebarOpen} // Pass the sidebar state
      />

        {/* Main Content */}
        <MainContent
          
          onTaskSelect={(task) => { 
            setSelectedTask(task);
            setIsRightSidebarOpen(true);
          }}
        />
      </div>

      {/* Right Sidebar */}
      {isRightSidebarOpen && (
        <RightSidebar
          selectedTask={selectedTask}
          isOpen={isRightSidebarOpen}
          onClose={() => {
            setIsRightSidebarOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
