"use client"
import { UsesAuth } from "@/context/UsesAuth";
import { BarChart3, BookOpen, Home, LogOut, Settings, User, Users }  from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab, isMobile, isOpen, setIsOpen }) => {
    const { user, logout } = UsesAuth();
    
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home , useraccess:true },
      { id: 'exam', label: 'MCQ Exam', icon: BookOpen , useraccess:true },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 , useraccess:true },
      { id: 'users', label: 'Users', icon: Users , useraccess:false},
      { id: 'settings', label: 'Settings', icon: Settings , useraccess:true }
    ];
  
    const handleItemClick = (id) => {
      setActiveTab(id);
      if (isMobile) setIsOpen(false);
    };
  
    return (
      <>
        {isMobile && isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
        )}
        
        <div className={`${isMobile ? 'fixed' : 'relative'} ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} w-64 bg-white border-r border-gray-200 h-screen transition-transform duration-300 z-50`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3" >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {/* <User className="w-6 h-6 text-white" /> */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{user?.loginresult?.user?.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{user?.loginresult?.user.role}</p>
              </div>
            </div>
          </div>
  
          <nav className="p-4">
                {menuItems.map(({ id, label, icon: Icon ,useraccess}) => (
              <div key={id}>
              {       (!useraccess || user.loginresult.user.role === 'admin') && <button
                              onClick={() => handleItemClick(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>}
            
           </div>
            ))}
          </nav>
  
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </>
    );
  };