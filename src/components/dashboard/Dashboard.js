"use client"; 
import { useEffect, useState } from "react";
import { Header } from "../Header";
import { Sidebar } from "../UI/Sidebar";
import { DashboardContent } from "./Dashboardcontent";

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            isMobile={isMobile}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
          
          <main className="flex-1 overflow-auto">
            <DashboardContent activeTab={activeTab} />
          </main>
        </div>
      </div>
    );
  };